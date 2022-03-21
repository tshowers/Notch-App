import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from 'src/app/shared/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public production: boolean;

  public diagDisplay = "none";

  public toggleDisplay = false;

  constructor(private _router: Router, public authService: NotchAuthService, public usersService: UsersService) { 
    this.production = environment.production;
  }

  ngOnInit(): void { 
    setTimeout(() => {
      this.authService.signOut();
    }, 2000)
  }

  onSubmit(): void {
    this.authService.signInWithEmail(this.email);
    this._router.navigate(['check-your-email']);
  }

  back() : void {
    this._router.navigate(['/']);
  }

  public toggleDiagnostic(): void {
    this.diagDisplay = (this.diagDisplay == "none") ? "" : "none";
    this.toggleDisplay = (this.toggleDisplay) ? false : true;
  }


}
