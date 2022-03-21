import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { LabOrdersService } from 'src/app/shared/lab-orders.service';
import { environment } from "../../../../environments/environment";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {

  @Input() data?: Observable<any | null>;
  private _data: any;
  public production: boolean;
  public timeLineData: any;
  private _statusUpdateSubscription?: Subscription;
  private _dataSubscription?: Subscription;

  private _timelineDone: boolean = false;

  constructor(private _labOrdersService: LabOrdersService) {
    this.production = environment.production;
  }

  ngOnInit(): void {
    this._dataSubscription = this.data?.subscribe((item) => {
      if (!this.production)
        console.log("Subscribed to data", item._id);
      this._data = item;
      this._timelineDone = false;
      this.timeLineData = [];
      this.setTimelineData();
    })
  }

  ngOnDestroy(): void {
    if (this._statusUpdateSubscription)
      this._statusUpdateSubscription.unsubscribe();
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();  
  }

  public async setTimelineData() {
    try {
      this._labOrdersService.getStatusUpdates(this._data._id);
      await this.addStatusUpdates();
      if (this.timeLineData.length == 0)
        this.firstLine(0, null, null);
    } catch (error) {
      console.error(error);
    }
  }

  private addStatusUpdates() {
    return new Promise((resolve, reject) => {
      this._statusUpdateSubscription = this._labOrdersService.statusChange?.pipe(take(1)).subscribe((statusUpdates: any) => {
        this._labOrdersService.sortByDate(statusUpdates);
        if (!this._timelineDone)
          this.populateTimeline(statusUpdates);
        if (!this.production)
          console.log(this._data._id, JSON.stringify(this.timeLineData, null, 3));
        resolve(null);
      });
    })
  }

  private populateTimeline(statusUpdates: any): void {
    let x = 0;
    statusUpdates.forEach((statusUpdate: any) => {
      this.firstLine(x, statusUpdates, statusUpdate);
      if (this.timeLineData.some((item: any) => item.id === statusUpdate.id))
        this.timeLineData.push(statusUpdate);
      x++;
    });
    this._timelineDone = true;
    console.log(this._timelineDone);
  }

  private firstLine(x: number, statusUpdates: any, statusUpdate: any): void {
    if (x == 0) {
      if (!this.production)
        console.log("First Line Check", x, statusUpdates, statusUpdate)
      // Do we have status updates
      if (statusUpdates && (statusUpdates.length > 1) && statusUpdate.previous_status) {
        this.timeLineData.push({ id: statusUpdate.id, status: statusUpdate.previous_status, updated_at: statusUpdate.previous_updated_at })
        // Is there a status updates but no previous status make 1st status pending
      } else if (statusUpdates && (statusUpdates.length > 1) && !this._data.status) {
        this.timeLineData.push({ id: null, status: 0, updated_at: this._data.updated_at });
        // No status updates but there is a status  
      } else if (this._data.status) {
        this.timeLineData.push({ id: null, status: this._data.status, updated_at: this._data.updated_at });
        // No status at all      
      } else {
        this.timeLineData.push({ id: null, status: 0, updated_at: this._data.updated_at })
      }
    }
  }
}
