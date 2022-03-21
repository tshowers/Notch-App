import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  constructor(private _router: Router, public settingsServie: SettingsService) {

  }


  ngOnInit(): void {

  }


  onLogo(): void {
    this.settingsServie.updateSetting();
    this._router.navigate(['settings', 'widget', 'logo']);
  }

  onDisplayName(): void {
    this.settingsServie.updateSetting();
    this._router.navigate(['settings', 'widget', 'display-name']);
  }

  onPaymentGateway(): void {
    this.settingsServie.updateSetting();
    this._router.navigate(['settings', 'widget', 'payment-gateway']);
  }


}
