import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';


export const backgroundColorAnimation: (
    triggerName: string,
    timings: number | string,
    colorFalse: string,
    colorTrue: string,
) => AnimationTriggerMetadata[] = (triggerName, timings, colorFalse, colorTrue) => [
    trigger(triggerName, [
        state('true', style({ 'background-color': colorTrue })),
        state('false', style({ 'background-color': colorFalse })),
        transition('false <=> true', animate(timings)),
        transition('true <=> false', animate(timings)),
    ]),
];
