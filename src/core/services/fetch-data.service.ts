import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { sortBy, find, filter, includes, map as _map } from 'lodash';

import { environment } from 'src/environments/environment';
import { Role } from '../interfaces/role.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  users$: BehaviorSubject<User[]>;
  roles$: BehaviorSubject<Role[]>;

  constructor(private httpClient: HttpClient) {
    this.users$ = new BehaviorSubject([]);
    this.roles$ = new BehaviorSubject([]);
  }

  initData(): Observable<any> {
    if (!!!this.getUsers().length && !!!this.getRoles().length) {
      return forkJoin(
        [this.httpClient.get(environment.api.rolesEndpoint),
        this.httpClient.get(environment.api.usersEndpoint),
        ]).pipe(tap(([roles, users]) => {
          this.setRoles(roles);
          this.setUsers(users);
        }));
    }
  }

  getUsers(): User[] {
    return this.users$.getValue();
  }

  getRoles(): Role[] {
    return this.roles$.getValue();
  }

  getRoleById(roleId): Role {
    return find(this.getRoles(), (role) => {
      if (isNaN(roleId)) {
        return role.id === roleId.id;
      } else {
        return role.id === roleId;
      }
    });
  }

  getUsersByRoleId(roleId): User[] {
    return filter(this.users$.getValue(), (user) => {
      if (user.roles && isNaN(user.roles[0])) {
        return Boolean(find(user.roles, { id: roleId }));
      } else {
        return includes(user.roles, roleId);
      }
    })
  }

  getUserTableData(): Observable<User[]> {
    return this.users$.pipe(map((users) => {
      return _map(users, user => {
        return {
          ...user,
          roles: sortBy(_map(user.roles, role => {
            return this.getRoleById(role);
          }), 'name')
        }
      })
    }));
  }

  getRoleTableData(): Observable<Role[]> {
    return this.roles$.pipe(map((roles) => {
      return _map((sortBy(roles, 'name')), role => {
        role.users = this.getUsersByRoleId(role.id);
        return role;
      });
    }));
  }

  setUsers(users: User[]): void {
    this.users$.next(sortBy(users, 'name'));
  }

  setRoles(roles: Role[]): void {
    this.roles$.next(sortBy(roles, 'name'));
  }

}