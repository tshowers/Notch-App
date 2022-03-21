import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { routeTransitionAnimations } from './route-transition-animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeTransitionAnimations]
})
export class AppComponent implements OnInit, OnDestroy {

  private _routeSubscription?: Subscription


  public constructor(private _activatedRoute: ActivatedRoute, public router: Router, private _titleService: Title) { }

  ngOnInit() {
    this._routeSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this._activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data))
      .subscribe((event) => {
        this._titleService.setTitle(event['title']);
      });
  }

  ngOnDestroy() {
    if (this._routeSubscription)
      this._routeSubscription.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }
}
