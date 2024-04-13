import { TranslationKey } from '@common/types/translation-key.type';

export interface PhaseStage<T extends string> {
    stageId: T;
    labelKey: TranslationKey;
}
