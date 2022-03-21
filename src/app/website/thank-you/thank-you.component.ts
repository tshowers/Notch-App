import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  public uid: string;
  public production: boolean;

  constructor(private _router: Router, private _authService: NotchAuthService) { 
    this.uid = this._authService.getFirestoreUser()?.uid!;
    this.production = environment.production;
  }

  ngOnInit(): void {
    this.storageCheck();
  }

  onProfile() : void {
    this._router.navigate(['profiles', this.uid]);
  }

  storageCheck(): void {
    window.localStorage.removeItem('testKitRegistration');
    window.localStorage.removeItem('emailForSignIn');
  }

}
