import { trigger, transition, style, query, animateChild, group, animate, state } from '@angular/animations';
import { scaleService } from 'chart.js';

export const routeTransitionAnimations = trigger('triggerName', [
    transition('LoginComponent <=> KitRegistrationComponent, RegistrationSummaryComponent => TestKitDataCorrectionComponent, ProfileDisplayComponent => KitRegistrationComponent',  [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%'
            })
        ]),
        query(':enter', [style({ right: '-100%', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
            query(':leave', [animate('1s ease-out', style({ right: '100%', opacity: 0 }))]),
            query(':enter', [animate('1s ease-out', style({ right: '0%', opacity: 1 }))])
        ]),
        query(':enter', animateChild())
    ]),

]);
