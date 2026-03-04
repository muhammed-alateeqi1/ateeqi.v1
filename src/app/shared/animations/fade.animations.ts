import {
    trigger,
    transition,
    style,
    animate,
    query,
    animateChild,
    group,
} from '@angular/animations';

/**
 * Fade + slight upward translate for route transitions.
 * Apply to the host element of page-level components.
 */
export const fadeSlideIn = trigger('fadeSlideIn', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate('420ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
]);

/**
 * Crossfade animation for image slider transitions.
 * Use with *ngIf and trackBy.
 */
export const crossfade = trigger('crossfade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease', style({ opacity: 1 })),
    ]),
    transition(':leave', [
        animate('600ms ease', style({ opacity: 0 })),
    ]),
]);

/**
 * Float-in animation for the floating preview panel.
 * Appears from the right with a subtle slide.
 */
export const floatIn = trigger('floatIn', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(12px)' }),
        animate('280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
        animate('200ms ease', style({ opacity: 0, transform: 'translateX(8px)' })),
    ]),
]);

/**
 * Route-level page transition used in app-root.
 * Wraps child animations so they play on each navigation.
 */
export const routeTransition = trigger('routeTransition', [
    transition('* <=> *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(12px)' }),
        ], { optional: true }),
        group([
            query(':leave', [
                animate('200ms ease', style({ opacity: 0 })),
            ], { optional: true }),
            query(':enter', [
                animate('350ms 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    style({ opacity: 1, transform: 'translateY(0)' })),
            ], { optional: true }),
        ]),
    ]),
]);
