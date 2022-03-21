import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService, KIT_REGISTRATIONS } from '../../shared/data.service';
import { environment } from "../../../environments/environment";
import { TestKitRegistration } from '../../models/test-kit-order.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-kit-registration-edit',
  templateUrl: './kit-registration-edit.component.html',
  styleUrls: ['./kit-registration-edit.component.css']
})
export class KitRegistrationEditComponent implements OnInit {

  @Input() data: any;
  @Output() toggle = new EventEmitter();
  public production: boolean;
  public canDeliver: boolean = false;

  constructor(private _dataService: DataService, private _usersService: UsersService) {
    this.production = environment.production;
    this.canDeliver = this._usersService.user.email == environment.superDuper;

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
      this.onUpdate();
  }

  onAdd(): void {
    try {
      this._dataService.onAdd(KIT_REGISTRATIONS, this.data).then((result) => {
        this.data._id = result.id;
        this.onView();
      }).catch((error) => {
        console.error(error);
      });;

    } catch (error) {
      console.error(error);
    }
  }

  onUpdate(): void {
    try {
      const id: any = this.data?._id;
      this.removeFromArray(this.data);

      this._dataService.onUpdate(KIT_REGISTRATIONS, id, this.data);

      this.onView();

    } catch (error) {
      console.error(error);
    }
  }

  onView(): void {
    this.toggle.emit();
  }

  removeFromArray(data: TestKitRegistration): void {
    if (data && data.orders) {
      let o;
      if (Array.isArray(data.orders)) {
        o = data.orders[0];
      } else {
        o = data.orders;
      }
      data.orders = o;
    }
  }


}
