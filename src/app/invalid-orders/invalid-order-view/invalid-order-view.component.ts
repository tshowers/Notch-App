import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { DataService, INVALID_ORDERS } from '../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invalid-order-view',
  templateUrl: './invalid-order-view.component.html',
  styleUrls: ['./invalid-order-view.component.css']
})
export class InvalidOrderViewComponent implements OnInit, OnDestroy {

  @Input() data: any;
  public isAdmin: boolean = false;
  public isSuper: boolean = false;
  private _adminSubscription?: Subscription;

  constructor(private _dataService: DataService, private _authService: NotchAuthService, private _usersService: UsersService) {  }

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

  onDelete(): void {
    this._dataService.onDelete(INVALID_ORDERS, this.data._id);
    this.data = null;
  }

  onEdit(): void {  }

}
