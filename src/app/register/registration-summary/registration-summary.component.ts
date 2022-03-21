import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { Location } from '@angular/common';
import { LabOrdersService } from 'src/app/shared/lab-orders.service';
import { Subscription } from 'rxjs';
import { DataService, KIT_REGISTRATIONS } from '../../shared/data.service';
import { environment } from "../../../environments/environment";

import { TestKitRegistration } from '../../models/test-kit-order.model';
import { UsersService } from 'src/app/shared/users.service';
import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-registration-summary',
  templateUrl: './registration-summary.component.html',
  styleUrls: ['./registration-summary.component.css']
})
export class RegistrationSummaryComponent implements OnInit, OnDestroy {

  public testKitRegistration: TestKitRegistration;
  public displayName: any;
  public additionalInfoNeeded: boolean = false;

  public diagDisplay = "none";
  public toggleDisplay = false;

  private _uid?: string;

  private _sub?: Subscription;
  private _usub?: Subscription;
  private _userAlreadyHasAccount: boolean = false;
  public production: boolean;
  loading: any;
  public user: any;

  constructor(private _router: Router, private _authService: NotchAuthService, private location: Location, private _labOrderService: LabOrdersService, private _dataService: DataService, private _usersService: UsersService, private _ordersService: OrdersService) {
    this.production = environment.production;
    this._uid = this._authService.getFirestoreUser()?.uid;
    this.testKitRegistration = this._usersService.user.testKitRegistration;
    if (!this.production)
      console.log("USER and TEST KIT REGISTRATION", this._usersService.user, this.testKitRegistration, this._uid)
  }


  ngOnInit(): void {
    this.userInit();
    this.storageCheck();
  }

  ngOnDestroy() {
    if (this._sub)
      this._sub.unsubscribe();
    if (this._usub)
      this._usub.unsubscribe();
  }

  private userInit(): void {
    this.setUserVitals(this._usersService.user);
    this.fillInIfKnown();
    this.checkAdditionalInfoRequired();

    this._usub = this._usersService.userSubject.subscribe((user: any) => {
      this.user = user;

      if (this._authService.uid && user.uid && (this._authService.getFirestoreUser() != null)) {
        if (!this.production)
          console.log("USER CHANGE SUBSCRIPTION", this._usersService.user);

        this.testKitRegistration = user.testKitRegistration;
        this._userAlreadyHasAccount = true;
        this._uid = this._authService.getFirestoreUser()?.uid;
        this.testKitRegistration.uid = this._authService.uid;
        this.setUserVitals(user);
        this.fillInIfKnown();
        this.checkAdditionalInfoRequired();
        this.loading = 'load complete';
      }
    });
  }

  private fillInIfKnown(): void {
    if (this.testKitRegistration && this.testKitRegistration.email && this.testKitRegistration.kitNumber) {
      this.testKitRegistration.uid = this._uid;
      this.loading = 'load complete';
      this.checkOrders(this.testKitRegistration.email, this.testKitRegistration.kitNumber);
    }
  }

  private storageCheck(): void {
    let id = window.localStorage.getItem('testKitRegistration');
    if (!this.production)
      console.log("TEST KIT REGISTRATION IN STORAGE", id);

    window.localStorage.removeItem('testKitRegistration');
    window.localStorage.removeItem('emailForSignIn');
  }

  private async checkOrders(email: any, kitID: any) {
    // Look for order based on email address or Shopify order number
    let orders = await this.makeEmailCheckRequest(email);

    // If orders were returned, look for the kit ID  
    await this.isOrderFound(kitID, orders);

  }

  private makeEmailCheckRequest(emailAddress: string) {
    return new Promise((resolve, reject) => {
      this._ordersService.customerOrderByEmail(emailAddress);
      this._sub = this._ordersService.items?.subscribe((orders) => {
        if (orders && orders.length && (orders.length > 0)) {
          resolve(orders)
        }
        else
          resolve(null);
      })
    })
  }

  private isOrderFound(kitID: string, orders: any) {
    return new Promise((resolve, reject) => {
      if (orders && orders.length && (orders.length > 0)) {
        for (let index = 0; index < orders.length; index++) {
          const order = orders[index];
          if (order.note && (order.note.indexOf(kitID) >= 0)) {
            this.testKitRegistration.orders = order;
            if (!this.production)
              console.log("ORDER and Kit Number found", order.note, kitID, "Email Match", (this.testKitRegistration.email == order.email));
            this.transferOrderInfo(order);
            resolve('true');
          }
        }
        if (!this.production)
          console.log("ORDER and Kit Number NOT found");
        resolve('false');
      } else {
        resolve('false');
      }
    })
  }

  private transferOrderInfo(order: any): void {
    // See if we are getting an array or not
    let o = (Array.isArray(order)) ? this.testKitRegistration.orders[0] : order;

    // Fill in Test Registraion with Shopify order info
    this.testKitRegistration.orders = o;
    this.testKitRegistration.shopifyOrderNumber = (order && order.name) ? order.name : '';
    if (this.testKitRegistration.email == order.email) {
      this.testKitRegistration.email = (order && order.email) ? order.email : '';
      this.testKitRegistration.customer_id = (order && order.customer && order.customer.id) ? order.customer.id : '';
      this.testKitRegistration.firstName = (order && order.customer && order.customer.first_name) ? order.customer.first_name : '';
      this.testKitRegistration.lastName = (order && order.customer && order.customer.last_name) ? order.customer.last_name : '';
      this.testKitRegistration.address1 = (order && order.customer && order.customer.default_address && order.customer.default_address.address1) ? order.customer.default_address.address1 : '';
      this.testKitRegistration.address2 = (order && order.customer && order.customer.default_address && order.customer.default_address.address2) ? order.customer.default_address.address2 : '';
      this.testKitRegistration.city = (order && order.customer && order.customer.default_address && order.customer.default_address.city) ? order.customer.default_address.city : '';
      this.testKitRegistration.province = (order && order.customer && order.customer.default_address && order.customer.default_address.province) ? order.customer.default_address.province : '';
      this.testKitRegistration.zip = (order && order.customer && order.customer.default_address && order.customer.default_address.zip) ? order.customer.default_address.zip : '';
      this.testKitRegistration.country = (order && order.customer && order.customer.default_address && order.customer.default_address.country) ? order.customer.default_address.country : '';
      this.testKitRegistration.phoneNumber = (order && order.customer && order.customer.default_address && order.customer.default_address.phone) ? order.customer.default_address.phone : '';
    }
  }

  checkAdditionalInfoRequired(): void {
    if ((this.testKitRegistration.firstName == '')
      || (this.testKitRegistration.lastName == '')
      || (this.testKitRegistration.timeCollected == '')
      || (this.testKitRegistration.dateCollected == '')
      || (this.testKitRegistration.gender == '')
      || (this.testKitRegistration.address1 == '')
      || (this.testKitRegistration.city == '')
      || (this.testKitRegistration.province == '')
      || (this.testKitRegistration.zip == '')
      || (this.testKitRegistration.phoneNumber == '')
      || (this.testKitRegistration.email == '')) {
      this.additionalInfoNeeded = true;
    }
  }

  private setUserVitals(user: any) {
    try {
      if (!user) return;
      if (this.testKitRegistration.email != user.email) return;

      if (this.testKitRegistration.dob == '')
        this.testKitRegistration.dob = (user.dob) ? user.dob : '';

      if (this.testKitRegistration.gender == '')
        this.testKitRegistration.gender = (user.gender) ? user.gender : '';

      if (this.testKitRegistration.firstName == '')
        this.testKitRegistration.firstName = (user.firstName) ? user.firstName : '';

      if (this.testKitRegistration.lastName == '')
        this.testKitRegistration.lastName = (user.lastName) ? user.lastName : '';

      if (this.testKitRegistration.dob == '')
        this.testKitRegistration.dob = (user.dob) ? user.dob : '';

      if (this.testKitRegistration.phoneNumber == '')
        this.testKitRegistration.phoneNumber = (user.phoneNumber) ? user.phoneNumber : '';

      if (this.testKitRegistration.address1 == '')
        this.testKitRegistration.address1 = (user.address1) ? user.address1 : '';

      if (this.testKitRegistration.city == '')
        this.testKitRegistration.city = (user.city) ? user.city : '';

      if (this.testKitRegistration.province == '')
        this.testKitRegistration.province = (user.province) ? user.province : '';

      if (this.testKitRegistration.zip == '')
        this.testKitRegistration.zip = (user.zip) ? user.zip : '';

    } catch (error) {
      console.error(error);
    }
  }

  onProfile(): void {
    this._router.navigate(['test-kit-registration-correction']);
  }

  back(): void {
    this.location.back()
  }

  next(): void {
    this.registerKit();
  }


  async registerKit() {
    try {
      if (this.testKitRegistration) {
        await this.activateKit();
        await this.createLabOrder();
        await this.updateUser();
        this._router.navigate(['thank-you']);
      } else {
        this._router.navigate(['/']);
      }
    } catch (error) {
      console.error(error);
      this._router.navigate(['error'])
    }
  }

  private activateKit() {
    return new Promise((resolve, reject) => {
      this.testKitRegistration.status = '998';
      this.testKitRegistration.uid = this._uid;
      if (Array.isArray(this.testKitRegistration.orders)) {
        this.testKitRegistration.orders = this.testKitRegistration.orders[0];
      }
      resolve(this._dataService.onUpdate(KIT_REGISTRATIONS, this.testKitRegistration._id, this.testKitRegistration));
    })
  }

  private createLabOrder() {
    return new Promise((resolve, reject) => {
      this._labOrderService.createLabOrderFromOrder(this.testKitRegistration, this._uid)
        .then((res) => {
          resolve(res);
        })
    })
  }

  async updateUser() {
    return new Promise((resolve, reject) => {
      this._usersService.user.email = this.testKitRegistration.email;
      this._usersService.user.firstName = this.testKitRegistration.firstName;
      this._usersService.user.lastName = this.testKitRegistration.lastName;
      this._usersService.user.gender = this.testKitRegistration.gender;
      this._usersService.user.dob = this.testKitRegistration.dob;
      this._usersService.user.phoneNumber = this.testKitRegistration.phoneNumber;
      this._usersService.user.customer_id = this.testKitRegistration.customer_id;
      this._usersService.user.address1 = this.testKitRegistration.address1;
      this._usersService.user.address2 = this.testKitRegistration.address2;
      this._usersService.user.city = this.testKitRegistration.city;
      this._usersService.user.province = this.testKitRegistration.province;
      this._usersService.user.zip = this.testKitRegistration.zip;
      this._usersService.user.country = this.testKitRegistration.country;
      this._usersService.user.testKitRegistration = null;
      this._usersService.setCustomer();
      resolve(this._authService.updateUser());
    })

  }

  public toggleDiagnostic(): void {
    this.diagDisplay = (this.diagDisplay == "none") ? "" : "none";
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }


}
