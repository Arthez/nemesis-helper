import { Pipe, PipeTransform } from '@angular/core';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';

@Pipe({
    name: 'monsterCount',
    standalone: true,
})
export class MonsterCountPipe implements PipeTransform {

    public transform(monsters: MonsterTokenBase[], type: MonsterType): number {
        return monsters.filter(monster => type === monster.type).length;
    }

}
