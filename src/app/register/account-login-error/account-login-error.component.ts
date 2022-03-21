import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-login-error',
  templateUrl: './account-login-error.component.html',
  styleUrls: ['./account-login-error.component.css']
})
export class AccountLoginErrorComponent implements OnInit {

  constructor(private _router: Router, private _location: Location) { }

  ngOnInit(): void {
  }

  
  onRetry() : void {
    this._router.navigate(['/']);

  }

  back(): void {
    this._location.back()
  }

}
