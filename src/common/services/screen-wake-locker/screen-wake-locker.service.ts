import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScreenWakeLockerService {

    private readonly visibilityChange$: Observable<unknown> = fromEvent(document, 'visibilitychange');
    private screenLockSentinel: WakeLockSentinel | undefined;

    public init(): void {
        if ('wakeLock' in navigator) {
            this.requestLock();
            this.visibilityChange$.subscribe(() => {
                if (document.visibilityState === 'visible') {
                    this.requestLock();
                }
            });
        }
    }

    private requestLock(): void {
        if (document.visibilityState !== 'visible') {
            return;
        }
        navigator.wakeLock.request('screen')
            .then(screenLockSentinel => {
                this.screenLockSentinel = screenLockSentinel;
            });
    }

    private releaseLock(): void {
        this.screenLockSentinel?.release().then(() => {
            this.screenLockSentinel = undefined;
        });
    }

}
