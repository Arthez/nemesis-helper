import { GameMode } from '@common/enums/game-mode.enum';
import { TranslationKey } from '@common/types/translation-key.type';

export interface GameModeConfig {
    id: GameMode;
    translationKey: TranslationKey;
}

const gameModesConfig: GameModeConfig[] = [
    { id: GameMode.SEMI_COOP, translationKey: 'tk.config.label.game-mode.semi-co-op' },
    { id: GameMode.FULL_COOP, translationKey: 'tk.config.label.game-mode.full-co-op' },
];

export const getGameModesConfig: () => GameModeConfig[] = () => gameModesConfig.map(config => ({ ...config }));
