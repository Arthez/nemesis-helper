import { NldPowerSupplyData } from '@common/components/nld-specific/nld-power-supply/nld-power-supply-item.interface';
import { GameMode } from '@common/enums/game-mode.enum';
import { Player } from '@common/interfaces/player.interface';
import { IsoDateString } from '@common/types/iso-date-string.type';
import { TranslationKey } from '@common/types/translation-key.type';

export type GameKey = keyof GameConfigs;

export interface GameConfig {
    id: GameKey;
    idShort: string;
    path: string;
    nameKey: TranslationKey;
    disabled: boolean;
    imageUrl: string;
}

export interface GameConfigs {
    nemesisOriginal: GameConfig;
    nemesisLockdown: GameConfig;
    nemesisRetaliation: GameConfig;
}

export const gameConfigs: GameConfigs = Object.freeze({
    nemesisOriginal: Object.freeze({
        id: 'nemesisOriginal',
        idShort: 'nog',
        path: 'nemesis',
        nameKey: 'tk.game.name.nemesis-original',
        imageUrl: 'assets/images/tileNog.jpg',
        disabled: false,
    }),
    nemesisLockdown: Object.freeze({
        id: 'nemesisLockdown',
        idShort: 'nld',
        path: 'nemesis-lockdown',
        nameKey: 'tk.game.name.nemesis-lockdown',
        imageUrl: 'assets/images/tileNld.jpg',
        disabled: false,
    }),
    nemesisRetaliation: Object.freeze({
        id: 'nemesisRetaliation',
        idShort: 'nrl',
        path: 'nemesis-retaliation',
        nameKey: 'tk.game.name.nemesis-retaliation',
        imageUrl: 'assets/images/tileNrl.jpg',
        disabled: true,
    }),
});

interface GameSetupDataBase {
    players: Player[];
    gameMode: GameMode;
    timerEnabled: boolean;
    createdDate: IsoDateString;
}

export interface GameSetupDataOriginal extends GameSetupDataBase {
    gameId: 'nemesisOriginal';
}

export interface GameSetupDataLockdown extends GameSetupDataBase {
    gameId: 'nemesisLockdown';
    powerSupplyData: NldPowerSupplyData;
}

export interface GameSetupDataRetaliation extends GameSetupDataBase {
    gameId: 'nemesisRetaliation';
}

export type GameSetupData = GameSetupDataOriginal | GameSetupDataLockdown | GameSetupDataRetaliation;
