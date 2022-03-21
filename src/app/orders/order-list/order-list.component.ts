import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataService, ORDERS } from '../../shared/data.service';
import { LabOrdersService } from '../../shared/lab-orders.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  @Output() id = new EventEmitter();
  lastKey: any;
  filteredData = '';
  @Output() count1 = new EventEmitter<number>();
  @Output() count2 = new EventEmitter<number>();
  @Output() count3 = new EventEmitter<number>();
  @Output() count4 = new EventEmitter<number>();
  loading: any;
  private _data1Subscription?: Subscription;
  private _data2Subscription?: Subscription;

  constructor(public dataService: DataService, private _labOrdersService: LabOrdersService) {
    this.dataService.getAllByLastUpdated(ORDERS);
    this._labOrdersService.getAll();
  }

  ngOnInit(): void {
    this._data1Subscription = this.dataService.items?.subscribe((data) => {
      this.countData(data);
      this.loading = 'load complete';
    })

    this._data2Subscription = this._labOrdersService.items?.subscribe(data => {
      this.countLabOrders(data);
    })
  }

  ngOnDestroy(): void {
    if (this._data1Subscription)
      this._data1Subscription?.unsubscribe();
    if (this._data2Subscription)
      this._data2Subscription?.unsubscribe();
  }

  onEdit(): void { }

  public onView(value: any): void {
    this.id.emit(value);
  }

  countLabOrders(data: any): void {
    const c2 = (data && data.length) ? data.length : 0;
    this.count2.emit(c2);
  }

  countData(data: any) {
    // Total
    const c1 = (data && data.length) ? data.length : 0;

    // Paid
    const c3 = data.filter((order: any) => {
      return (order && order.financial_status && (order.financial_status.toLowerCase() == 'paid') && (order.current_total_price > 0.00))
    }).length;

    // Cancelled
    const c4 = data.filter((order: any) => {
      return (order && order.cancelled_at)
    }).length;

    this.count1.emit(c1);
    this.count3.emit(c3);
    this.count4.emit(c4);
  }
}
