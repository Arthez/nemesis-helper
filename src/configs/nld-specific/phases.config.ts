import { ContentItem } from '@common/interfaces/content-item.interface';
import { PhaseConfig } from '@common/interfaces/phase-config.interface';

export type Stage =
    'draw_cards'
    | 'first_player_transfer'
    | 'player_actions'
    | 'launch_css'
    | 'round_tracker_update'
    | 'noise_markers_removal'
    | 'monster_attack'
    | 'monster_fire_damage'
    | 'resolve_event_card'
    | 'monster_development';

export const stagesSummaryConfig: Record<Stage, Readonly<ContentItem>> = Object.freeze({
    draw_cards: {
        name: 'tk.nld.config.label.phase1.stage1.draw-cards',
        content: 'tk.nld.config.label.phase1.stage1.content',
    },
    first_player_transfer: {
        name: 'tk.nld.config.label.phase1.stage2.first-player-transfer',
        content: 'tk.nld.config.label.phase1.stage2.content',
    },
    player_actions: {
        name: 'tk.nld.config.label.phase1.stage3.player-actions',
        content: 'tk.nld.config.label.phase1.stage3.content',
    },
    launch_css: {
        name: 'tk.nld.config.label.phase2.stage4.launch-css',
        content: 'tk.nld.config.label.phase2.stage4.content',
    },
    round_tracker_update: {
        name: 'tk.nld.config.label.phase2.stage5.round-tracker-update',
        content: 'tk.nld.config.label.phase2.stage5.content',
    },
    noise_markers_removal: {
        name: 'tk.nld.config.label.phase2.stage6.noise-markers-removal',
        content: 'tk.nld.config.label.phase2.stage6.content',
    },
    monster_attack: {
        name: 'tk.nld.config.label.phase2.stage7.monster-attack',
        content: 'tk.nld.config.label.phase2.stage7.content',
    },
    monster_fire_damage: {
        name: 'tk.nld.config.label.phase2.stage8.monster-fire-damage',
        content: 'tk.nld.config.label.phase2.stage8.content',
    },
    resolve_event_card: {
        name: 'tk.nld.config.label.phase2.stage9.resolve-event-card',
        content: 'tk.nld.config.label.phase2.stage9.content',
    },
    monster_development: {
        name: 'tk.nld.config.label.phase2.stage10.monster-development',
        content: 'tk.nld.config.label.phase2.stage10.content',
    },
});

const phasesConfig: PhaseConfig<Stage>[] = [
    {
        id: 'P1',
        labelKey: 'tk.nld.config.label.phase1',
        stages: [
            { labelKey: 'tk.nld.config.label.phase1.stage1.draw-cards', stageId: 'draw_cards' },
            { labelKey: 'tk.nld.config.label.phase1.stage2.first-player-transfer', stageId: 'first_player_transfer' },
            { labelKey: 'tk.nld.config.label.phase1.stage3.player-actions', stageId: 'player_actions' },
        ],
    },
    {
        id: 'P2',
        labelKey: 'tk.nld.config.label.phase2',
        stages: [
            { labelKey: 'tk.nld.config.label.phase2.stage4.launch-css', stageId: 'launch_css' },
            { labelKey: 'tk.nld.config.label.phase2.stage5.round-tracker-update', stageId: 'round_tracker_update' },
            { labelKey: 'tk.nld.config.label.phase2.stage6.noise-markers-removal', stageId: 'noise_markers_removal' },
            { labelKey: 'tk.nld.config.label.phase2.stage7.monster-attack', stageId: 'monster_attack' },
            { labelKey: 'tk.nld.config.label.phase2.stage8.monster-fire-damage', stageId: 'monster_fire_damage' },
            { labelKey: 'tk.nld.config.label.phase2.stage9.resolve-event-card', stageId: 'resolve_event_card' },
            { labelKey: 'tk.nld.config.label.phase2.stage10.monster-development', stageId: 'monster_development' },
        ],
    },
];

export const getPhasesConfig: () => PhaseConfig<Stage>[] = () => phasesConfig.map(config => ({ ...config }));
