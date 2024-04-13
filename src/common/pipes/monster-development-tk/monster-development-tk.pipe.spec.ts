import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterDevelopmentConfig } from '@common/types/monster-development-config.type';
import { MonsterDevelopmentTkPipe } from './monster-development-tk.pipe';

describe('MonsterDevelopmentTkPipe', () => {

    let pipe: MonsterDevelopmentTkPipe;
    const monsterDevelopmentConfigMock: MonsterDevelopmentConfig = Object.freeze({
        Q: Object.freeze({
            labelKey: 'tk.queen',
            successResultKey: 'tk.queen.success',
            failureResultKey: 'tk.queen.failure',
        }),
        B: Object.freeze({
            labelKey: 'tk.breeder',
            successResultKey: 'tk.breeder.success',
            failureResultKey: 'tk.breeder.failure',
        }),
        A: Object.freeze({
            labelKey: 'tk.adult',
            successResultKey: 'tk.adult.success',
            failureResultKey: 'tk.adult.failure',
        }),
        C: Object.freeze({
            labelKey: 'tk.creeper',
            successResultKey: 'tk.creeper.success',
            failureResultKey: 'tk.creeper.failure',
        }),
        L: Object.freeze({
            labelKey: 'tk.larva',
            successResultKey: 'tk.larva.success',
            failureResultKey: 'tk.larva.failure',
        }),
        BLANK: Object.freeze({
            labelKey: 'tk.blank',
            successResultKey: 'tk.blank.success',
            failureResultKey: 'tk.blank.failure',
        }),
    });

    beforeEach(() => {
        pipe = new MonsterDevelopmentTkPipe();
    });

    describe('transform', () => {
        it('should return translation key which ends properly for queen type', () => {
            const monsterTypeMock: MonsterType = MonsterType.QUEEN;

            const result: boolean = pipe.transform(monsterTypeMock, monsterDevelopmentConfigMock).endsWith('queen');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for breeder type', () => {
            const monsterTypeMock: MonsterType = MonsterType.BREEDER;

            const result: boolean = pipe.transform(monsterTypeMock, monsterDevelopmentConfigMock).endsWith('breeder');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for adult type', () => {
            const monsterTypeMock: MonsterType = MonsterType.ADULT;

            const result: boolean = pipe.transform(monsterTypeMock, monsterDevelopmentConfigMock).endsWith('adult');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for creeper type', () => {
            const monsterTypeMock: MonsterType = MonsterType.CREEPER;

            const result: boolean = pipe.transform(monsterTypeMock, monsterDevelopmentConfigMock).endsWith('creeper');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for larva type', () => {
            const monsterTypeMock: MonsterType = MonsterType.LARVA;

            const result: boolean = pipe.transform(monsterTypeMock, monsterDevelopmentConfigMock).endsWith('larva');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly for blank type', () => {
            const monsterTypeMock: MonsterType = MonsterType.BLANK;

            const result: boolean = pipe.transform(monsterTypeMock, monsterDevelopmentConfigMock).endsWith('blank');

            expect(result).toEqual(true);
        });
    });

});
