import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { DataService, KIT_REGISTRATIONS } from '../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kit-registration-view',
  templateUrl: './kit-registration-view.component.html',
  styleUrls: ['./kit-registration-view.component.css']
})
export class KitRegistrationViewComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Output() toggle = new EventEmitter();
  public jsonView = 'none';
  public isAdmin: boolean = false;
  public isSuper: boolean = false;

  private _adminSubscription?: Subscription;

  constructor(private _dataService: DataService, private _authService: NotchAuthService, private _usersService: UsersService) { }

  ngOnInit(): void {
    this.isAdmin = this._usersService.admin;
    this.isSuper = this._usersService.super;
    this._adminSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isAdmin = admin;
      this.isSuper = this._usersService.super;
    })
  }

  ngOnDestroy(): void {
    if (this._adminSubscription)
      this._adminSubscription.unsubscribe();
  }
  

  onDelete(): void {
    this._dataService.onDelete(KIT_REGISTRATIONS, this.data._id);
    this.data = null;
  }

  onEdit(): void {
    this.toggle.emit();
  }

  onJSON(): void {
    this.jsonView = (this.jsonView == "none") ? "" : "none";
  }

}
