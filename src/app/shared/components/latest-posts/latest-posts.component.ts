import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {

  @Input() headingText = "Lastest Articles";
  @Input() descriptionText = "Check out our latest post from our blog";
  @Input() articles: any[] = [
    {
      "title": "Understanding Your Gut's Microbiome",
      "link": "https://notch.health/blogs/articles/understanding-your-guts-microbiome",
      "description": "From research-based articles to health-related listicles, the term “microbiome” has been making its rounds in the health and wellness industry. . .",
      "author": "Seth Alford",
      "url": "https://notch.health/blogs/articles/understanding-your-guts-microbiome",
      "urlToImage": "https://cdn.shopify.com/s/files/1/0531/6925/8657/articles/ben-white-1MHU3zpTvro-unsplash_1_1600x.jpg?v=1629138694",
    },
    {
      "title": "What Exactly is Candida?",
      "link": "https://notch.health/blogs/articles/what-exactly-is-candida?utm_source=notch-portal&utm_medium=portal-sign-out",
      "description": "From yeast infections to diaper rash, the word \“Candida\” appears in many places...including on our food sensitivity tests. On its own, Candida is simply a type of fungus . . .",
      "author": "Maggy Lehmicke",
      "url": "https://notch.health/blogs/articles/what-exactly-is-candida?utm_source=notch-portal&utm_medium=portal-sign-out",
      "urlToImage": "https://cdn.shopify.com/s/files/1/0531/6925/8657/articles/pars-sahin-pYm05zLQYc0-unsplash_1600x.jpg?v=1628637242",
    },
    {
      "title": "A Guide to 11 Essential Hormones",
      "link": "https://notch.health/blogs/articles/a-guide-to-11-essential-hormones?utm_source=notch-portal&utm_medium=portal-sign-out",
      "description": "Hormones are signaling molecules that are transported throughout different organs in the body to help regulate development, physiology and behavior. . .",
      "author": "Maggy Lehmicke",
      "url": "https://notch.health/blogs/articles/a-guide-to-11-essential-hormones?utm_source=notch-portal&utm_medium=portal-sign-out",
      "urlToImage": "https://cdn.shopify.com/s/files/1/0531/6925/8657/articles/allgo-an-app-for-plus-size-people-0vK5u6_0Z7E-unsplash_1_1400x.jpg?v=1627942806",
    },
  ];

  @Output() pageEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onPageEvent(article: any): void {
    window.location.href = article.link;
  }


}
