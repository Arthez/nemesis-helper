import { Pipe, PipeTransform } from '@angular/core';
import { GameMode } from '@common/enums/game-mode.enum';
import { TranslationKey } from '@common/types/translation-key.type';
import { getGameModesConfig } from '@configs/game-modes.config';

@Pipe({
    name: 'gameModeTk',
    standalone: true,
})
export class GameModeTkPipe implements PipeTransform {

    public transform(gameMode: GameMode): TranslationKey {
        return getGameModesConfig().find(config => config.id === gameMode)?.translationKey || '';
    }

}
