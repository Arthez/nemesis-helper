import { ContentItem } from '@common/interfaces/content-item.interface';
import { PhaseConfig } from '@common/interfaces/phase-config.interface';

export type Stage =
    'draw_cards'
    | 'first_player_transfer'
    | 'player_actions'
    | 'remaining_player_actions'
    | 'round_tracker_update'
    | 'monster_attack'
    | 'monster_fire_damage'
    | 'resolve_event_card'
    | 'monster_development';


export const stagesSummaryConfig: Record<Stage, Readonly<ContentItem>> = Object.freeze({
    draw_cards: {
        name: 'tk.nog.config.label.phase1.stage1.draw-cards',
        content: 'tk.nog.config.label.phase1.stage1.content',
    },
    first_player_transfer: {
        name: 'tk.nog.config.label.phase1.stage2.first-player-transfer',
        content: 'tk.nog.config.label.phase1.stage2.content',
    },
    player_actions: {
        name: 'tk.nog.config.label.phase1.stage3.player-actions',
        content: 'tk.nog.config.label.phase1.stage3.content',
    },
    remaining_player_actions: {
        name: 'tk.nog.config.label.phase1.stage4.remaining-player-actions',
        content: 'tk.nog.config.label.phase1.stage4.content',
    },
    round_tracker_update: {
        name: 'tk.nog.config.label.phase2.stage5.round-tracker-update',
        content: 'tk.nog.config.label.phase2.stage5.content',
    },
    monster_attack: {
        name: 'tk.nog.config.label.phase2.stage6.monster-attack',
        content: 'tk.nog.config.label.phase2.stage6.content',
    },
    monster_fire_damage: {
        name: 'tk.nog.config.label.phase2.stage7.monster-fire-damage',
        content: 'tk.nog.config.label.phase2.stage7.content',
    },
    resolve_event_card: {
        name: 'tk.nog.config.label.phase2.stage8.resolve-event-card',
        content: 'tk.nog.config.label.phase2.stage8.content',
    },
    monster_development: {
        name: 'tk.nog.config.label.phase2.stage9.monster-development',
        content: 'tk.nog.config.label.phase2.stage9.content',
    },
});

const phasesConfig: PhaseConfig<Stage>[] = [
    {
        id: 'P1',
        labelKey: 'tk.nog.config.label.phase1',
        stages: [
            { labelKey: 'tk.nog.config.label.phase1.stage1.draw-cards', stageId: 'draw_cards' },
            { labelKey: 'tk.nog.config.label.phase1.stage2.first-player-transfer', stageId: 'first_player_transfer' },
            { labelKey: 'tk.nog.config.label.phase1.stage3.player-actions', stageId: 'player_actions' },
            { labelKey: 'tk.nog.config.label.phase1.stage4.remaining-player-actions', stageId: 'remaining_player_actions' },
        ],
    },
    {
        id: 'P2',
        labelKey: 'tk.nog.config.label.phase2',
        stages: [
            { labelKey: 'tk.nog.config.label.phase2.stage5.round-tracker-update', stageId: 'round_tracker_update' },
            { labelKey: 'tk.nog.config.label.phase2.stage6.monster-attack', stageId: 'monster_attack' },
            { labelKey: 'tk.nog.config.label.phase2.stage7.monster-fire-damage', stageId: 'monster_fire_damage' },
            { labelKey: 'tk.nog.config.label.phase2.stage8.resolve-event-card', stageId: 'resolve_event_card' },
            { labelKey: 'tk.nog.config.label.phase2.stage9.monster-development', stageId: 'monster_development' },
        ],
    },
];

export const getPhasesConfig: () => PhaseConfig<Stage>[] = () => phasesConfig.map(config => ({ ...config }));
