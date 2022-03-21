import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'notch-widget-totals',
  templateUrl: './lick-app-widget-totals.component.html',
  styleUrls: ['./lick-app-widget-totals.component.css']
})
export class LickAppWidgetTotalsComponent implements OnInit {

  @Input() headingText = "licky-lick-app-widget-totals";

  @Input() count1: number = Math.floor(Math.random() * 1000);
  @Input() countText1 = "Downloads";

  @Input() count2: number = Math.floor(Math.random() * 1000);
  @Input() countText2 = "Daily Views";

  @Input() count3: number = Math.floor(Math.random() * 1000);
  @Input() countText3 = "Active Users";

  @Input() count4: number = Math.floor(Math.random() * 1000);
  @Input() countText4 = "plugins";

  constructor() { }

  ngOnInit() {
  }

}
