import { GameMode } from '@common/enums/game-mode.enum';
import { GameModeTkPipe } from './game-mode-tk.pipe';

describe('GameModeTkPipe', () => {

    let pipe: GameModeTkPipe;

    beforeEach(() => {
        pipe = new GameModeTkPipe();
    });

    describe('transform', () => {
        it('should return proper translation key when param is SEMI_COOP', () => {
            expect(pipe.transform(GameMode.SEMI_COOP)).toEqual('tk.config.label.game-mode.semi-co-op');
        });

        it('should return proper translation key when param is FULL_COOP', () => {
            expect(pipe.transform(GameMode.FULL_COOP)).toEqual('tk.config.label.game-mode.full-co-op');
        });
    });

});
