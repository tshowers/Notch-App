import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { IpService } from '../../shared/ip.service';

@Component({
  selector: 'app-invalid-order-home',
  templateUrl: './invalid-order-home.component.html',
  styleUrls: ['./invalid-order-home.component.css']
})
export class InvalidOrderHomeComponent implements OnInit, OnDestroy {

  public data: any;
  public isAdmin: boolean = false;
  public ipAddress?: string;
  private _ipSubscription?: Subscription;

  public _adminSubscription?: Subscription;

  constructor(private _authService: NotchAuthService, private _ipService: IpService, private _usersService: UsersService) { }

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

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }
}
