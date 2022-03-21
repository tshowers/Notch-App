import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService, USERS } from 'src/app/shared/data.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { environment } from "../../../environments/environment";

export const GENDERS = ['Male', 'Female'];

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  public uid?: any;
  public displayName: any;
  public photoURL: any;
  public isAdmin: boolean = false;
  private _adminSubscription?: Subscription;
  private _userSubscription?: Subscription;

  public diagDisplay = "none";
  public toggleDisplay = false;

  public user: User;

  public GENDERS = GENDERS;
  public maxDate = new Date().toLocaleDateString();
  public production: boolean;

  constructor(private _authService: NotchAuthService, private _location: Location, private _dataService: DataService, private _usersService: UsersService) {
    //Set User ID for public use
    this.production = environment.production;
    this.uid = this._authService.getFirestoreUser()?.uid;
    this.user = this._usersService.user;
    this.displayName = this._authService.getFirestoreUser()?.displayName;
    this.photoURL = this._authService.getFirestoreUser()?.photoURL;
  }

  ngOnInit(): void {
    this.isAdmin = this._usersService.admin;
    this._adminSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
    });

    this._userSubscription = this._usersService.userSubject.subscribe((user: User) => {
      this.user = user;
    });

  }

  ngOnDestroy() {
    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();
    if (this._userSubscription)
      this._userSubscription.unsubscribe();

  }

  onSubmit(f: NgForm): void {
    this._authService.updateUser();
    this.back();
  }

  back(): void {
    this._location.back()
  }

  public toggleDiagnostic(): void {
    this.diagDisplay = (this.diagDisplay == "none") ? "" : "none";
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }

}
