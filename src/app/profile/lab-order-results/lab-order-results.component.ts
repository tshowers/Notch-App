import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/shared/users.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lab-order-results',
  templateUrl: './lab-order-results.component.html',
  styleUrls: ['./lab-order-results.component.css']
})
export class LabOrderResultsComponent implements OnInit {

  message: any;
  user: any;
  production: boolean = false;

  public fst: boolean = false;
  public vitd: boolean = false;

  constructor(private _userService: UsersService, private _router: Router, private _location: Location) {
    this.message = null;
    this.user = this._userService.user;
    this.production = environment.production;
  }

  ngOnInit(): void {
    if (this._userService.user.file)
      this.generateReport();
    else
      this.message = "No File to process";
  }


  onReturn(): void {
    this._router.navigate(['profiles', this._userService.user.uid]);
  }

  back(): void {
    this._location.back()
  }

  generateReport(): void {
    this.message = "Results show in seperate window.";
    window.open(this._userService.user.file, "_blank");

  }





}
