import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Subscription } from 'rxjs';
import { NotchAuthService } from './notch-auth.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private _collectionName: string = "reports";

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;

  private _itemDoc?: AngularFirestoreDocument<any>;
  public item?: Observable<any>;

  public production: boolean;

  constructor(private _firestore: AngularFirestore, private _usersService: UsersService) { 
    this.production = environment.production;
  }

  getAll() {
    if (this._usersService.admin || this._usersService.super) {
      this._itemDocs = this._firestore.collection(this._collectionName);
      this.items = this._itemDocs.valueChanges({ idField: '_id' });
    }
  }

  onAdd(data: any) {
    data.updated_by = (this._usersService.user && this._usersService.user.email) ? this._usersService.user.email : '';
    return this._firestore.collection(this._collectionName).add(data);
  }

  itemDoc(id: string) {
    this._itemDoc = this._firestore.doc<any>(this._collectionName + '/' + id);
    this.item = this._itemDoc.valueChanges({ idField: '_id' });
  }


}
