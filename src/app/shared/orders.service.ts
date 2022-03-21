import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';
import { NotchAuthService } from './notch-auth.service';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _collectionName: string = "orders"

  private _itemDoc?: AngularFirestoreDocument<any>;
  public item?: Observable<any>;
  public items?: Observable<any[]>;
  private _itemDocs?: AngularFirestoreCollection;

  constructor(private _firestore: AngularFirestore, private _authService: NotchAuthService, private _userService: UsersService) {
  }

  getAll() {
    if (this._userService.admin || this._userService.super) {
      this._itemDocs = this._firestore.collection(this._collectionName);
      this.items = this._itemDocs.valueChanges({ idField: '_id' });
    }
  }


  customerOrder(ID: string): void {
    this._itemDoc = this._firestore.doc<any>(this._collectionName + '/' + ID);
    this.item = this._itemDoc.valueChanges();

  }

  customerOrderByKit(kitID: string): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('note', '==', kitID));
    this.items = this._itemDocs.valueChanges();
  }

  customerOrderByKitIDFiltered(kitID: string): void {
    this.items = this._firestore.collection(this._collectionName, ref => ref.where('note', '!=', '')).snapshotChanges()
      .pipe(
        concatMap(orders => orders.map(o => o.payload.doc.data())),
        filter((order: any) => order.note.indexOf(kitID) >= 0)
      )
  }

  customerOrderByAmazonID(id: string): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('note_attributes', 'array-contains', {value: id, name: 'Amazon Order ID'}));
    this.items = this._itemDocs.valueChanges();
  }


  customerOrderByName(name: string): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('name', '==', name));
    this.items = this._itemDocs.valueChanges();
  }

  customerOrderByID(id: string): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('id', '==', id));
    this.items = this._itemDocs.valueChanges();
  }

  customerOrderByIDNumber(id: number): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('id', '==', id));
    this.items = this._itemDocs.valueChanges();
  }

  customerOrderByEmail(emailAddress: string): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('email', '==', emailAddress));
    this.items = this._itemDocs.valueChanges();
  }

  public pushListToArray(data: any): any[] {
    let list: any[] = [];
    for (let item in data) {
      list.push(data[item]);
    }
    return list;
  }

}
