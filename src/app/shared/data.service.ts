import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { IpService } from './ip.service';
import { Subscription } from 'rxjs';
import { NotchAuthService } from './notch-auth.service';
import { filter, map } from 'rxjs/operators';
import { UsersService } from './users.service';

export const TEST_KIT_ORDERS = '/test-kit-orders';
export const INVALID_ORDERS = '/invalid-orders';
export const LAB_ORDERS = '/lab-orders';
export const ORDERS = '/orders';
export const PRODUCTS = '/products';
export const PROFILES = '/profiles';
export const USERS = '/users';
export const CUSTOMERS = '/customers';
export const SETTINGS = '/settings';
export const KIT_REGISTRATIONS = '/kit-registrations';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;

  private _itemDoc?: AngularFirestoreDocument<any>;
  public item?: Observable<any>;
  public production: boolean;
  private _ipSubscription?: Subscription;

  public pageSize = 100;
  public ipAddress = '';

  constructor(private _firestore: AngularFirestore, private _ipService: IpService, private _authService: NotchAuthService, private _usersService: UsersService) {
    this.production = environment.production;
    this.getIP();
  }

  ngOnDestroy(): void {
    if (this._ipSubscription)
      this._ipSubscription.unsubscribe();
  }

  getAll(collectionName: string) {
    if (this._usersService.admin || this._usersService.super) {
      this._itemDocs = this._firestore.collection(collectionName);
      this.items = this._itemDocs.valueChanges({ idField: '_id' });
    }
  }

  getAllByEmail(collectionName: string, email: string) {
    if (this._usersService.admin || this._usersService.super) {
      this._itemDocs = this._firestore.collection(collectionName, ref => ref.where("email", "==", email));
      this.items = this._itemDocs.valueChanges({ idField: '_id' });
    }
  }

  getAllDesc(collectionName: string) {
    if (this._usersService.admin || this._usersService.super) {
      this._itemDocs = this._firestore.collection(collectionName);
      this.items = this._itemDocs.valueChanges({ idField: '_id' });
    }
  }

  getLimited(collectionName: string) {
    this._itemDocs = this._firestore.collection(collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  onDelete(collectionName: string, id: string) {
    if (this._usersService.super) {
      this._firestore.collection(collectionName).doc(id).delete();
    }

  }

  onUpdate(collectionName: string, id: string, data: any) {
    data.updated_at = new Date().getTime();
    data.updated_by = (this._usersService.user && this._usersService.user.email) ? this._usersService.user.email : '';
    data.browser_ip = this.ipAddress;

    this._firestore.collection(collectionName).doc(id).set(data, { merge: true });
  }

  onAdd(collectionName: string, data: any) {
    data.updated_at = new Date().getTime();
    data.updated_by = (this._usersService.user && this._usersService.user.email) ? this._usersService.user.email : '';
    data.browser_ip = this.ipAddress;
    return this._firestore.collection(collectionName).add(data);
  }

  itemDoc(collectionName: string, id: string) {
    this._itemDoc = this._firestore.doc<any>(collectionName + '/' + id);
    this.item = this._itemDoc.valueChanges({ idField: '_id' });
  }


  getProductsByTitle(title: string) {
    return this._firestore.collection(PRODUCTS, ref => ref.where('title', '==', title)).get();
  }

  getAllByLastUpdated(collectionName: string) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref.orderBy('updated_at', "desc"));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByNotThis(collectionName: string, fieldName:string, notThisValue: string) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref.where(fieldName, "!=", notThisValue));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  searchByStatus(collectionName: string, status: any) {
    this.items = this._itemDocs?.valueChanges({ idField: '_id' }).pipe(
      map(items => {
        return items.filter(item => { return (item.status == status) || (item.status == Number(status)) })
      })
    );
  }

  sortByPatientLastName(data: any) {
    return data.sort((a: any, b: any) => {
      if (a['patient-lname'] > b['patient-lname']) return 1;
      if (a['patient-lname'] < b['patient-lname']) return -1;
      return 0;
    });
  }

  sortByLastName(data: any) {
    return data.sort((a: any, b: any) => {
      if (a.lastName > b.lastName) return 1;
      if (a.lastName < b.lastName) return -1;
      return 0;
    });
  }


  searchByKitNumber(collectionName: string, id: any) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref.where('kitNumber', '==', id).limit(this.pageSize));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }


  nextPageByLastUpdated(collectionName: string, last: any) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref
      .startAfter(last.updated_at)
      .orderBy('updated_at', "desc")
      .limit(this.pageSize));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  prevPageByLastUpdated(collectionName: string, first: any) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref
      .endBefore(first.updated_at)
      .orderBy('updated_at', "desc")
      .limitToLast(this.pageSize));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }


}
