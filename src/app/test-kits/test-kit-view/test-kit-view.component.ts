import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { DataService, TEST_KIT_ORDERS } from '../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-kit-view',
  templateUrl: './test-kit-view.component.html',
  styleUrls: ['./test-kit-view.component.css']
})
export class TestKitViewComponent implements OnInit, OnDestroy {

  @Input() data: any;
  public jsonView = 'none';
  public isAdmin: boolean = false;
  public isSuper: boolean = false;

  private _adminSubscription?: Subscription;

  constructor(private _dataService: DataService, private _authService: NotchAuthService, private _usersService: UsersService) {

  }

  ngOnInit(): void {
    this.isAdmin = this._usersService.admin;
    this.isSuper = this._usersService.super;

    this._adminSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
      this.isSuper = this._usersService.super;
    })
  }

  onJSON(): void {
    this.jsonView = (this.jsonView == "none") ? "" : "none";
  }

  ngOnDestroy(): void {
    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();
  }


  onDelete(): void {
    this._dataService.onDelete(TEST_KIT_ORDERS, this.data._id);
    this.data = null;
  }

  onEdit(): void { }

}
