import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataService, LAB_ORDERS } from '../../shared/data.service';
import { ReportsService } from 'src/app/shared/reports.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lab-order-list',
  templateUrl: './lab-order-list.component.html',
  styleUrls: ['./lab-order-list.component.css']
})
export class LabOrderListComponent implements OnInit, OnDestroy {

  @Output() id = new EventEmitter();
  lastKey: any;
  filteredData = '';
  public status = "ALL-NON-DELIVERED";
  public deliveredOnly: boolean = false;
  public reportVisible = true;
  @Output() count1 = new EventEmitter<number>();
  @Output() count2 = new EventEmitter<number>();
  @Output() count3 = new EventEmitter<number>();
  @Output() count4 = new EventEmitter<number>();
  loading: any;
  private _dataSubscription?: Subscription;
  private _reportsSubscription?: Subscription;


  constructor(public dataService: DataService, public reportsService: ReportsService,) {
    this.dataService.getAllByNotThis(LAB_ORDERS, "status", "999");
    this.deliveredOnly = true;
    this.reportsService.getAll();
  }

  ngOnInit(): void {
    this._dataSubscription = this.dataService.items?.subscribe((data) => {
      this.countData(data);
      this.loading = 'load complete';
    });

    this._reportsSubscription = this.reportsService.items?.subscribe((data) => {

    })
  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
    if (this._reportsSubscription)
      this._reportsSubscription.unsubscribe();
  }

  requestReport() {
    const data = {
      status: "processing",
      updated_at: new Date().getTime()
    };

    this.reportsService.onAdd(data);
  }


  toggleReport(): void {
    this.reportVisible = (this.reportVisible) ? false : true;
  }

  onEdit(): void { }

  public onView(value: any): void {
    try {
      if (this.id)
        this.id.emit(value);
      else {
        this.id = new EventEmitter();
        this.id.emit(value);
      }

    } catch (error) {
      console.error("onView", error, this.id, value);
    }
  }

  public filterByStatus(): void {
    if (this.status == '') {
      this.deliveredOnly = false;
      this.dataService.getAll(LAB_ORDERS);
    }
    else if (this.status == 'ALL-NON-DELIVERED') {
      this.deliveredOnly = true;
      this.dataService.getAllByNotThis(LAB_ORDERS, "status", "999");
    }
    else {
      this.deliveredOnly = false;
      this.dataService.searchByStatus(LAB_ORDERS, this.status);
    }
  }

  countData(data: any) {
    // Total
    const c1 = data.filter((labOrder: any) => {
      return (labOrder['patient-gender']) ?
        (labOrder['patient-gender'].charAt(0) == 'F') : false
    }).length;

    // Confirmed
    const c2 = data.filter((labOrder: any) => {
      return (labOrder['patient-gender'])
        ? (labOrder['patient-gender'].charAt(0) == 'M') : false
    }).length;

    // Paid
    const c3 = data.filter((labOrder: any) => {
      return (labOrder['patient-dob'] <= '1975-12-31')
    }).length;

    // Cancelled
    const c4 = data.filter((labOrder: any) => {
      return (labOrder['patient-dob'] >= '1976-01-01')
    }).length;

    this.count1.emit(c1);
    this.count2.emit(c2);
    this.count3.emit(c3);
    this.count4.emit(c4);
  }
}
