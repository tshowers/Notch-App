import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { TestKitRegistration } from '../models/test-kit-order.model';
import { KitRegistrationsService } from './kit-registrations.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {

  private _collectionName: string = "users"
  private _itemDoc?: AngularFirestoreDocument<any>;
  private _itemDocs?: AngularFirestoreCollection;

  private _userSubscription?: Subscription;

  public item?: Observable<any>;
  public items?: Observable<any[]>;
  public production: boolean = false;
  public user: User = new User();
  public userSubject = new Subject<User>();
  public adminSubject = new Subject<boolean>();
  public customerServiceSubject = new Subject<boolean>();
  public patientSubject = new Subject<boolean>();
  public customerSubject = new Subject<boolean>();
  public superSubject = new Subject<boolean>();
  public admin: boolean = false;
  public customerService: boolean = false;
  public patient: boolean = false;
  public customer: boolean = false;
  public super: boolean = false;
  public graphShown: boolean = false;


  constructor(private _firestore: AngularFirestore, private _kitRegistrationService: KitRegistrationsService) {
    this.production = environment.production;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public unsubscribe(): void {
    if (this._userSubscription)
      this._userSubscription.unsubscribe();

  }

  getAll() {
    this._itemDocs = this._firestore.collection(this._collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  updateUserFromFirebase(firebaseUser: any) {
    if (!(firebaseUser && firebaseUser.uid)) return;

    try {
      if (!this.production)
        console.log("UPDATING USER FROM FIREBASE", firebaseUser.uid);

      return this._firestore.collection('users').doc(firebaseUser.uid).set({
        "uid": (firebaseUser && firebaseUser.uid) ? firebaseUser.uid : '',
        "email": (firebaseUser && firebaseUser.email) ? firebaseUser.email : '',
        "photoURL": (firebaseUser && firebaseUser.photoURL) ? firebaseUser.photoURL : '',
        "displayName": (firebaseUser && firebaseUser.displayName) ? firebaseUser.displayName : '',
        "updated_at": new Date().getTime()
      }, { merge: true });
    } catch (error) {
      console.error("UPDATE USER FROM FIREBASE", error);
      return null;
    }


  }


  updateUser(firebaseUser: any) {
    if (!(firebaseUser && firebaseUser.uid)) return;

    try {
      if (!this.production)
        console.log("UPDATING USER", firebaseUser.uid);

      return this._firestore.collection('users').doc(firebaseUser.uid).set({
        "email": (this.user.email) ? this.user.email : '',
        "emailToSendResults": (this.user.emailToSendResults) ? this.user.emailToSendResults : '',
        "firstName": (this.user.firstName) ? this.user.firstName : '',
        "lastName": (this.user.lastName) ? this.user.lastName : '',
        "gender": (this.user.gender) ? this.user.gender : '',
        "dob": (this.user.dob) ? this.user.dob : '',
        "phoneNumber": (this.user.phoneNumber) ? this.user.phoneNumber : '',
        "customer_id": (this.user.customer_id) ? this.user.customer_id : '',
        "address1": (this.user.address1) ? this.user.address1 : '',
        "address2": (this.user.address2) ? this.user.address2 : '',
        "city": (this.user.city) ? this.user.city : '',
        "province": (this.user.province) ? this.user.province : '',
        "zip": (this.user.zip) ? this.user.zip : '',
        "county": (this.user.county) ? this.user.county : '',
        "testKitRegistration": (this.user.testKitRegistration) ? this.user.testKitRegistration : null,
        "updated_at": new Date().getTime()
      }, { merge: true });
    } catch (error) {
      console.error("UPDATE USER", error);
      return null;
    }

  }

  fixupUserData(user: any): void {
    user.email = (user.email) ? user.email : ''
  }

  public resetUser(): void {
    this.user = new User();
  }

  private setAuthority(): void {
    this.super = this.isSuper();
    this.superSubject.next(this.super);

    this.customerService = this.isCustomerService();
    this.customerServiceSubject.next(this.customerService);

    this.patient = this.isPatient();
    this.patientSubject.next(this.patient);

    this.customer = this.isCustomer();
    this.customerSubject.next(this.customer);

    this.admin = this.isAdmin();
    this.adminSubject.next(this.admin);

  }

  private setUser(firebaseUser: any): void {
    if (!firebaseUser) return;

    this.user.email = (firebaseUser && firebaseUser.email) ? firebaseUser.email : '';
    this.user.uid = firebaseUser.uid;
    this.user.displayName = (firebaseUser && firebaseUser.displayName) ? firebaseUser.displayName : '';
    this.user.photoURL = (firebaseUser && firebaseUser.photoURL) ? firebaseUser.photoURL : '';
    this.user.emailVerified = firebaseUser.emailVerified;
    this.updateUserFromFirebase(firebaseUser);
    this.userSubject.next(this.user);

    if (!this.production)
      console.log("SET USER", this.user);
  }

  public setUserFromFirebase(firebaseUser: any): void {
    if (!firebaseUser) return;
    try {
      this._userSubscription = this._firestore.collection('users').doc(firebaseUser.uid).get().subscribe((user) => {
        if (user.data()) {
          this.userFound(user);
        } else {
          this.userNotFound(firebaseUser);
        }
      })
    } catch (error) {
      console.error("SET USER FROM FIREBASE", error)
    }

  }

  private userFound(user: any): void {
    this.user = <User>user.data();
    this.setAuthority();
    this.userSubject.next(this.user);
    if (!this.production)
      console.log("USER FOUND", this.user);
  }

  private userNotFound(firebaseUser: any): void {
    this.setUser(firebaseUser);
    this.setCustomer();
    this.setAuthority();
  }

  public setAdmin(): void {
    this.user.roles = ["patient", "customer_service", "admin"];
  }

  public setCustomerService(): void {
    this.user.roles = ["patient", "customer_service"];
  }

  public setPatient(): void {
    this.user.roles = ["patient"];
  }

  public setCustomer(): void {
    this.user.roles = ["customer"];
  }

  private isAdmin(): boolean {
    if (this.user && this.user.roles) {
      return this.user.roles.includes("admin");
    }
    else return false;
  }

  private isCustomerService(): boolean {
    if (this.user && this.user.roles) {
      return this.user.roles.includes("customer_service");
    }
    else return false;
  }

  private isPatient(): boolean {
    if (this.user && this.user.roles) {
      return this.user.roles.includes("patient");
    }
    else return false;
  }

  private isCustomer(): boolean {
    if (this.user && this.user.roles) {
      return this.user.roles.includes("customer");
    }
    else return false;
  }

  private isSuper(): boolean {
    if (this.user && this.user.roles) {
      return this.user.roles.includes("super");
    }
    else return false;
  }

  public setTestKitRegistration(testKitRegistration: TestKitRegistration, firebaseUser: any) {
    this.user.testKitRegistration = testKitRegistration;
    this._kitRegistrationService.updateUserTestKitRegistration(testKitRegistration, firebaseUser);
    this.userSubject.next(this.user);
  }
}
