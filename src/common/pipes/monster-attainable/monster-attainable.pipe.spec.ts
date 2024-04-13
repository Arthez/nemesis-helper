import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { MonsterAttainablePipe } from './monster-attainable.pipe';

describe('MonsterAttainablePipe', () => {

    let pipe: MonsterAttainablePipe;

    beforeEach(() => {
        pipe = new MonsterAttainablePipe();
    });

    describe('transform', () => {
        it('should return true when given monster type exist', () => {
            const monstersMock: MonsterTokenBase[] = [
                { id: 'A1', type: MonsterType.ADULT },
                { id: 'Q1', type: MonsterType.QUEEN },
                { id: 'C1', type: MonsterType.CREEPER },
                { id: 'C2', type: MonsterType.CREEPER },
            ];

            expect(pipe.transform(monstersMock, MonsterType.CREEPER)).toEqual(true);
        });

        it('should return false when given monster type do NOT exist', () => {
            const monstersMock: MonsterTokenBase[] = [
                { id: 'A1', type: MonsterType.ADULT },
                { id: 'Q1', type: MonsterType.QUEEN },
                { id: 'C1', type: MonsterType.ADULT },
                { id: 'C2', type: MonsterType.ADULT },
            ];

            expect(pipe.transform(monstersMock, MonsterType.BREEDER)).toEqual(false);
        });

        it('should return false when monsters array is empty', () => {
            const monstersMock: MonsterTokenBase[] = [];

            expect(pipe.transform(monstersMock, MonsterType.ADULT)).toEqual(false);
        });
    });
});
