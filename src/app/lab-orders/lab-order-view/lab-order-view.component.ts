import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { DataService, LAB_ORDERS } from '../../shared/data.service';
import { Subscription } from 'rxjs';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lab-order-view',
  templateUrl: './lab-order-view.component.html',
  styleUrls: ['./lab-order-view.component.css']
})
export class LabOrderViewComponent implements OnInit, OnDestroy {
  public production: boolean;

  @Input() data: any;
  @Input() inputOrder?: Subject<any>;
  @Input() timeLineData: any;
  order: any;
  @Output() toggle = new EventEmitter();
  public jsonView = 'none';
  public timeLineView = 'none';
  public isAdmin: boolean = false;
  private _adminSubscription?: Subscription;
  private _orderSubscription?: Subscription;
  public isSuper: boolean = false;

  constructor(private _dataService: DataService, private _authService: NotchAuthService, private _usersService: UsersService) {
    this.production = environment.production;

  }

  ngOnInit(): void {
    this.isAdmin = this._usersService.admin;
    this.isSuper = this._usersService.super;
    this._adminSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
      this.isSuper = this._usersService.super;
    });

    this._orderSubscription = this.inputOrder?.subscribe((data: any) => {
      this.order = data;
    })

  }

  ngOnDestroy(): void {
    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();
    if (this._orderSubscription)
      this._orderSubscription.unsubscribe();
  }

  onJSON(): void {
    this.jsonView = (this.jsonView == "none") ? "" : "none";
  }

  onTimeLine(): void {
    this.timeLineView = (this.timeLineView == "none") ? "" : "none";
  }

  onDelete(): void {
    this._dataService.onDelete(LAB_ORDERS, this.data._id);
    this.data = null;
  }

  onEdit(): void {
    this.toggle.emit();
  }
}
