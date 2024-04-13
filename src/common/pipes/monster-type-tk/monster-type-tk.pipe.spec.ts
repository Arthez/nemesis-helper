import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTypeTkPipe } from './monster-type-tk.pipe';

describe('MonsterTypeTkPipe', () => {

    let pipe: MonsterTypeTkPipe;

    beforeEach(() => {
        pipe = new MonsterTypeTkPipe();
    });

    describe('transform', () => {
        it('should return translation key which ends properly for queen type', () => {
            const monsterTypeMock: MonsterType = MonsterType.QUEEN;

            const result: boolean = pipe.transform(monsterTypeMock).endsWith('queen');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for breeder type', () => {
            const monsterTypeMock: MonsterType = MonsterType.BREEDER;

            const result: boolean = pipe.transform(monsterTypeMock).endsWith('breeder');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for adult type', () => {
            const monsterTypeMock: MonsterType = MonsterType.ADULT;

            const result: boolean = pipe.transform(monsterTypeMock).endsWith('adult');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for creeper type', () => {
            const monsterTypeMock: MonsterType = MonsterType.CREEPER;

            const result: boolean = pipe.transform(monsterTypeMock).endsWith('creeper');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for larva type', () => {
            const monsterTypeMock: MonsterType = MonsterType.LARVA;

            const result: boolean = pipe.transform(monsterTypeMock).endsWith('larva');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for blank type', () => {
            const monsterTypeMock: MonsterType = MonsterType.BLANK;

            const result: boolean = pipe.transform(monsterTypeMock).endsWith('blank');

            expect(result).toEqual(true);
        });
    });
});
