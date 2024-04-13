import { PlayerActionsDisablePipe } from '@common/pipes/player-actions-disable/player-actions-disable.pipe';

type Stage = 'player_action1' | 'player_action2' | 'event_action1' | 'event_action2' | 'event_action3';

describe('PlayerActionsDisablePipe', () => {

    let pipe: PlayerActionsDisablePipe;

    const allowedStages: Stage[] = ['player_action1', 'player_action2'];

    beforeEach(() => {
        pipe = new PlayerActionsDisablePipe();
    });

    describe('transform', () => {
        it('should return true for undefined stage', () => {
            expect(pipe.transform<Stage>(undefined, allowedStages)).toEqual(true);
        });

        it('should return true for player_action1 stage but allowedStages as empty array', () => {
            expect(pipe.transform<Stage>('player_action1', [])).toEqual(true);
        });

        it('should return true for event_action3 stage but allowedStages as empty array', () => {
            expect(pipe.transform<Stage>('event_action3', [])).toEqual(true);
        });

        it('should return false for stage player_action1', () => {
            expect(pipe.transform<Stage>('player_action1', allowedStages)).toEqual(false);
        });

        it('should return false for stage player_action2', () => {
            expect(pipe.transform<Stage>('player_action2', allowedStages)).toEqual(false);
        });

        it('should return true for stage event_action1', () => {
            expect(pipe.transform<Stage>('event_action1', allowedStages)).toEqual(true);
        });

        it('should return true for stage event_action2', () => {
            expect(pipe.transform<Stage>('event_action2', allowedStages)).toEqual(true);
        });

        it('should return true for stage event_action3', () => {
            expect(pipe.transform<Stage>('event_action3', allowedStages)).toEqual(true);
        });
    });

});
