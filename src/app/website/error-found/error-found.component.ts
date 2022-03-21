import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-found',
  templateUrl: './error-found.component.html',
  styleUrls: ['./error-found.component.css']
})
export class ErrorFoundComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  back(): void {
    this._location.back()
  }


}
