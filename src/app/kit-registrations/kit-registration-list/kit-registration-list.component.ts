import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataService, KIT_REGISTRATIONS } from '../../shared/data.service';
import {  Subscription } from 'rxjs';
import { TestKitRegistration } from '../../models/test-kit-order.model';
import { KitRegistrationsService } from 'src/app/shared/kit-registrations.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-kit-registration-list',
  templateUrl: './kit-registration-list.component.html',
  styleUrls: ['./kit-registration-list.component.css']
})
export class KitRegistrationListComponent implements OnInit, OnDestroy {

  @Output() id = new EventEmitter();

  @Output() count1 = new EventEmitter<number>();
  @Output() count2 = new EventEmitter<number>();
  @Output() count3 = new EventEmitter<number>();
  @Output() count4 = new EventEmitter<number>();
  filteredData = '';
  lastKey: any;
  loading: any;
  private _dataSubscription?: Subscription;
  public production: boolean = false;

  constructor(public dataService: KitRegistrationsService) {
    this.dataService.getAllByLastName();
    this.production = environment.production;
  }

  ngOnInit(): void {
    this._dataSubscription = this.dataService.items?.subscribe((data) => {
      this.countData(data);
      this.loading = 'load complete';
    })
  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
  }

  public onView(value: any): void {
    this.id.emit(value);
  }

  countData(data: any) {
    // Fully Rejected
    const c1 = data.filter((kitRegistration: TestKitRegistration) => {
      return (kitRegistration.gender == "Male")
    }).length; 

    // Testing in Progress
    const c2 = data.filter((kitRegistration: TestKitRegistration) => {
      return (kitRegistration.gender == "Female")
    }).length;

    // Activated
    const c3 = data.filter((kitRegistration: TestKitRegistration) => {
      return (kitRegistration.status == '998')
    }).length;

    // Results Delivered
    const c4 = data.filter((kitRegistration: TestKitRegistration) => {
      return (kitRegistration.textNotification)
    }).length;

    this.count1.emit(c1);
    this.count2.emit(c2);
    this.count3.emit(c3);
    this.count4.emit(c4);
  }
}
