import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FetchDataService } from '../services/fetch-data.service';

@Injectable()
export class DataResolver implements Resolve<any> {

  constructor(private fetchDataService: FetchDataService) {}

  resolve(): Observable<any> {
    return this.fetchDataService.initData();
  }

}