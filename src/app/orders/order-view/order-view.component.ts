import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { DataService, ORDERS } from '../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit, OnDestroy {

  @Input() data: any;
  public jsonView = 'none';
  public isAdmin: boolean = false;
  public isSuper: boolean = false;
  private _adminSubscription?: Subscription;

  constructor(private _dataService: DataService, private _usersService: UsersService, private _authService: NotchAuthService) {

  }

  ngOnInit(): void {
    this.isAdmin = this._usersService.admin;
    this.isSuper = this._usersService.super;
    this._adminSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
      this.isSuper = this._usersService.super;
    })
  }

  ngOnDestroy(): void {
    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();
  }

  onJSON(): void {
    this.jsonView = (this.jsonView == "none") ? "" : "none";

  }

  onDelete(): void {
    this._dataService.onDelete(ORDERS, this.data._id);
    this.data = null;
  }

  onEdit(): void {

  }

}
