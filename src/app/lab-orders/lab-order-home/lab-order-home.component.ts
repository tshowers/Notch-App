import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { UsersService } from '../../shared/users.service';
import { IpService } from '../../shared/ip.service';
import { LabOrdersService } from 'src/app/shared/lab-orders.service';
import { OrdersService } from 'src/app/shared/orders.service';
import { environment } from "../../../environments/environment";
import { ReportsService } from 'src/app/shared/reports.service';
import { take } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-lab-order-home',
  templateUrl: './lab-order-home.component.html',
  styleUrls: ['./lab-order-home.component.css']
})
export class LabOrderHomeComponent implements OnInit, OnDestroy {
  public production: boolean;

  public data: any;
  public timeLineData = new BehaviorSubject(null);
  public clickedOrder = new Subject<any>();
  public isAdmin: boolean = false;
  public itemClicked = new Subject<any>();
  public toggleDisplay = false;
  public count1: any;
  public count2: any;
  public count3: any;
  public count4: any;
  private _adminSubscription?: Subscription;
  private _orderSubscription?: Subscription;
  private _statusUpdateSubscription?: Subscription;
  public ipAddress?: string;
  private _ipSubscription?: Subscription;


  constructor(private _usersService: UsersService, private _ipService: IpService, private _labOrdersService: LabOrdersService, private _orderService: OrdersService) {
    this.production = environment.production;
  }

  ngOnInit(): void {
    this.getIP();
    this.isAdmin = this._usersService.admin;
    this._adminSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
    })

  }

  ngOnDestroy(): void {
    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();
    if (this._ipSubscription)
      this._ipSubscription.unsubscribe();
    if (this._orderSubscription)
      this._orderSubscription.unsubscribe();
    if (this._statusUpdateSubscription)
      this._statusUpdateSubscription.unsubscribe();
  }

  public onView(data: any) {
    try {
      this.data = data;
      this.itemClicked.next(data);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.setLabOrderAuditFromNotch(data);
      this.timeLineData.next(data);

    } catch (error) {
      console.error("onView", error)
    }
  }



  public toggle(): void {
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }

  onCount1(data: any) {
    this.count1 = data;
  }

  onCount2(data: any) {
    this.count2 = data;
  }

  onCount3(data: any) {
    this.count3 = data;
  }

  onCount4(data: any) {
    this.count4 = data;
  }

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }



  private setLabOrderAuditFromNotch(data: any): void {
    try {
      this.clickedOrder.next(null);
      if (data && data.notch_order_id && !isNaN(data.notch_order_id)) {

        this._orderService.customerOrder(data.notch_order_id);
        this._orderSubscription = this._orderService.item?.subscribe((order) => {
          if (order) {
            this.clickedOrder.next(order);
            data.order = order;
          }
        })
      }
    } catch (error) {
      console.error(error);
    }
  }
}
