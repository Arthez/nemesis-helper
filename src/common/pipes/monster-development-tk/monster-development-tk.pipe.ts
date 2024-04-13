import { Pipe, PipeTransform } from '@angular/core';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterDevelopmentConfig } from '@common/types/monster-development-config.type';
import { TranslationKey } from '@common/types/translation-key.type';

@Pipe({
    name: 'monsterDevelopmentTk',
    standalone: true,
})
export class MonsterDevelopmentTkPipe implements PipeTransform {

    public transform(
        monsterType: MonsterType,
        monsterDevelopmentConfig: MonsterDevelopmentConfig,
    ): TranslationKey {
        return monsterDevelopmentConfig[monsterType].labelKey;
    }

}
