import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { DataService, CUSTOMERS } from '../../shared/data.service';
import { UsersService } from '../../shared/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit, OnDestroy {

  @Input() data: any;
  public jsonView = 'none';
  public isAdmin: boolean = false;
  public isSuper: boolean = false;
  private _adminSubscription?: Subscription;
  private _superSubscription?: Subscription;

  constructor(private _dataService: DataService, private _authService: NotchAuthService, private _usersService: UsersService) {

  }

  ngOnInit(): void {
    this.isAdmin = this._usersService.admin;
    this.isSuper = this._usersService.super;

    this._adminSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
      this.isSuper = this._usersService.super;
    });
  }

  ngOnDestroy(): void {
    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();
    if (this._superSubscription)
      this._superSubscription.unsubscribe();
  }

  onJSON(): void {
    this.jsonView = (this.jsonView == "none") ? "" : "none";

  }

  onDelete(): void {
    this._dataService.onDelete(CUSTOMERS, this.data._id);
    this.data = null;
  }

  onEdit(): void {

  }

}
