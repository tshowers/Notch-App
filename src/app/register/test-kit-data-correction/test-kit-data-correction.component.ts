import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { Location } from '@angular/common';
import { DataService, KIT_REGISTRATIONS } from 'src/app/shared/data.service';
import { environment } from "../../../environments/environment";
import { OrdersService } from 'src/app/shared/orders.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';

export const GENDERS = ['Male', 'Female'];

@Component({
  selector: 'app-test-kit-data-correction',
  templateUrl: './test-kit-data-correction.component.html',
  styleUrls: ['./test-kit-data-correction.component.css']
})
export class TestKitDataCorrectionComponent implements OnInit {

  public testKitRegistration: any;
  public uid?: string;
  public GENDERS = GENDERS;

  public diagDisplay = "none";
  public toggleDisplay = false;

  public maxDate = new Date().getTime();
  public production: boolean;
  public ageWarning = "none";
  public stateWarning = "none";
  public amazonID: any;

  constructor(private _authService: NotchAuthService, private _router: Router, private _location: Location, private _dataService: DataService, private _usersService: UsersService) {
    this.production = environment.production;
    this.uid = this._authService.getFirestoreUser()?.uid;
    this.testKitRegistration = this._usersService.user.testKitRegistration;

  }

  ngOnInit(): void {
    this.storageCheck();
  }

  onUpdate(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    try {
      if (this.isAgeOK() && this.isStateOK()) {
        if (Array.isArray(this.testKitRegistration.orders)) {
          this.testKitRegistration.orders = this.testKitRegistration.orders[0];
        }
        this._dataService.onUpdate(KIT_REGISTRATIONS, this.testKitRegistration._id, this.testKitRegistration)
      }
    } catch (error) {
      console.error(error);
    }
    this.back();
  }

  back(): void {
    this._location.back()
  }

  isAgeOK(): boolean {
    let today = new Date();
    let birthDay = new Date(this.testKitRegistration.dob);
    let cutOff = new Date(today.setFullYear(today.getFullYear() - 18));

    if (birthDay.getFullYear() < cutOff.getFullYear()) {
      return true;
    } else {
      this.ageWarning = '';
      setTimeout(() => { this.ageWarning = 'none' }, 10000);
      return false;
    }
    
  }

  storageCheck(): void {
    let id = window.localStorage.getItem('testKitRegistration');
    window.localStorage.removeItem('testKitRegistration');
    window.localStorage.removeItem('emailForSignIn');
  }


  isStateOK(): boolean {
    if ((this.testKitRegistration.province == 'NY') || (this.testKitRegistration.province == 'NJ') || (this.testKitRegistration.province == 'RI')) {
      this.stateWarning = '';
      setTimeout(() => { this.stateWarning = 'none' }, 10000);
      return false;
    } else return true;
  }


  public toggleDiagnostic(): void {
    this.diagDisplay = (this.diagDisplay == "none") ? "" : "none";
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }


}
