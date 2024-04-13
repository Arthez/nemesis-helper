import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appNonFocusable]',
    standalone: true,
})
export class NonFocusableDirective {

    public constructor(
        private readonly elementRef: ElementRef,
    ) {
        this.elementRef.nativeElement.setAttribute('tabindex', '-1');
        this.elementRef.nativeElement.addEventListener('focus', () => {
            (this.elementRef.nativeElement as HTMLElement).blur();
        });
    }

}
