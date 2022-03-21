import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'notch-how-to',
  templateUrl: './lick-marketing-how-to1.component.html',
  styles: []
})
export class LickMarketingHowTo1Component implements OnInit {

  @Input() headingText = "How To Use";
  @Input() descriptionText = "Quis nostrum exercitationem ullam corporis suscipit. Unde omnis voluptas sit, aspernatur aut fugit. Omnis voluptas nulla vero eos similique sunt in ea commodi et harum quidem rerum necessitatibus saepe.";
  @Input() header1 = "Download and install";
  @Input() header2 = "Setup the application";
  @Input() header3 = "Keep calm and use";

  @Input() description1 = "Voluptatem, quia dolor repellendus iusto odio dignissimos ducimus, qui. Adipisci velit, sed quia voluptas assumenda est.";
  @Input() description2 = "Rerum hic tenetur a sapiente delectus, ut perspiciatis, unde odio omnis dolor. Sint, obcaecati cupiditate non provident.";
  @Input() description3 = "Quidem rerum unde facilis est eligendi. Numquam eius odiotempora. Ducimus, qui quis nostrum exercitationem ullam.";

  constructor() { }

  ngOnInit() {
  }

}
