import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-check-your-email',
  templateUrl: './check-your-email.component.html',
  styleUrls: ['./check-your-email.component.css']
})
export class CheckYourEmailComponent implements OnInit {

  resendMessage: any;
  public closeMessage: boolean = false;

  constructor(public authService: NotchAuthService, private _router:Router, private _location: Location) { }

  ngOnInit(): void { 
    setTimeout(() => { this.closeMessage = true; }, 300000);
  }

  resend() : void {
    this._location.back();
  }

}
