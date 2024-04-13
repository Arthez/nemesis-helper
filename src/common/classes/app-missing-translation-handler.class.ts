import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class AppMissingTranslationHandler implements MissingTranslationHandler {

    public handle(params: MissingTranslationHandlerParams): string {
        console.warn(`Missing translation for: ${ params.key }`);
        return params.translateService.currentLang === 'en' ? '<missing translation>' : '<brakuje translacji>';
    }

}
