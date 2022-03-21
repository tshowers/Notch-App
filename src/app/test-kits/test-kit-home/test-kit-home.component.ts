import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Subscription } from 'rxjs';
import { NotchAuthService } from '../../shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { IpService } from '../../shared/ip.service';

@Component({
  selector: 'app-test-kit-home',
  templateUrl: './test-kit-home.component.html',
  styleUrls: ['./test-kit-home.component.css']
})
export class TestKitHomeComponent implements OnInit, OnDestroy {

  public data: any;
  public toggleDisplay = false;
  public isAdmin: boolean = false;
  private _adminSubscription?: Subscription;
  private _ipSubscription?: Subscription;

  public diagDisplay = "none";
  public toggleDiag = false;
  public production: boolean;

  public count1: any;
  public count2: any;
  public count3: any;
  public count4: any;
  public ipAddress?: string;


  constructor(private _authService: NotchAuthService, private _ipService: IpService, private _usersService: UsersService) {
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
  }

  onView(data: any) {
    this.data = data;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  public toggle(): void {
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }

  public toggleDiagnostic(): void {
    this.diagDisplay = (this.diagDisplay == "none") ? "" : "none";
    this.toggleDiag = (this.toggleDisplay) ? false : true;
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
