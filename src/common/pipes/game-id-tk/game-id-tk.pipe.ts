import { Pipe, PipeTransform } from '@angular/core';
import { TranslationKey } from '@common/types/translation-key.type';
import { gameConfigs, GameKey } from '@configs/games.config';

@Pipe({
    name: 'gameIdTk',
    standalone: true,
})
export class GameIdTkPipe implements PipeTransform {

    public transform(key: TranslationKey, gameId: GameKey): TranslationKey {
        return key.replace('id_short', gameConfigs[gameId].idShort);
    }

}
