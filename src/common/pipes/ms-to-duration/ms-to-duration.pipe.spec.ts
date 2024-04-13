import { MsToDurationPipe } from './ms-to-duration.pipe';

describe('MsToDurationPipe', () => {

    let pipe: MsToDurationPipe;

    beforeEach(() => {
        pipe = new MsToDurationPipe();
    });

    describe('transform', () => {
        it('should return proper string for value 0', () => {
            expect(pipe.transform(0)).toEqual('00:00:00');
        });

        it('should return proper string for value 999', () => {
            expect(pipe.transform(999)).toEqual('00:00:00');
        });

        it('should return proper string for value 1000', () => {
            expect(pipe.transform(1000)).toEqual('00:00:01');
        });

        it('should return proper string for value 58555', () => {
            expect(pipe.transform(58555)).toEqual('00:00:58');
        });

        it('should return proper string for value 59999', () => {
            expect(pipe.transform(59999)).toEqual('00:00:59');
        });

        it('should return proper string for value 60000', () => {
            expect(pipe.transform(60000)).toEqual('00:01:00');
        });

        it('should return proper string for value 600000', () => {
            expect(pipe.transform(600000)).toEqual('00:10:00');
        });

        it('should return proper string for value 2440000', () => {
            expect(pipe.transform(2440000)).toEqual('00:40:40');
        });

        it('should return proper string for value 3599999', () => {
            expect(pipe.transform(3599999)).toEqual('00:59:59');
        });

        it('should return proper string for value 3600000', () => {
            expect(pipe.transform(3600000)).toEqual('01:00:00');
        });

        it('should return proper string for value 36000000', () => {
            expect(pipe.transform(36000000)).toEqual('10:00:00');
        });

        it('should return proper string for value 38440000', () => {
            expect(pipe.transform(38440000)).toEqual('10:40:40');
        });

        it('should return proper string for value 360000000', () => {
            expect(pipe.transform(360000000)).toEqual('100:00:00');
        });

        it('should return proper string for value 363599999', () => {
            expect(pipe.transform(363599999)).toEqual('100:59:59');
        });

        it('should return proper string for value -2000', () => {
            expect(pipe.transform(-2000)).toEqual('00:00:02');
        });

        it('should return proper string for value -363599999', () => {
            expect(pipe.transform(-363599999)).toEqual('100:59:59');
        });
    });

});
