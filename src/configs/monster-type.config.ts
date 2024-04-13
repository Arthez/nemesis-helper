import { MonsterType } from '@common/enums/monster-types.enum';

export const getMonstersTypes: () => MonsterType[] = () => Object.values(MonsterType).map(type => type as MonsterType);
