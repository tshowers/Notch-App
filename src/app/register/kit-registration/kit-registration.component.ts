import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotchAuthService } from '../../shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { Subscription } from 'rxjs';
import { TestKitRegistration } from '../../models/test-kit-order.model';
import { DataService, KIT_REGISTRATIONS } from 'src/app/shared/data.service';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-kit-registration',
  templateUrl: './kit-registration.component.html',
  styleUrls: ['./kit-registration.component.css'],
  animations: [

  ]
})

export class KitRegistrationComponent implements OnInit, OnDestroy {

  public testKitRegistration: TestKitRegistration = {
    emailToSendResults: '',
    gender: '',
    shopifyOrderNumber: '',
    kitNumber: '',
    email: '',
    timeCollected: '',
    dateCollected: '',
    dob: '',
    status: '',
    orders: '',
    customer_id: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    zip: '',
    country: '',
    phoneNumber: '',
    displayName: '',
    emailNotification: true,
    textNotification: true,
    uid: '',
    _id: ''
  };

  private _sub?: Subscription;
  private _osub?: Subscription;
  private _usub?: Subscription;

  public diagDisplay = "none";

  public toggleDisplay = false;
  public production: boolean;

  public isAdmin: boolean = false;
  private _adminSubscription?: Subscription;


  constructor(private _router: Router,
    private _dataService: DataService,
    public authService: NotchAuthService,
    private _usersService: UsersService,
  ) {
    this.production = environment.production;
  }

  ngOnInit(): void {
    this.setAdmin();
    window.localStorage.removeItem('testKitRegistration');
    window.localStorage.removeItem('emailForSignIn');
  }

  ngOnDestroy() {
    if (this._sub)
      this._sub.unsubscribe();

    if (this._osub)
      this._osub.unsubscribe();

    if (this._usub)
      this._usub.unsubscribe();

    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();

  }


  setAdmin(): void {
    this.isAdmin = this._usersService.admin;
    this._adminSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
    })
  }

  isUserLoggedIn(): boolean {
    if (!this.production)
      console.log("LOGGED IN CONDITION", this.authService.uid, this._usersService.user, this._usersService.user.uid, this.authService.getFirestoreUser())
    return (this.authService.uid && this._usersService.user && this._usersService.user.uid && (this.authService.getFirestoreUser() != null));
  }

  public onSubmit() {
    try {
      this.setUserOrderInfo();
      this.processRequest();
    } catch (error) {
      console.error(error);
      this._router.navigate(['kit-number-not-found']);
    }
  }

  private setUserOrderInfo(): void {
    this._dataService.onAdd(KIT_REGISTRATIONS, this.testKitRegistration).then((result) => {
      this.testKitRegistration._id = result.id;
      window.localStorage.setItem('testKitRegistration', this.testKitRegistration._id);
      this._usersService.user.testKitRegistration = this.testKitRegistration;
      this._usersService.setTestKitRegistration(this.testKitRegistration, this.authService.getFirestoreUser());
    }).catch((error) => {
      console.error(error);
    });
  }


  private processRequest() {
    if (this.isUserLoggedIn() && (this.testKitRegistration.email == this.authService.getFirestoreUser()?.email)) {
      this._usersService.user.testKitRegistration = this.testKitRegistration;
      this._router.navigate(['summary']);
    } else {
      this.authService.signInWithEmail(this.testKitRegistration.email);
      this._router.navigate(['check-your-email']);
    }
  }

  public toggleDiagnostic(): void {
    this.diagDisplay = (this.diagDisplay == "none") ? "" : "none";
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }
}


