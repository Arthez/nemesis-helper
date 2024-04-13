import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterDevelopmentResult } from '@common/interfaces/monster-development-result.interface';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { Shuffler } from '@common/utils/shuffler.util';

type MonsterSource = 'available' | 'bag' | 'active';

@Injectable({
    providedIn: 'root',
})
export class MonsterTokensService<MonsterTokenType extends MonsterTokenBase> {

    public readonly availableMonsters: Signal<MonsterTokenType[]>;
    public readonly bagMonsters: Signal<MonsterTokenType[]>;
    public readonly activeMonsters: Signal<MonsterTokenType[]>;

    private readonly availableMonstersWritable: WritableSignal<MonsterTokenType[]> = signal([]);
    private readonly bagMonstersWritable: WritableSignal<MonsterTokenType[]> = signal([]);
    private readonly activeMonstersWritable: WritableSignal<MonsterTokenType[]> = signal([]);

    public constructor() {
        this.availableMonsters = this.availableMonstersWritable.asReadonly();
        this.bagMonsters = this.bagMonstersWritable.asReadonly();
        this.activeMonsters = this.activeMonstersWritable.asReadonly();
    }

    public initMonsters(
        defaultMonsterBagConfig: Record<MonsterType, number>,
        availableMonsters: MonsterTokenType[],
        playerCount: number,
    ): void {
        const initialSetup: MonsterType[] = [
            ...this.generateMonsterTypeArray(defaultMonsterBagConfig, MonsterType.BLANK),
            ...this.generateMonsterTypeArray(defaultMonsterBagConfig, MonsterType.LARVA),
            ...this.generateMonsterTypeArray(defaultMonsterBagConfig, MonsterType.CREEPER),
            ...this.generateMonsterTypeArray(defaultMonsterBagConfig, MonsterType.ADULT, playerCount),
            ...this.generateMonsterTypeArray(defaultMonsterBagConfig, MonsterType.BREEDER),
            ...this.generateMonsterTypeArray(defaultMonsterBagConfig, MonsterType.QUEEN),
        ];
        const drawnMonsters: MonsterTokenType[] = [];
        initialSetup.forEach(type => {
            const monsterIndex: number = availableMonsters.findIndex(monster => monster.type === type);
            if (monsterIndex !== -1) {
                drawnMonsters.push(availableMonsters[monsterIndex]);
                availableMonsters.splice(monsterIndex, 1);
            }
        });
        this.availableMonstersWritable.set(this.shuffle(availableMonsters));
        this.bagMonstersWritable.set(this.shuffle(drawnMonsters));
        this.activeMonstersWritable.set([]);
    }

    public loadBags(monsters: {
        availableMonsters: MonsterTokenType[];
        activeMonsters: MonsterTokenType[];
        bagMonsters: MonsterTokenType[];
    }): void {
        this.availableMonstersWritable.set(this.shuffle(monsters.availableMonsters));
        this.bagMonstersWritable.set(this.shuffle(monsters.bagMonsters));
        this.activeMonstersWritable.set(monsters.activeMonsters);
    }

    public addMonsterToBag(type: MonsterTokenType['type']): MonsterTokenType | undefined {
        return this.transferMonster('available', 'bag', monster => monster.type === type);
    }

    public getMonsterEncounterFromBag(): MonsterTokenType | undefined {
        const bagMonsters: MonsterTokenType[] = this.bagMonstersWritable();
        if (bagMonsters.length < 1) {
            return undefined;
        }
        const transferIndex: number = 0;
        const encounterToken: MonsterTokenType = bagMonsters[transferIndex];
        if (encounterToken.type === 'BLANK') {
            if (bagMonsters.length === 1) {
                this.transferMonster('available', 'bag', monster => monster.type === MonsterType.ADULT);
            }
            this.bagMonstersWritable.update(monsters => this.shuffle(monsters));
            return encounterToken;
        }
        this.activeMonstersWritable.update(monsters => [...monsters, encounterToken]);
        this.bagMonstersWritable.update(monsters => {
            monsters.splice(transferIndex, 1);
            return this.shuffle(monsters);
        });
        return encounterToken;
    }

    public triggerMonsterDevelopment(): MonsterDevelopmentResult<MonsterTokenType> {
        const fromArr: WritableSignal<MonsterTokenType[]> = this.getSignal('bag');
        const token: MonsterTokenType = fromArr()[0];

        switch (token.type) {
            case MonsterType.BLANK:
                return { token, success: this.triggerBlankDevelopment() };
            case MonsterType.LARVA:
                return { token, success: this.triggerLarvaDevelopment(token.id) };
            case MonsterType.CREEPER:
                return { token, success: this.triggerCreeperDevelopment(token.id) };
            case MonsterType.ADULT:
            case MonsterType.BREEDER:
            case MonsterType.QUEEN:
                this.bagMonstersWritable.update(monsters => this.shuffle(monsters));
                return { token, success: true };
            default:
                return { token, success: false };
        }
    }

    public killMonster(monsterId: MonsterTokenType['id']): MonsterTokenType | undefined {
        return this.transferMonster('active', 'available', monster => monster.id === monsterId);
    }

    public putMonsterBackToBag(monsterId: MonsterTokenType['id']): MonsterTokenType | undefined {
        return this.transferMonster('active', 'bag', monster => monster.id === monsterId);
    }

    public summonQueenInNest(): MonsterTokenType | undefined {
        return this.transferMonster('bag', 'active', monster => monster.type === MonsterType.QUEEN);
    }

    private triggerBlankDevelopment(): boolean {
        return !!this.transferMonster('available', 'bag', monster => monster.type === MonsterType.ADULT);
    }

    private triggerLarvaDevelopment(larvaId: string): boolean {
        if (this.transferMonster('available', 'bag', monster => monster.type === MonsterType.ADULT)) {
            this.transferMonster('bag', 'available', monster => monster.id === larvaId);
            return true;
        }
        return false;
    }

    private triggerCreeperDevelopment(creeperId: string): boolean {
        if (this.transferMonster('available', 'bag', monster => monster.type === MonsterType.BREEDER)) {
            this.transferMonster('bag', 'available', monster => monster.id === creeperId);
            return true;
        }
        return false;
    }

    private generateMonsterTypeArray(
        defaultMonsterBagConfig: Record<MonsterType, number>,
        type: MonsterType,
        additional: number = 0,
    ): MonsterType[] {
        const length: number = defaultMonsterBagConfig[type] + additional;
        return Array.from({ length }, () => type);
    }

    private transferMonster(
        from: MonsterSource,
        to: MonsterSource,
        predicate?: (monster: MonsterTokenType) => boolean,
    ): MonsterTokenType | undefined {
        const fromArr: WritableSignal<MonsterTokenType[]> = this.getSignal(from);
        const toArr: WritableSignal<MonsterTokenType[]> = this.getSignal(to);
        const fromMonsters: MonsterTokenType[] = fromArr();
        const transferIndex: number = predicate ? fromMonsters.findIndex(predicate) : 0;
        const monsterToTransfer: MonsterTokenType = fromMonsters[transferIndex];
        if (!monsterToTransfer) {
            return undefined;
        }
        toArr.update(items => this.shuffleArrayIfCertainType([...items, fromMonsters[transferIndex]], to));
        fromArr.update(items => {
            items.splice(transferIndex, 1);
            return this.shuffleArrayIfCertainType([...items], from);
        });
        return monsterToTransfer;
    }

    private getSignal(source: MonsterSource): WritableSignal<MonsterTokenType[]> {
        switch (source) {
            case 'available':
                return this.availableMonstersWritable;
            case 'bag':
                return this.bagMonstersWritable;
            case 'active':
                return this.activeMonstersWritable;
            default:
                return this.availableMonstersWritable;
        }
    }

    private shuffleArrayIfCertainType(monsters: MonsterTokenType[], source: MonsterSource): MonsterTokenType[] {
        return source === 'bag' || source === 'available' ? this.shuffle(monsters) : monsters;
    }

    private shuffle<T>(array: T[]): T[] {
        const shuffleAmount: number = 3;
        return Shuffler.multipleShuffle(array, shuffleAmount);
    }

}
