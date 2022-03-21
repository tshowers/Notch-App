import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import "firebase/auth";
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';
import { KitRegistrationsService } from './kit-registrations.service';

@Injectable({
  providedIn: 'root'
})
export class NotchAuthService {

  private _firebaseUser?: firebase.User;

  public uid: any;

  public redirectUrl: string = '';

  public errorMessage: any;

  public emailSent: boolean = false;

  public production: boolean = false;

  private actionCodeSettings = {
    url: environment.summaryRedirect,
    handleCodeInApp: true
  };

  constructor(private _afAuth: AngularFireAuth, private _afs: AngularFirestore, private _userService: UsersService, private _kitRegistrationsService: KitRegistrationsService) {
    this.production = environment.production;
    try {
      this._afAuth.onAuthStateChanged(firebaseUser => {
        this._firebaseUser = firebaseUser!;

        if (!this.production)
          console.log("Auth State Change", firebaseUser);


        if (firebaseUser) {
          this.uid = this._firebaseUser.uid;
          this._userService.setUserFromFirebase(firebaseUser);
        }
      })

    } catch (error) {
      console.error("Auth Change", error)
    }
  }

  public isRegisteringKit(): boolean {
    if (!this.production)
      console.log("isRegisteringKit", this._userService.user)

    if (this._userService.user && this._userService.user.testKitRegistration) {
      return (this._userService.user.testKitRegistration.kitNumber != '') ? true : false
    } else {
      return false;
    }
  }

  public async signInWithEmail(emailAddress: string) {
    firebase.auth().sendSignInLinkToEmail(emailAddress, this.actionCodeSettings)
      .then(() => {

        window.localStorage.setItem('emailForSignIn', emailAddress);

        this.emailSent = true;
      })
      .catch((error) => {
        var errorCode = error.code;
        this.errorMessage = error.message;
        console.error(errorCode, this.errorMessage)
      });
  }

  public async confirmSignIn(email: any, url: any) {
    try {
      if (this._afAuth.isSignInWithEmailLink(url)) {

        if (!this.production)
          console.log("confirmSignIn", email, url, this._userService.user);

        const result = await this._afAuth.signInWithEmailLink((email) ? email : '', url);

        return (result && result.user && result.user.uid) ? 'true' : 'false';

      } else return 'false'
    } catch (error) {
      console.error(error);
      return 'false';
    }
  }

  public resetPassword(emailAddress: string): void {
    this._afAuth.sendPasswordResetEmail(emailAddress).then(() => {
    }).catch(error => {
      console.error(error);
    })
  }

  public changePassword(newPassword: string): void {
    this._firebaseUser?.updatePassword(newPassword).then(() => {
    }).catch(error => {
      console.error(error)
    })
  }

  public deleteAccount(): void {
    this._firebaseUser?.delete().then(() => {
    }).catch(error => {
      console.error(error);
    })
  }

  public reauthenticateUser(credential: any): void {
    this._firebaseUser?.reauthenticateWithCredential(credential).then(() => {
    }).catch(error => {
      console.error(error);
    })
  }

  private closeDown(): void {
    firebase.auth().signOut().then(() => {
      console.log("Bye bye!")
    }).catch((error) => {
      console.error(error);
    })
  }

  public getFirestoreUser() {
    return this._firebaseUser;
  }

  private async resetKitRegistration() {
    try {
      await this._kitRegistrationsService.updateUserTestKitRegistration(this._userService.user.testKitRegistration, this._firebaseUser);
    } catch (error) {
      console.error("Reset Kit Registration", error);

    }
  }

  private resetUser() {
    try {
      this._userService.resetUser();
      this._userService.unsubscribe();
    } catch (error) {
      console.error("Reset User", error);
    }
  }

  private async firebaseSignOut() {
    try {
      await this._afAuth.signOut();
    } catch (error) {
      console.error("Sign Out", error)
    }
  }

  public async signOut() {
    this.resetKitRegistration();

    this.resetUser();
    this._firebaseUser = undefined;
    this.uid = undefined;
    this.closeDown();
  }

  setUserFromFirebase(): void {
    this._userService.setUserFromFirebase(this._firebaseUser);
  }

  updateUser(): void {
    this._userService.updateUser(this._firebaseUser);
  }

}
