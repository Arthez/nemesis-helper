import { PhaseStage } from '@common/interfaces/phase-stage.interface';
import { TranslationKey } from '@common/types/translation-key.type';

export interface PhaseConfig<StageType extends string> {
    id: string;
    labelKey: TranslationKey;
    stages: PhaseStage<StageType>[];
}
