import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DataService, LAB_ORDERS } from '../shared/data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LabOrderResolverService implements Resolve<any> {

  constructor(private _dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');
    if (id) {
      this._dataService.itemDoc(LAB_ORDERS, id);
    }
    return this._dataService.item;
  }

}
