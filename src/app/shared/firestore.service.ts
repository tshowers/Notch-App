import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import firebase from "firebase/app";

export const TEST_KIT_ORDERS = '/test-kit-orders';
export const CUSTOMERS = '/customers';
export const LAB_ORDERS = '/lab-orders';
export const ORDERS = '/orders';
export const INVALID_ORDERS = '/invalid-orders';


type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private _afs: AngularFirestore) { }

  col<T>(ref: CollectionPredicate<T>, queryFn?:any) : AngularFirestoreCollection<T> {
    return typeof ref ==='string' ? this._afs.collection<T>(ref, queryFn) : ref

  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument {
    return typeof ref === 'string' ? this._afs.doc<T>(ref) : ref
  }

  doc$<T>(ref: DocPredicate<T>) : Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(
      map(doc => {
      return doc.payload.data() as T
    }))
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?: any): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(
      map(docs => {
        return docs.map(a => a.payload.doc.data()) as T[]
      })
    )
  }

  colWidthIds$<T>(ref: CollectionPredicate<T>, queryFn?: any) : Observable<any[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      })
    )

  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  set<T>(ref: DocPredicate<T>, data: any) {
    const timestamp = this.timestamp
    return this.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    })
  }

  geopoint(lat: number, lng:number) {
    return new firebase.firestore.GeoPoint(lat, lng);
  }


}
