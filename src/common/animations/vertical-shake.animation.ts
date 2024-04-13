import { animate, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

export const verticalShakeAnimation: (
    triggerName: string,
    timings: number | string,
) => AnimationTriggerMetadata[] = (triggerName, timings) => [
    trigger(triggerName, [
        transition('false <=> true', animate(timings, keyframes([
            style({ transform: 'translate(4px)' }),
            style({ transform: 'translate(-4px)' }),
            style({ transform: 'translate(8px)' }),
            style({ transform: 'translate(-8px)' }),
            style({ transform: 'translate(12px)' }),
            style({ transform: 'translate(-12px)' }),
            style({ transform: 'translate(8px)' }),
            style({ transform: 'translate(-8px)' }),
            style({ transform: 'translate(4px)' }),
            style({ transform: 'translate(-4px)' }),
            style({ transform: 'translate(0px)' }),
        ]))),
    ]),
];
