import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Role } from 'src/core/interfaces/role.interface';
import { FetchDataService } from 'src/core/services/fetch-data.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles$: Observable<Role[]>;
  roles: Role[];

  constructor(private fetchDataService: FetchDataService) { }

  ngOnInit() {
    this.initializeData();
  }

  changeName(): void {
    this.fetchDataService.setRoles(this.roles);
  }

  initializeData(): void {
    this.roles$ = this.fetchDataService.getRoleTableData()
    .pipe(tap((roles) => this.roles = roles));
  }

}
