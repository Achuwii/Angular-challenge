import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { HomeComponent } from './home/home.component';
import { FetchDataService } from '../core/services/fetch-data.service';
import { DataResolver } from '../core/resolvers/data.resolve';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RolesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FetchDataService, DataResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
