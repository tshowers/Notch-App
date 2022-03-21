import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.css']
})
export class ConstructionComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  
  back(): void {
    this._location.back()
  }

}
