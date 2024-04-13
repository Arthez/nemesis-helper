import { MonsterType } from '@common/enums/monster-types.enum';

export interface MonsterTokenBase {
    id: string;
    type: MonsterType;
}
