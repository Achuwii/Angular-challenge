import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { DataResolver } from '../core/resolvers/data.resolve';

const routes: Routes = [
	{ path: '', component: HomeComponent, resolve: { data: DataResolver } },
	{ path: 'users', component: UsersComponent, resolve: { data: DataResolver } },
	{ path: 'roles', component: RolesComponent, resolve: { data: DataResolver } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
