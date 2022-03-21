import { Component, OnInit } from '@angular/core';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {
  public production: boolean;

  constructor(private _authService: NotchAuthService) { 
    this.production = environment.production;
  }

  ngOnInit(): void {
    this.storageCheck();
    this._authService.signOut();
  }

  storageCheck(): void {
    window.localStorage.removeItem('testKitRegistration');
    window.localStorage.removeItem('emailForSignIn');
  }


}
