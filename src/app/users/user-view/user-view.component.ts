import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { DataService, USERS } from '../../shared/data.service';
import { UsersService } from '../../shared/users.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() labOrders: any;
  @Input() kitRegistrations: any;
  @Output() toggle = new EventEmitter();
  public isAdmin: boolean = false;
  public isSuper: boolean = false;
  private _adminSubscription?: Subscription;
  public jsonView = 'none';
  filteredData = '';


  constructor(private _dataService: DataService, private _authService: NotchAuthService, private _usersService: UsersService, private _router: Router) {

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

  onDelete(): void {
    this._dataService.onDelete(USERS, this.data._id);
    this.data = null;
  }

  onEdit(): void {
    this.toggle.emit();
  }

  onJSON(): void {
    this.jsonView = (this.jsonView == "none") ? "" : "none";
  }

  showMoreDetails(item: any): void {
    this._router.navigate(['admin', 'lab-orders', item._id])
  }


}
