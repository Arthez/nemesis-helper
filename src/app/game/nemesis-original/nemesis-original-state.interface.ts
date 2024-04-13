import { NogRoundItem } from '@common/components/nog-specific/nog-round-item/nog-round-item.interface';
import { Autodestruction } from '@common/interfaces/autodestruction.interface';
import { PhaseStage } from '@common/interfaces/phase-stage.interface';
import { MonsterTokenConfig } from '@configs/nog-specific/monster-token.config';
import { Stage } from '@configs/nog-specific/phases.config';

export interface NemesisOriginalState {
    rounds: NogRoundItem[];
    endRoundNum: number;
    activeRoundNum: number;
    activeStage: PhaseStage<Stage>['stageId'];
    activeMonsters: MonsterTokenConfig[];
    availableMonsters: MonsterTokenConfig[];
    bagMonsters: MonsterTokenConfig[];
    autodestruction?: Autodestruction;
    monsterEncounterHappenedRoundNum?: number;
}
