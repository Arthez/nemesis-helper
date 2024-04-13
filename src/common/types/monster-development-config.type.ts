import { MonsterType } from '@common/enums/monster-types.enum';
import { TranslationKey } from '@common/types/translation-key.type';

export type MonsterDevelopmentConfig = Record<MonsterType, {
    labelKey: TranslationKey;
    successResultKey: TranslationKey;
    failureResultKey: TranslationKey;
}>;
