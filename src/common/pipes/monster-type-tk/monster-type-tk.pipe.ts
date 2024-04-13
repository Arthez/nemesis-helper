import { Pipe, PipeTransform } from '@angular/core';
import { MonsterType } from '@common/enums/monster-types.enum';
import { TranslationKey } from '@common/types/translation-key.type';

@Pipe({
    name: 'monsterTypeTk',
    standalone: true,
})
export class MonsterTypeTkPipe implements PipeTransform {

    public transform(monsterType: MonsterType): TranslationKey {
        switch (monsterType) {
            case MonsterType.QUEEN:
                return 'tk.config.label.monster-type.queen';
            case MonsterType.BREEDER:
                return 'tk.config.label.monster-type.breeder';
            case MonsterType.ADULT:
                return 'tk.config.label.monster-type.adult';
            case MonsterType.CREEPER:
                return 'tk.config.label.monster-type.creeper';
            case MonsterType.LARVA:
                return 'tk.config.label.monster-type.larva';
            case MonsterType.BLANK:
                return 'tk.config.label.monster-type.blank';
            default:
                return '';
        }
    }

}
