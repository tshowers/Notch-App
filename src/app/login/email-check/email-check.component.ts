import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService, KIT_REGISTRATIONS } from 'src/app/shared/data.service';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { environment } from "../../../environments/environment";
import { take } from 'rxjs/operators';
import { UsersService } from 'src/app/shared/users.service';
import { KitRegistrationsService } from 'src/app/shared/kit-registrations.service';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.css']
})
export class EmailCheckComponent implements OnInit {

  private _userSubscription?: Subscription;
  private _testKitRegistrationSubscription?: Subscription;
  public production: boolean;
  public reLogin: boolean = true;
  public email: any;
  public kitNumber: any;
  public url: any;
  public idMismatch: boolean = false;

  constructor(private _router: Router, private _authService: NotchAuthService, private _dataService: DataService, private _usersService: UsersService, private _kitRegistrationsService: KitRegistrationsService) {
    this.production = environment.production;
  }

  ngOnInit(): void {
    this.checkLoginState();
  }

  ngOnDestroy(): void {
    if (this._testKitRegistrationSubscription)
      this._testKitRegistrationSubscription.unsubscribe();
    if (this._userSubscription)
      this._userSubscription.unsubscribe();
  }

  private async checkLoginState() {
    this.url = this._router.url;

    const email = window.localStorage.getItem('emailForSignIn');
    const id = window.localStorage.getItem('testKitRegistration');
    if (!this.production)
      console.log("Email from storage", email, "ID from storage", id);
    window.localStorage.removeItem('emailForSignIn');
    window.localStorage.removeItem('testKitRegistration');


    if (!email) {
      this.loginWithEmailAndKitNumber();
    } else this.beginLoginWithEmail(email, this.url, id);


  }

  public onSubmit() {
    try {
      this.reLogin = true;
      this.beginLoginWithEmail(this.email, this.url, this.kitNumber);
    } catch (error) {
      console.error(error);
    }
  }

  private async loginWithEmailAndKitNumber() {
    this.reLogin = false;
  }

  private async beginLoginWithEmail(email: any, url: any, id: any) {
    let loginOK = await this._authService.confirmSignIn(email, url);
    const isLoginOK: boolean = (loginOK == 'true');

    if (isLoginOK) {
      await this.checkUser();

      if (this.kitNumber && this.email)
        await this.checkSecondaryRegistrationState(id);
      else
        await this.checkRegistrationState(id);
    }
    else {
      this._router.navigate(['login-error'])
    }
    this.email = null;
    this.kitNumber = null;
    this.idMismatch = false;
  }

  private async checkUser() {
    return new Promise((resolve, reject) => {
      this._userSubscription = this._usersService.userSubject.pipe(take(1)).subscribe((user) => {
        user.testKitRegistration = null;
        resolve(user);
      })
      this._authService.setUserFromFirebase();
    })
  }

  private async checkSecondaryRegistrationState(id: any) {
    if (this.kitNumber) {
      let registrationProcess = await this.searchForRegistration(id);

      const isRegistrationProcess: boolean = (registrationProcess == 'true');

      if (!isRegistrationProcess)
        this._router.navigate(['kit-number-not-found']);
      else if (isRegistrationProcess)
        this._router.navigate(['summary']);

    } else {
      if (this._usersService.admin)
        this._router.navigate(['admin']);
      else
        this._router.navigate(['profiles', this._authService.uid]);
    }
  }

  private async checkRegistrationState(id: any) {
    let registrationProcess = await this.checkRegistration(id);
    const isRegistrationProcess: boolean = (registrationProcess == 'true');

    if (this.idMismatch)
      this._router.navigate(['kit-number-not-found']);
    else if (isRegistrationProcess)
      this._router.navigate(['summary']);
    else if (this._usersService.admin)
      this._router.navigate(['admin']);
    else
      this._router.navigate(['profiles', this._authService.uid]);

    this.idMismatch = false;
  }

  private async searchForRegistration(id: any) {
    return new Promise((resolve, reject) => {
      if (!id) reject();

      let found: boolean = false;
      this._dataService.searchByKitNumber(KIT_REGISTRATIONS, id);
      this._testKitRegistrationSubscription = this._dataService.items?.subscribe((data) => {
        data.forEach((item) => {
          if (item.email && item.email == (this._usersService.user.email)) {
            item.id = id;
            item.uid = this._authService.getFirestoreUser()?.uid;
            this._usersService.setTestKitRegistration(item, this._authService.getFirestoreUser());
            found = true;
            resolve('true');
          }
        });
        resolve('false');
      })
    })
  }


  private checkRegistration(id: any) {
    return new Promise((resolve, reject) => {

      if (id) {
        this._dataService.itemDoc(KIT_REGISTRATIONS, id);

        if (!this.production)
          console.log("WAITING FOR KIT", id)

        this._testKitRegistrationSubscription = this._dataService.item?.pipe(take(1)).subscribe((data) => {
          if (data && data._id) {
            if (!this.production)
              console.log("REGISTERING TEST KIT INFO", data, "User Email", this._usersService.user.email, data.email);

            if (data.email && data.email == (this._usersService.user.email)) {
              data.id = id;
              data.uid = this._authService.getFirestoreUser()?.uid;
              this._usersService.setTestKitRegistration(data, this._authService.getFirestoreUser());
              resolve('true');
            } else {
              this.idMismatch = true;
              if (!this.production)
                console.log("SUBSCRIPTION FAIL", id);
              resolve('false');
            }
          } else {
            if (!this.production)
              console.log("ID FAIL", id, data);

            this.idMismatch = true;
            resolve('false');
          }
        })
      } else {
        if (!this.production)
          console.log("NO ID", id);

        resolve('false');
      }
    })
  }

}
