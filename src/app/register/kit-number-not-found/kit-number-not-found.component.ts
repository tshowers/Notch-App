import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-kit-number-not-found',
  templateUrl: './kit-number-not-found.component.html',
  styleUrls: ['./kit-number-not-found.component.css']
})
export class KitNumberNotFoundComponent implements OnInit {

  constructor(private _router: Router, private _location: Location, private _authService: NotchAuthService, private _usersService: UsersService) { }

  ngOnInit(): void {
    this._usersService.resetUser();
  }

  onRetry(): void {
    this._router.navigate(['/']);
  }


}
