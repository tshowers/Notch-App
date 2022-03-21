import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'notch-faq3',
  templateUrl: './lick-marketing-faq3.component.html',
  styles: []
})
export class LickMarketingFaq3Component implements OnInit {

  @Input() headingText = "FAQ";
  @Input() descriptionText = "Cupiditate non provident, similique nostrum cumque nihil eligendi optio sunt in culpa, qui laudantium, totam rem aperiam. Mollitia animi, id est laborum et expedita. Nihil impedit, quo voluptas assumenda est omnis.";
  @Input() imageURL = "http://via.placeholder.com/1440x1075";

  @Input() faqHeading1 = "Getting Started";
  @Input() faqDescription1 = "Quasi architecto beatae vitae dicta sunt explicabo. Iusto odio ducimus, qui neque porro est. Eligendi optio, cumque nihil molestiae non numquam eius modi tempora. Vitae dicta sunt, explicabo voluptatem accusantium doloremque laudantium, totam rem aperiam eaque.";

  @Input() faqHeading2 = "How To Use?";
  @Input() faqDescription2 = "Dicta sunt, explicabo commodi autem nostrum cumque nihil vel illum, qui esse, quam nihil. Vitae dicta sunt, explicabo rem aperiam eaque. Blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores. Aperiam eaque ipsa, quae ab illo inventore veritatis et aut fugit.";

  @Input() faqHeading3 = "How To Setup?";
  @Input() faqDescription3 = "Ipsa, quae ab illo inventore veritatis et voluptates repudiandae sint. Maiores alias consequatur aut odit. Perferendis doloribus asperiores repellat. accusantium doloremque. Ut aliquid ex ea voluptate velit esse, quam nihil molestiae. Saepe eveniet, ut aliquid ex.";

  constructor() { }

  ngOnInit() {
  }

}
