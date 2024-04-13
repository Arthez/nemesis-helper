import { TranslationKey } from '@common/types/translation-key.type';

export interface TranslationGroup {
    name: TranslationKey;
    items: TranslationKey[];
}
