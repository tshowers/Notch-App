import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KitRegistrationsService {

  private _collectionName: string = "kit-registrations";

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;
  public production: boolean = false;


  constructor(private _firestore: AngularFirestore) {
    this.production = environment.production;
  }

  getAll() {
    this._itemDocs = this._firestore.collection(this._collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByLastName() {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.orderBy('lastName'));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  kitRegistrationsByProfile(uid: string): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('uid', '==', uid));
    this.items = this._itemDocs.valueChanges();
  }

  public async updateUserTestKitRegistration(testKitRegistration: any, firebaseUser: any) {
    if (!firebaseUser) return;
    if (!testKitRegistration) return;
    if (!firebaseUser.uid) return;

    try {
      return this._firestore.collection('users').doc(firebaseUser.uid).set({
        "testKitRegistration": testKitRegistration,
      }, { merge: true });
    } catch (error) {
      console.error("UPDATE USER TEST KIT REGISTRATION", error, testKitRegistration);
      return null;
    }

  }



}
