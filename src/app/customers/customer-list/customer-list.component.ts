import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataService, CUSTOMERS } from '../../shared/data.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  @Output() id = new EventEmitter();
  lastKey: any;
  filteredData = '';
  @Output() count1 = new EventEmitter<number>();
  @Output() count2 = new EventEmitter<number>();
  @Output() count3 = new EventEmitter<number>();
  @Output() count4 = new EventEmitter<number>();
  loading: any;
  private _dataSubscription?: Subscription;
  customers: any;

  constructor(public dataService: DataService) {
    this.dataService.getAll(CUSTOMERS);
  }

  ngOnInit(): void {
    this._dataSubscription = this.dataService.items?.pipe(
      map((data: any) => data.filter((data : any) => (data.last_name != null)))
    ).subscribe((data) => {
      this.countData(data);
      this.customers = data;
      this.loading = 'load complete';
    })
  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
  }

  onEdit(): void { }

  public onView(value: any): void {
    this.id.emit(value);
  }

  countData(data: any) {
    // Total
    const c1 = (data && data.length) ? data.length : 0;

    // Confirmed
    const c2 = data.filter((customer: any) => { if (customer && customer.verified_email) return customer.verified_email }).length;

    // Paying
    const c3 = data.filter((customer: any) => {
      return (customer.total_spent > 0)
    }).length;

    // Accepts Marketing
    const c4 = data.filter((customer: any) => {
      return (customer.accepts_marketing)
    }).length;

    this.count1.emit(c1);
    this.count2.emit(c2);
    this.count3.emit(c3);
    this.count4.emit(c4);
  }
}
