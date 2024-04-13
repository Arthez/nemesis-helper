import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { MonsterTokenConfig } from '@configs/nld-specific/monster-token.config';
import { MonsterCountPipe } from './monster-count.pipe';

describe('MonsterCountPipe', () => {

    let pipe: MonsterCountPipe;

    beforeEach(() => {
        pipe = new MonsterCountPipe();
    });

    describe('transform', () => {
        it('should return 0 for an empty array', () => {
            const monstersMock: MonsterTokenConfig[] = [];

            expect(pipe.transform(monstersMock, MonsterType.ADULT)).toEqual(0);
        });

        it('should return 0 for 0 monsters of given type', () => {
            const monstersMock: MonsterTokenBase[] = [
                { id: 'A1', type: MonsterType.ADULT },
                { id: 'Q1', type: MonsterType.QUEEN },
                { id: 'C1', type: MonsterType.CREEPER },
                { id: 'C2', type: MonsterType.CREEPER },
                { id: 'C3', type: MonsterType.CREEPER },
            ];

            expect(pipe.transform(monstersMock, MonsterType.BREEDER)).toEqual(0);
        });

        it('should return 1 for 1 monsters of given type', () => {
            const monstersMock: MonsterTokenBase[] = [
                { id: 'A1', type: MonsterType.ADULT },
                { id: 'Q1', type: MonsterType.QUEEN },
                { id: 'C1', type: MonsterType.CREEPER },
                { id: 'C2', type: MonsterType.CREEPER },
                { id: 'C3', type: MonsterType.CREEPER },
            ];

            expect(pipe.transform(monstersMock, MonsterType.ADULT)).toEqual(1);
        });

        it('should return 3 for 3 monsters of given type', () => {
            const monstersMock: MonsterTokenBase[] = [
                { id: 'A1', type: MonsterType.ADULT },
                { id: 'Q1', type: MonsterType.QUEEN },
                { id: 'C1', type: MonsterType.CREEPER },
                { id: 'C2', type: MonsterType.CREEPER },
                { id: 'C3', type: MonsterType.CREEPER },
            ];

            expect(pipe.transform(monstersMock, MonsterType.CREEPER)).toEqual(3);
        });
    });
});
