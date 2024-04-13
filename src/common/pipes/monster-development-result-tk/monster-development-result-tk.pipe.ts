import { Pipe, PipeTransform } from '@angular/core';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterDevelopmentResult } from '@common/interfaces/monster-development-result.interface';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { MonsterDevelopmentConfig } from '@common/types/monster-development-config.type';
import { TranslationKey } from '@common/types/translation-key.type';

@Pipe({
    name: 'monsterDevelopmentResultTk',
    standalone: true,
})
export class MonsterDevelopmentResultTkPipe implements PipeTransform {

    public transform(
        developmentResultData: MonsterDevelopmentResult<MonsterTokenBase>,
        monsterDevelopmentConfig: MonsterDevelopmentConfig,
    ): TranslationKey {
        const monsterType: MonsterType = developmentResultData.token.type;
        return developmentResultData.success ?
            monsterDevelopmentConfig[monsterType].successResultKey :
            monsterDevelopmentConfig[monsterType].failureResultKey;
    }

}
