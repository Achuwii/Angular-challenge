import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from 'src/core/interfaces/user.interface';
import { FetchDataService } from 'src/core/services/fetch-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  users: User[];

  constructor(private fetchDataService: FetchDataService) { }

  ngOnInit() {
    this.initializeData();
  }

  changeName(): void {
    this.fetchDataService.setUsers(this.users);
  }

  initializeData(): void {
    this.users$ = this.fetchDataService.getUserTableData()
    .pipe(tap((users) => this.users = users));
  }

  ngOnDestroy(): void {
    // this.users$.unsubscribe()
  }

  trackByFn(index, item): number {
    return index;  
  }

}
