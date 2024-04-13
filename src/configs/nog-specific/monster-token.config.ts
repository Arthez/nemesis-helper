import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { MonsterDevelopmentConfig } from '@common/types/monster-development-config.type';

export interface MonsterTokenConfig extends MonsterTokenBase {
    surprise: number;
}

export const monsterDevelopmentConfig: MonsterDevelopmentConfig = Object.freeze({
    Q: Object.freeze({
        labelKey: 'tk.nog.config.label.monster-development.queen',
        successResultKey: 'tk.nog.config.label.monster-development.queen.success',
        failureResultKey: 'tk.nog.config.label.monster-development.queen.failure',
    }),
    B: Object.freeze({
        labelKey: 'tk.nog.config.label.monster-development.breeder',
        successResultKey: 'tk.nog.config.label.monster-development.breeder.success',
        failureResultKey: 'tk.nog.config.label.monster-development.breeder.failure',
    }),
    A: Object.freeze({
        labelKey: 'tk.nog.config.label.monster-development.adult',
        successResultKey: 'tk.nog.config.label.monster-development.adult.success',
        failureResultKey: 'tk.nog.config.label.monster-development.adult.failure',
    }),
    C: Object.freeze({
        labelKey: 'tk.nog.config.label.monster-development.creeper',
        successResultKey: 'tk.nog.config.label.monster-development.creeper.success',
        failureResultKey: 'tk.nog.config.label.monster-development.creeper.failure',
    }),
    L: Object.freeze({
        labelKey: 'tk.nog.config.label.monster-development.larva',
        successResultKey: 'tk.nog.config.label.monster-development.larva.success',
        failureResultKey: 'tk.nog.config.label.monster-development.larva.failure',
    }),
    BLANK: Object.freeze({
        labelKey: 'tk.nog.config.label.monster-development.blank',
        successResultKey: 'tk.nog.config.label.monster-development.blank.success',
        failureResultKey: 'tk.nog.config.label.monster-development.blank.failure',
    }),
});

export const defaultMonsterBagConfig: Record<MonsterType, number> = Object.freeze({
    Q: 1,
    B: 0,
    A: 3,
    C: 1,
    L: 4,
    BLANK: 1,
});

const monsterTokensConfig: MonsterTokenConfig[] = [
    { id: 'Q1', type: MonsterType.QUEEN, surprise: 4 },
    { id: 'B1', type: MonsterType.BREEDER, surprise: 3 },
    { id: 'B2', type: MonsterType.BREEDER, surprise: 4 },
    { id: 'A1', type: MonsterType.ADULT, surprise: 2 },
    { id: 'A2', type: MonsterType.ADULT, surprise: 2 },
    { id: 'A3', type: MonsterType.ADULT, surprise: 2 },
    { id: 'A4', type: MonsterType.ADULT, surprise: 2 },
    { id: 'A5', type: MonsterType.ADULT, surprise: 3 },
    { id: 'A6', type: MonsterType.ADULT, surprise: 3 },
    { id: 'A7', type: MonsterType.ADULT, surprise: 3 },
    { id: 'A8', type: MonsterType.ADULT, surprise: 3 },
    { id: 'A9', type: MonsterType.ADULT, surprise: 3 },
    { id: 'A10', type: MonsterType.ADULT, surprise: 4 },
    { id: 'A11', type: MonsterType.ADULT, surprise: 4 },
    { id: 'A12', type: MonsterType.ADULT, surprise: 4 },
    { id: 'C1', type: MonsterType.CREEPER, surprise: 1 },
    { id: 'C2', type: MonsterType.CREEPER, surprise: 1 },
    { id: 'C3', type: MonsterType.CREEPER, surprise: 1 },
    { id: 'L1', type: MonsterType.LARVA, surprise: 1 },
    { id: 'L2', type: MonsterType.LARVA, surprise: 1 },
    { id: 'L3', type: MonsterType.LARVA, surprise: 1 },
    { id: 'L4', type: MonsterType.LARVA, surprise: 1 },
    { id: 'L5', type: MonsterType.LARVA, surprise: 1 },
    { id: 'L6', type: MonsterType.LARVA, surprise: 1 },
    { id: 'L7', type: MonsterType.LARVA, surprise: 1 },
    { id: 'L8', type: MonsterType.LARVA, surprise: 1 },
    { id: 'BLANK1', type: MonsterType.BLANK, surprise: 0 },
];

export const getMonsterTokensConfig: () => MonsterTokenConfig[] = () => monsterTokensConfig.map(config => ({ ...config }));
