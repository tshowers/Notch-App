import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { IpService } from './ip.service';
import { Subscription } from 'rxjs';

import { TestKitRegistration } from '../models/test-kit-order.model';
import { NotchAuthService } from './notch-auth.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class LabOrdersService implements OnDestroy {

  private _collectionName: string = "lab-orders";
  private _collectionStatusChanges: string = "lab-order-status";


  private _secondaryItemDocs?: AngularFirestoreCollection;
  public secondaryItems?: Observable<any[]>;

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;

  private _statusChangeDocs?: AngularFirestoreCollection;
  public statusChange?: Observable<any[]>;

  public production: boolean;
  public ipAddress = '';
  private _ipSubscription?: Subscription;

  constructor(private _firestore: AngularFirestore, private _ipService: IpService, private _authService: NotchAuthService, private _usersService: UsersService) {
    this.production = environment.production;
    this.getIP();
  }

  ngOnDestroy(): void {
    if (this._ipSubscription)
      this._ipSubscription.unsubscribe();
  }

  get(ID: string) {
    return this._firestore.doc(this._collectionName + '/' + ID)
  }

  getAll() {
    if (this._usersService.admin || this._usersService.super) {
      this._itemDocs = this._firestore.collection(this._collectionName);
      this.items = this._itemDocs.valueChanges({ idField: '_id' });
    }
  }

  getStatusUpdates(id: any) {
    if (this._usersService.admin || this._usersService.super) {
      this._statusChangeDocs = this._firestore.collection(this._collectionStatusChanges, ref => ref.where('id', '==', id));
      this.statusChange = this._statusChangeDocs.valueChanges({ idField: '_id' });
    }
  }

  sortByDate(data: any) {
    return data.sort((a: any, b: any) => {
      if (a.updated_at > b.updated_at) return 1;
      if (a.updated_at < b.updated_at) return -1;
      return 0;
    });
  }


  // Note: Do not update
  createLabOrderFromOrder(testKitRegistration: TestKitRegistration, uid: any) {
    return this._firestore.collection(this._collectionName).add(this.getData(testKitRegistration, uid))
  }

  labOrderByEmail(email: any): void {
    this._secondaryItemDocs = this._firestore.collection(this._collectionName, ref => ref.where('email', '==', email));
    this.secondaryItems = this._secondaryItemDocs.valueChanges({ idField: '_id' });
  }


  labOrderByProfile(uid: any): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('uid', '==', uid));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  labOrderByTimeStamp(): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.orderBy('updated_at', "desc").limit(50));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  private getData(testKitRegistration: TestKitRegistration, uid: any) {
    let orderID, customerID, order, orderDate, id;

    if (Array.isArray(testKitRegistration.orders)) {
      orderID = (testKitRegistration.orders && testKitRegistration.orders[0] && testKitRegistration.orders[0].id) ? testKitRegistration.orders[0].id : '';
      customerID = (testKitRegistration.orders && testKitRegistration.orders[0] && testKitRegistration.orders[0].customer && testKitRegistration.orders[0].customer.id) ? testKitRegistration.orders[0].customer.id : '';
      order = (testKitRegistration.orders && testKitRegistration.orders[0]) ? testKitRegistration.orders[0] : '';
      orderDate = (testKitRegistration.orders && testKitRegistration.orders[0].created_at) ? (testKitRegistration.orders[0].created_at) : '';
      id = (testKitRegistration.orders && testKitRegistration.orders[0] && testKitRegistration.orders[0].id) ? testKitRegistration.orders[0].id : '';

    } else {
      orderID = (testKitRegistration.orders && testKitRegistration.orders.id) ? testKitRegistration.orders.id : '';
      customerID = (testKitRegistration.orders && testKitRegistration.orders.customer && testKitRegistration.orders.customer.id) ? testKitRegistration.orders.customer.id : '';
      order = (testKitRegistration.orders) ? testKitRegistration.orders : '';
      orderDate = (testKitRegistration.orders && testKitRegistration.orders.created_at) ? (testKitRegistration.orders.created_at) : '';
      id = (testKitRegistration.orders && testKitRegistration.orders.id) ? testKitRegistration.orders.id : '';
    }


    let data = {
      "order-id": orderID,
      "customer-id": customerID,
      "uid": uid,
      "prac-id": environment.pracId,
      "loc-pos": 1,
      "patient-fname": (testKitRegistration.firstName) ? testKitRegistration.firstName : '',
      "patient-mname": "",
      "patient-lname": (testKitRegistration.lastName) ? testKitRegistration.lastName : '',
      "patient-gender": (testKitRegistration.gender) ? testKitRegistration.gender : '',
      "patient-age": "",
      "email": (testKitRegistration.email) ? testKitRegistration.email : '',
      "patient-dob": (testKitRegistration.dob) ? testKitRegistration.dob : '',
      "patient-address": ((testKitRegistration.address1) ? testKitRegistration.address1 : '') + ((testKitRegistration.address2) ? testKitRegistration.address2 : ''),
      "patient-city": (testKitRegistration.city) ? testKitRegistration.city : '',
      "patient-state": (testKitRegistration.province) ? testKitRegistration.province : '',
      "patient-country": (testKitRegistration.country) ? testKitRegistration.country : '',
      "patient-zip": (testKitRegistration.zip) ? testKitRegistration.zip : '',
      "patient-phday": (testKitRegistration.phoneNumber) ? testKitRegistration.phoneNumber : '',
      "date-drawn": (testKitRegistration.dateCollected) ? (testKitRegistration.dateCollected) : '',
      "order": order,
      "bill-method": environment.billMethod,
      "status": testKitRegistration.status,
      "ordered-date": orderDate,
      "ordered-by": environment.orderedBy,
      "time-drawn": (testKitRegistration.timeCollected) ? testKitRegistration.timeCollected : '',
      "kit_label": (testKitRegistration.kitNumber) ? testKitRegistration.kitNumber : '',
      "emailNotification": testKitRegistration.emailNotification,
      "textNotification": testKitRegistration.textNotification,
      "testKitRegistration": testKitRegistration,
      "notch_order_id": id,
      "notch_name": (testKitRegistration.shopifyOrderNumber) ? testKitRegistration.shopifyOrderNumber : '',
      "updated_at": new Date().getTime(),
      "updated_by": (this._usersService.user && this._usersService.user.email) ? this._usersService.user.email : '',
      "browser_ip": this.ipAddress,
      "kit_registration_id": (testKitRegistration._id) ? testKitRegistration._id : null
    }
    return data;
  }

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

  public getDaysDiff(last: number, first: number) {
    return Math.round((last - first) / (1000 * 60 * 60 * 24));
  }

}
