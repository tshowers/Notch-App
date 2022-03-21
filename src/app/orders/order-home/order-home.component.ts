import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotchAuthService } from '../../shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { IpService } from '../../shared/ip.service';

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.css']
})
export class OrderHomeComponent implements OnInit, OnDestroy {

  public data: any;
  private _adminSubscription?: Subscription;
  public ipAddress?: string;
  private _ipSubscription?: Subscription;

  public isAdmin: boolean = false;
  public count1: any;
  public count2: any;
  public count3: any;
  public count4: any;

  constructor(private _authService: NotchAuthService, private _usersService: UsersService, private _ipService: IpService) { }

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
  }

  onView(data: any) {
    this.data = data;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
}
