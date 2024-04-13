import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterDevelopmentResult } from '@common/interfaces/monster-development-result.interface';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { MonsterDevelopmentConfig } from '@common/types/monster-development-config.type';
import { MonsterDevelopmentResultTkPipe } from './monster-development-result-tk.pipe';

describe('MonsterDevelopmentResultTkPipe', () => {

    let pipe: MonsterDevelopmentResultTkPipe;
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
        pipe = new MonsterDevelopmentResultTkPipe();
    });

    describe('transform', () => {
        it('should return translation key which ends properly when development result is NOT success with queen type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.QUEEN,
                },
                success: false,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('queen.failure');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is success with queen type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.QUEEN,
                },
                success: true,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('queen.success');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is NOT success with breeder type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.BREEDER,
                },
                success: false,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('breeder.failure');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is success with breeder type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.BREEDER,
                },
                success: true,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('breeder.success');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is NOT success with adult type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.ADULT,
                },
                success: false,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('adult.failure');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is success with adult type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.ADULT,
                },
                success: true,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('adult.success');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is NOT success with creeper type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.CREEPER,
                },
                success: false,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('creeper.failure');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is success with creeper type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.CREEPER,
                },
                success: true,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('creeper.success');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is NOT success with larva type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.LARVA,
                },
                success: false,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('larva.failure');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is success with larva type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.LARVA,
                },
                success: true,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('larva.success');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is NOT success with blank type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.BLANK,
                },
                success: false,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('blank.failure');

            expect(result).toEqual(true);
        });

        it('should return translation key which ends properly when development result is success with blank type', () => {
            const developmentResultDataMock: MonsterDevelopmentResult<MonsterTokenBase> = {
                token: {
                    id: 'A1',
                    type: MonsterType.BLANK,
                },
                success: true,
            };

            const result: boolean = pipe.transform(developmentResultDataMock, monsterDevelopmentConfigMock).endsWith('blank.success');

            expect(result).toEqual(true);
        });
    });

});
