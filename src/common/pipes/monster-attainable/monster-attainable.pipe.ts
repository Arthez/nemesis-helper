import { Pipe, PipeTransform } from '@angular/core';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';

@Pipe({
    name: 'monsterAttainable',
    standalone: true,
})
export class MonsterAttainablePipe implements PipeTransform {

    public transform(monsters: MonsterTokenBase[], type: MonsterType): boolean {
        return monsters.some(monster => type === monster.type);
    }

}
