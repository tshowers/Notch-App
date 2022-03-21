import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService, LAB_ORDERS } from '../../shared/data.service';
import { LabOrder } from '../../models/lab-order.model';
import { LabOrdersService } from 'src/app/shared/lab-orders.service';

@Component({
  selector: 'app-lab-order-view-edit',
  templateUrl: './lab-order-view-edit.component.html',
  styleUrls: ['./lab-order-view-edit.component.css']
})
export class LabOrderViewEditComponent implements OnInit {

  private _paramSubscription?: Subscription;
  private _dataSubscription?: Subscription;

  public data: any;
  public dataForTimeLine?: Observable<any>;

  public isAdmin: boolean = false;
  public toggleDisplay = false;
  public production = false;


  constructor(private _route: ActivatedRoute,
    private _dataService: DataService,
    private _labOrdersService: LabOrdersService) {
    this.production = environment.production;
  }

  ngOnInit(): void {
    this.checkForDataPassed();
  }

  ngOnDestroy(): void {
    if (this._paramSubscription)
      this._paramSubscription.unsubscribe();
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
  }


  public toggle(): void {
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }

  checkForDataPassed(): void {
    if (this._route.snapshot.params['id']) {
      let id = this._route.snapshot.params['id'];
      this.labOrder(id);
      this._paramSubscription = this._route.params.subscribe((params: Params) => {
        let id = this._route.snapshot.params['id'];
        this.labOrder(id);
      })
    } else if (this._route.snapshot.routeConfig?.path == 'new') {
      this.setData();
      this._paramSubscription = this._route.params.subscribe((params: Params) => {
        this.setData();
      })
    }
  }

  setData(): void {
    this.data = <LabOrder>{
      'loc-pos': environment.locPos,
      'status': environment.defaultStatus,
      'bill-method': environment.billMethod,
      'ordered-by': environment.orderedBy,
      'prac-id': environment.pracId,
    };
    this.toggleDisplay = true;
  }

  labOrder(id: any): void {
    this._dataService.itemDoc(LAB_ORDERS, id);
    this._dataSubscription = this._dataService.item?.subscribe((d) => {
      this.data = d;
      this.setObservable(d);
    })
  }

  setObservable(data: any) {
    this.dataForTimeLine = new Observable((observer) => {
      observer.next(data);
      observer.error('error');
    })
  }
}
