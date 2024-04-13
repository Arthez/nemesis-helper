import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { LanguageService } from '@common/services/language/language.service';
import { catchError, throwError } from 'rxjs';

type AppInitState = 'init' | 'loading' | 'finished' | 'error';

@Injectable({
    providedIn: 'root',
})
export class AppInitializerService {

    public readonly initFinished: Signal<boolean> = computed(() => this.initState() === 'finished');
    public readonly initFailure: Signal<boolean> = computed(() => this.initState() === 'error');
    private readonly initState: WritableSignal<AppInitState> = signal('init');
    private readonly languageService: LanguageService = inject(LanguageService);

    public init(): void {
        this.languageService.initTranslations().pipe(
            catchError(() => {
                this.initState.set('error');
                return throwError(() => 'Application initialization failed');
            }),
        ).subscribe(() => {
            this.initState.set('finished');
        });
    }

}
