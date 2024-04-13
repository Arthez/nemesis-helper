import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { MonsterDevelopmentConfig } from '@common/types/monster-development-config.type';

export interface MonsterTokenConfig extends MonsterTokenBase {
    powerActive: number;
    powerInactive: number;
}

export const monsterDevelopmentConfig: MonsterDevelopmentConfig = Object.freeze({
    Q: Object.freeze({
        labelKey: 'tk.nld.config.label.monster-development.queen',
        successResultKey: 'tk.nld.config.label.monster-development.queen.success',
        failureResultKey: 'tk.nld.config.label.monster-development.queen.failure',
    }),
    B: Object.freeze({
        labelKey: 'tk.nld.config.label.monster-development.breeder',
        successResultKey: 'tk.nld.config.label.monster-development.breeder.success',
        failureResultKey: 'tk.nld.config.label.monster-development.breeder.failure',
    }),
    A: Object.freeze({
        labelKey: 'tk.nld.config.label.monster-development.adult',
        successResultKey: 'tk.nld.config.label.monster-development.adult.success',
        failureResultKey: 'tk.nld.config.label.monster-development.adult.failure',
    }),
    C: Object.freeze({
        labelKey: 'tk.nld.config.label.monster-development.creeper',
        successResultKey: 'tk.nld.config.label.monster-development.creeper.success',
        failureResultKey: 'tk.nld.config.label.monster-development.creeper.failure',
    }),
    L: Object.freeze({
        labelKey: 'tk.nld.config.label.monster-development.larva',
        successResultKey: 'tk.nld.config.label.monster-development.larva.success',
        failureResultKey: 'tk.nld.config.label.monster-development.larva.failure',
    }),
    BLANK: Object.freeze({
        labelKey: 'tk.nld.config.label.monster-development.blank',
        successResultKey: 'tk.nld.config.label.monster-development.blank.success',
        failureResultKey: 'tk.nld.config.label.monster-development.blank.failure',
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
    { id: 'Q1', type: MonsterType.QUEEN, powerActive: 4, powerInactive: 4 },
    { id: 'B1', type: MonsterType.BREEDER, powerActive: 2, powerInactive: 4 },
    { id: 'B2', type: MonsterType.BREEDER, powerActive: 3, powerInactive: 4 },
    { id: 'A1', type: MonsterType.ADULT, powerActive: 3, powerInactive: 4 },
    { id: 'A2', type: MonsterType.ADULT, powerActive: 3, powerInactive: 4 },
    { id: 'A3', type: MonsterType.ADULT, powerActive: 3, powerInactive: 4 },
    { id: 'A4', type: MonsterType.ADULT, powerActive: 2, powerInactive: 4 },
    { id: 'A5', type: MonsterType.ADULT, powerActive: 2, powerInactive: 4 },
    { id: 'A6', type: MonsterType.ADULT, powerActive: 2, powerInactive: 4 },
    { id: 'A7', type: MonsterType.ADULT, powerActive: 2, powerInactive: 3 },
    { id: 'A8', type: MonsterType.ADULT, powerActive: 2, powerInactive: 3 },
    { id: 'A9', type: MonsterType.ADULT, powerActive: 2, powerInactive: 3 },
    { id: 'A10', type: MonsterType.ADULT, powerActive: 1, powerInactive: 3 },
    { id: 'A11', type: MonsterType.ADULT, powerActive: 1, powerInactive: 3 },
    { id: 'A12', type: MonsterType.ADULT, powerActive: 1, powerInactive: 3 },
    { id: 'C1', type: MonsterType.CREEPER, powerActive: 1, powerInactive: 2 },
    { id: 'C2', type: MonsterType.CREEPER, powerActive: 1, powerInactive: 2 },
    { id: 'C3', type: MonsterType.CREEPER, powerActive: 1, powerInactive: 2 },
    { id: 'L1', type: MonsterType.LARVA, powerActive: 1, powerInactive: 2 },
    { id: 'L2', type: MonsterType.LARVA, powerActive: 1, powerInactive: 2 },
    { id: 'L3', type: MonsterType.LARVA, powerActive: 1, powerInactive: 2 },
    { id: 'L4', type: MonsterType.LARVA, powerActive: 1, powerInactive: 2 },
    { id: 'L5', type: MonsterType.LARVA, powerActive: 0, powerInactive: 1 },
    { id: 'L6', type: MonsterType.LARVA, powerActive: 0, powerInactive: 1 },
    { id: 'L7', type: MonsterType.LARVA, powerActive: 0, powerInactive: 1 },
    { id: 'L8', type: MonsterType.LARVA, powerActive: 0, powerInactive: 1 },
    { id: 'BLANK1', type: MonsterType.BLANK, powerActive: 0, powerInactive: 0 },
];

export const getMonsterTokensConfig: () => MonsterTokenConfig[] = () => monsterTokensConfig.map(config => ({ ...config }));
