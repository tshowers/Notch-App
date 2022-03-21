import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'notch-faq1',
  templateUrl: './lick-marketing-faq1.component.html',
  styles: []
})
export class LickMarketingFaq1Component implements OnInit {

  @Input() headingText = "FAQ";
  @Input() descriptionText = "Cupiditate non provident, similique nostrum cumque nihil eligendi optio sunt in culpa, qui laudantium, totam rem aperiam. Mollitia animi, id est laborum et expedita. Nihil impedit, quo voluptas assumenda est omnis.";
  @Input() faqHeading1 = "Getting Started";
  @Input() faqDescription1 = "Temporibus autem vel eum fugiat, quo voluptas sit. Cum soluta nobis est eligendi optio, cumque nihil impedit. Officia deserunt mollitia animi, id est eligendi optio cumque. Quibusdam et iusto odio dignissimos ducimus, qui in ea voluptate velit esse. Et expedita distinctio vero. Magnam aliquam quaerat voluptatem sequi nesciunt, neque porro quisquam. Labore et dolorum fuga earum rerum facilis est eligendi optio cumque.";

  @Input() faqHeading2 = "How to setup premium settings?";
  @Input() faqDescription2 = "Modi tempora incidunt, ut aliquid ex ea commodi. Omnis voluptas nulla vero eos et harum quidem rerum. Numquam eius modi tempora incidunt. Assumenda est, omnis voluptas nulla vero eos et dolorum fuga. Praesentium voluptatum deleniti atque corrupti, quos dolores eos. Et aut officiis debitis aut rerum hic tenetur a sapiente delectus. Nesciunt, neque porro quisquam est, qui dolorem ipsum.";

  @Input() faqHeading3 = "How to update free account?";
  @Input() faqDescription3 = "Provident, similique sunt in culpa, qui dolorem. Assumenda est, omnis dolor sit, amet, consectetur, adipisci velit. Veritatis et quasi architecto beatae vitae dicta. Aperiam eaque ipsa, quae ab illo inventore. In culpa, qui eaque ipsa, quae. Quos dolores et iusto odio dignissimos ducimus, qui ratione voluptatem accusantium. Eius modi tempora incidunt, ut enim. Deserunt mollitia animi, id.";

  constructor() { }

  ngOnInit() {
  }

}
