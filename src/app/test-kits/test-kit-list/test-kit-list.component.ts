import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataService, TEST_KIT_ORDERS } from '../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-kit-list',
  templateUrl: './test-kit-list.component.html',
  styleUrls: ['./test-kit-list.component.css']
})
export class TestKitListComponent implements OnInit, OnDestroy {

  @Output() id = new EventEmitter();
  lastKey: any;
  filteredData = '';
  @Output() count1 = new EventEmitter<number>();
  @Output() count2 = new EventEmitter<number>();
  @Output() count3 = new EventEmitter<number>();
  @Output() count4 = new EventEmitter<number>();
  loading: any;
  private _dataSubscription?: Subscription;

  constructor(public dataService: DataService) {
    this.dataService.getAll(TEST_KIT_ORDERS);
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

  onEdit(): void { }

  public onView(value: any): void {
    this.id.emit(value);
  }

  countData(data: any) {
    // Total
    const c1 = (data && data.length) ? data.length : 0;

    const c2 = data.filter((order: any) => {
      return (order && order.title && (order.title.toLowerCase() == 'airborne allergens test'))
    }).length;

    // Paid
    const c3 = data.filter((order: any) => {
      return (order && order.title && (order.title.toLowerCase() == 'essential food sensitivity test'))
    }).length;

    // Cancelled
    const c4 = data.filter((order: any) => {
      return (order && order.title && (order.title.toLowerCase() == 'complete food sensitivity test'))
    }).length;

    this.count1.emit(c1);
    this.count2.emit(c2);
    this.count3.emit(c3);
    this.count4.emit(c4);
  }
}
