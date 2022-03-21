import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private _collectionName: string = "customers"

  private _itemDoc?: AngularFirestoreDocument<any>;
  public item?: Observable<any>;
  public items?: Observable<any[]>;
  private _itemDocs? : AngularFirestoreCollection;

  constructor(private _firestore: AngularFirestore) { 
  }

  getAll() {
    this._itemDocs = this._firestore.collection(this._collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }
}
