import { GameIdTkPipe } from './game-id-tk.pipe';

describe('GameIdTkPipe', () => {
    let pipe: GameIdTkPipe;

    beforeEach(() => {
        pipe = new GameIdTkPipe();
    });

    describe('transform', () => {
        it('should return unchanged translation key when no "id_short" is in the key', () => {
            expect(pipe.transform('tk.label.some-key', 'nemesisOriginal')).toEqual('tk.label.some-key');
        });

        it('should return properly modified translation key when "id_short" is in the key for gameId nemesisOriginal', () => {
            expect(pipe.transform('tk.id_short.label.some-key', 'nemesisOriginal')).toEqual('tk.nog.label.some-key');
        });

        it('should return properly modified translation key when "id_short" is in the key for gameId nemesisLockdown', () => {
            expect(pipe.transform('tk.id_short.label.some-key', 'nemesisLockdown')).toEqual('tk.nld.label.some-key');
        });

        it('should return properly modified translation key when "id_short" is in the key for gameId nemesisRetaliation', () => {
            expect(pipe.transform('tk.id_short.label.some-key', 'nemesisRetaliation')).toEqual('tk.nrl.label.some-key');
        });
    });
});
