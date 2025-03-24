import { NldRoundItem } from '@common/components/nld-specific/nld-round-item/nld-round-item.interface';
import { Autodestruction } from '@common/interfaces/autodestruction.interface';
import { PhaseStage } from '@common/interfaces/phase-stage.interface';
import { MonsterTokenConfig } from '@configs/nld-specific/monster-token.config';
import { Stage } from '@configs/nld-specific/phases.config';
import { PowerSupplyState } from '@configs/nld-specific/power-supply.config';

export interface NemesisLockdownState {
    dateIso: string;
    rounds: NldRoundItem[];
    endRoundNum: number;
    activeRoundNum: number;
    activeStage: PhaseStage<Stage>['stageId'];
    activeMonsters: MonsterTokenConfig[];
    availableMonsters: MonsterTokenConfig[];
    bagMonsters: MonsterTokenConfig[];
    powerState: PowerSupplyState;
    autodestruction?: Autodestruction;
    alertProcedureActivatedRoundNum?: number;
    monsterEncounterHappenedRoundNum?: number;
}
