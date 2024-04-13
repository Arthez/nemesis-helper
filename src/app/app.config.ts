import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NoPreloading, provideRouter, withPreloading } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { AppMissingTranslationHandler } from '@common/classes/app-missing-translation-handler.class';
import { MissingTranslationHandler, TranslateModule } from '@ngx-translate/core';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withPreloading(NoPreloading)),
        provideAnimations(),
        importProvidersFrom(TranslateModule.forRoot({
            missingTranslationHandler: { provide: MissingTranslationHandler, useClass: AppMissingTranslationHandler },
            defaultLanguage: 'en',
        })),
        importProvidersFrom(HttpClientModule),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerImmediately',
        }),
    ],
};
