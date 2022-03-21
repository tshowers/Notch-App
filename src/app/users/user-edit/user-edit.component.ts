import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, USERS } from 'src/app/shared/data.service';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from '../../shared/users.service';
import { environment } from "../../../environments/environment";
import { Note } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() data: any;
  @Output() toggle = new EventEmitter();
  public production: boolean;
  public isSuper: boolean = false;
  public isAdmin: boolean = false;
  public noteText = '';
  private _adminSubscription?: Subscription;

  constructor(public _dataService: DataService, private _authService: NotchAuthService, private _usersService: UsersService) {
    this.production = environment.production;
  }

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

  onSubmit(): void {
    this.updateUser();
  }

  newNote() : void {
    if (!this.data.notes)
      this.data.notes = [];

    this.data.notes.push({text: this.noteText, updated_at: new Date().getTime(), updated_by: this._usersService.user.email});
    this.noteText = '';
  }

  editNote(at: number): void {
    this.noteText = this.data.notes[at].text;
    this.removeNote(at);
  }

  removeNote(at: number): void {
    this.data.notes.splice(at,1);
  }

  private updateUser(): void {
    this._dataService.onUpdate(USERS, this.data.uid, this.data);
    this.onView();
  }

  onAdmin(): void {
    this.data.roles = ["patient", "customer_service", "admin"];
  }

  onCustomer(): void {
    this.data.roles = ["customer"];
  }

  onPatient(): void {
    this.data.roles = ["patient"];
  }

  onCustomerService(): void {
    this.data.roles = ["patient", "customer_service"];
  }

  onView(): void {
    this.toggle.emit();
  }


}
