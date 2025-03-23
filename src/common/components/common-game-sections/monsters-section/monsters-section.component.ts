import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MonsterItemComponent } from '@common/components/monsters/monster-item/monster-item.component';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { MonsterAttainablePipe } from '@common/pipes/monster-attainable/monster-attainable.pipe';
import { MonsterTypeTkPipe } from '@common/pipes/monster-type-tk/monster-type-tk.pipe';
import { getMonstersTypes } from '@configs/monster-type.config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-monsters-section',
    standalone: true,
    imports: [
        TranslateModule,
        MatButton,
        MonsterItemComponent,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        MonsterTypeTkPipe,
        MonsterAttainablePipe,
        NonFocusableDirective,
        MatIcon,
    ],
    templateUrl: './monsters-section.component.html',
    styleUrl: './monsters-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonstersSectionComponent {

    @Input({ required: true }) public activeMonsters: MonsterTokenBase[] = [];
    @Input({ required: true }) public availableMonsters: MonsterTokenBase[] = [];

    @Output() public draw: EventEmitter<void> = new EventEmitter<void>();
    @Output() public add: EventEmitter<MonsterType> = new EventEmitter<MonsterType>();
    @Output() public details: EventEmitter<void> = new EventEmitter<void>();
    @Output() public monsterKill: EventEmitter<MonsterTokenBase> = new EventEmitter<MonsterTokenBase>();
    @Output() public monsterRetreat: EventEmitter<MonsterTokenBase> = new EventEmitter<MonsterTokenBase>();

    protected readonly monstersTypes: MonsterType[] = getMonstersTypes();

    public onMonsterKill(monster: MonsterTokenBase): void {
        this.monsterKill.emit(monster);
    }

    public onMonsterRetreat(monster: MonsterTokenBase): void {
        this.monsterRetreat.emit(monster);
    }

}
