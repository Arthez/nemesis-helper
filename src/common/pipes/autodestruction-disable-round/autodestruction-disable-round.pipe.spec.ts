import { Autodestruction } from '@common/interfaces/autodestruction.interface';
import { AutodestructionDisableRoundPipe } from './autodestruction-disable-round.pipe';

describe('AutodestructionDisableRoundPipe', () => {
    let pipe: AutodestructionDisableRoundPipe;

    beforeEach(() => {
        pipe = new AutodestructionDisableRoundPipe();
    });

    describe('transform', () => {
        it('should return false when autodestruction is undefined', () => {
            const autodestructionMock: Autodestruction | undefined = undefined;
            const roundNumMock: number = 15;

            expect(pipe.transform(autodestructionMock, roundNumMock)).toEqual(false);
        });

        it('should return false when autodestruction is yellow at round 10 and roundNum is 15', () => {
            const autodestructionMock: Autodestruction | undefined = { state: 'yellow', roundNum: 10 };
            const roundNumMock: number = 15;

            expect(pipe.transform(autodestructionMock, roundNumMock)).toEqual(false);
        });

        it('should return false when autodestruction is yellow at round 10 and roundNum is 10', () => {
            const autodestructionMock: Autodestruction | undefined = { state: 'yellow', roundNum: 10 };
            const roundNumMock: number = 10;

            expect(pipe.transform(autodestructionMock, roundNumMock)).toEqual(false);
        });

        it('should return false when autodestruction is yellow at round 10 and roundNum is 5', () => {
            const autodestructionMock: Autodestruction | undefined = { state: 'yellow', roundNum: 10 };
            const roundNumMock: number = 5;

            expect(pipe.transform(autodestructionMock, roundNumMock)).toEqual(false);
        });

        it('should return false when autodestruction is red at round 10 and roundNum is 15', () => {
            const autodestructionMock: Autodestruction | undefined = { state: 'red', roundNum: 10 };
            const roundNumMock: number = 15;

            expect(pipe.transform(autodestructionMock, roundNumMock)).toEqual(false);
        });

        it('should return false when autodestruction is red at round 10 and roundNum is 10', () => {
            const autodestructionMock: Autodestruction | undefined = { state: 'red', roundNum: 10 };
            const roundNumMock: number = 10;

            expect(pipe.transform(autodestructionMock, roundNumMock)).toEqual(false);
        });

        it('should return true when autodestruction is red at round 10 and roundNum is 5', () => {
            const autodestructionMock: Autodestruction | undefined = { state: 'red', roundNum: 10 };
            const roundNumMock: number = 5;

            expect(pipe.transform(autodestructionMock, roundNumMock)).toEqual(true);
        });
    });
});
