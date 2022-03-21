import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataService, INVALID_ORDERS } from '../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invalid-order-list',
  templateUrl: './invalid-order-list.component.html',
  styleUrls: ['./invalid-order-list.component.css']
})
export class InvalidOrderListComponent implements OnInit, OnDestroy {

  @Output() id = new EventEmitter();
  lastKey: any;
  loading: any;
  private _dataSubscription?: Subscription;

  constructor(public dataService: DataService) {
    this.dataService.getAll(INVALID_ORDERS);
  }

  ngOnInit(): void {
    this._dataSubscription = this.dataService.items?.subscribe(() => {
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
}
