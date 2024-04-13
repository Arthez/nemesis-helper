export type RoundTrackerEvent =
    'power_turn_on'
    | 'power_turn_off'
    | 'autodestruction_start'
    | 'autodestruction_stop'
    | 'alert_procedure_trigger'
    | 'end_the_game';

export interface RoundConfig {
    num: number;
    powerActive: boolean;
    powerInactive: boolean;
    cssSlotNum?: number;
}

const roundConfigs: RoundConfig[] = [
    { num: 15, powerActive: false, powerInactive: false },
    { num: 14, powerActive: false, powerInactive: true },
    { num: 13, powerActive: false, powerInactive: true },
    { num: 12, powerActive: false, powerInactive: false },
    { num: 11, powerActive: true, powerInactive: true },
    { num: 10, powerActive: false, powerInactive: false, cssSlotNum: 1 },
    { num: 9, powerActive: false, powerInactive: true },
    { num: 8, powerActive: false, powerInactive: false, cssSlotNum: 2 },
    { num: 7, powerActive: false, powerInactive: true },
    { num: 6, powerActive: false, powerInactive: false, cssSlotNum: 3 },
    { num: 5, powerActive: true, powerInactive: true },
    { num: 4, powerActive: false, powerInactive: true, cssSlotNum: 4 },
    { num: 3, powerActive: true, powerInactive: true },
    { num: 2, powerActive: false, powerInactive: false, cssSlotNum: 5 },
    { num: 1, powerActive: false, powerInactive: false, cssSlotNum: 6 },
    { num: 0, powerActive: false, powerInactive: false },
];

export const getRoundConfigs: () => RoundConfig[] = () => roundConfigs.map(config => ({ ...config }));
