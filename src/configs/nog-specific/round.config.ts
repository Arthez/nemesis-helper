export type RoundTrackerEvent =
    'autodestruction_start'
    | 'autodestruction_stop'
    | 'end_the_game';

export interface RoundConfig {
    num: number;
}

const roundConfigs: RoundConfig[] = [
    { num: 15 },
    { num: 14 },
    { num: 13 },
    { num: 12 },
    { num: 11 },
    { num: 10 },
    { num: 9 },
    { num: 8 },
    { num: 7 },
    { num: 6 },
    { num: 5 },
    { num: 4 },
    { num: 3 },
    { num: 2 },
    { num: 1 },
    { num: 0 },
];

export const getRoundConfigs: () => RoundConfig[] = () => roundConfigs.map(config => ({ ...config }));
