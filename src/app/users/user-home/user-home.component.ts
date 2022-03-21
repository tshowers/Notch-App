import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../../shared/users.service';
import { IpService } from '../../shared/ip.service';
import { KitRegistrationsService } from 'src/app/shared/kit-registrations.service';
import { TestKitRegistration } from 'src/app/models/test-kit-order.model';
import { LabOrdersService } from 'src/app/shared/lab-orders.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy {

  public data: any;
  public kitRegistrations?: TestKitRegistration[];
  public labOrders: any[] = [];
  public isAdmin: boolean = false;
  private _adminSubscription?: Subscription;
  private _ipSubscription?: Subscription;
  private _kitRegistrationSubscription?: Subscription;
  public toggleDisplay = false;

  public ipAddress?: string;

  private _userSubscription?: Subscription;
  private _kitSubscription?: Subscription;
  private _labOrdersSubscription?: Subscription;

  constructor(private _labOrdersService: LabOrdersService, private _kitRegistrationService: KitRegistrationsService, private _ipService: IpService, private _usersService: UsersService) { }

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
    if (this._userSubscription)
      this._userSubscription.unsubscribe();
    if (this._kitSubscription)
      this._kitSubscription.unsubscribe();
    if (this._labOrdersSubscription)
      this._labOrdersSubscription.unsubscribe();
    if (this._kitRegistrationSubscription)
      this._kitRegistrationSubscription.unsubscribe();
  }

  public toggle(): void {
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }


  onView(data: any) {
    this.data = data;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.labOrders = [];
    this.kitRegistrations = [];
    this.findLabOrders(this.data.email, this.data.uid);
    this.findRegistrations(this.data.uid);
  }

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

  private findRegistrations(uid: string): void {
    if (uid) {
      this._kitRegistrationService.kitRegistrationsByProfile(uid);
      this._kitRegistrationSubscription = this._kitRegistrationService.items?.subscribe((data: TestKitRegistration[]) => {
        this.kitRegistrations = data;
      })
    }
  }

  private findLabOrders(email: string, uid: string): void {
    this.setLabOrders(email, uid);
  }

  private setLabOrders(email: string, uid: string): void {
    this._labOrdersService.labOrderByProfile(uid);
    this._labOrdersSubscription = this._labOrdersService.items?.pipe(take(1)).subscribe((los) => {
      los.forEach((l) => {
        this.labOrders.push(l);
      })
    });
    this.setLabOrdersByEmail(email);
  }

  private setLabOrdersByEmail(email: string): void {
    if (email) {
      this._labOrdersService.labOrderByEmail(email);
      this._labOrdersSubscription = this._labOrdersService.secondaryItems?.pipe(take(1)).subscribe((los) => {
        los.forEach((lo) => {
          if (!this.isAlreadyThere(lo))
            this.labOrders.push(lo);
        })
      })
    }
  }

  private isAlreadyThere(lo: any): boolean {
    for (let index = 0; index < this.labOrders.length; index++) {
      const element = this.labOrders[index];
      if (element._id == lo._id) {
        return true;
      }
    }
    return false;
  }



}
