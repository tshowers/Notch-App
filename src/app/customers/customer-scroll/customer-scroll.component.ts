import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, CUSTOMERS } from '../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-scroll',
  templateUrl: './customer-scroll.component.html',
  styleUrls: ['./customer-scroll.component.css']
})
export class CustomerScrollComponent implements OnInit, OnDestroy {
  data: any[] = [];
  throttle = 0;
  distance = 2;
  page = 1;
  lastItem: any;
  public filteredData = '';
  private _dataSubscription?: Subscription;
  private _scrollSubscription?: Subscription;

  constructor(public dataService: DataService) {
    this.dataService.getAllByLastUpdated(CUSTOMERS)
  }

  ngOnInit(): void {
    this._dataSubscription = this.dataService.items?.subscribe((data: any[]) => {
      this.data = data;
      this.lastItem = data[data.length - 1]
    })
  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
    if (this._scrollSubscription)
      this._scrollSubscription.unsubscribe();  
  }

  onScroll(): void {
    this.dataService.nextPageByLastUpdated(CUSTOMERS, this.lastItem)
    this._scrollSubscription = this.dataService.items?.subscribe((data: any[]) => {
      this.data.push(...data);
    })
  }

  onView(item: any): void {

  }
}
