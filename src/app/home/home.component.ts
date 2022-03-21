import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public settingsServie: SettingsService) { }

  ngOnInit(): void {
  }

  openNav() {
    let d = document.getElementById("notch-app");
    if (d) {
      d.style.width = "100%"
      d.style.opacity = "1";
    }
  }

  closeNav() {
    let d = document.getElementById("notch-app");
    if (d) {
      d.style.width = "0%"
      d.style.opacity = "0";
    }
  }

}
