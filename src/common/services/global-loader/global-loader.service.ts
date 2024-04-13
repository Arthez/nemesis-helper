import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GlobalLoaderService {

    public readonly isLoading: WritableSignal<boolean> = signal(false);

}
