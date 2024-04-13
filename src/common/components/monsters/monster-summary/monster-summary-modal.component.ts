import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { GameIdTkPipe } from '@common/pipes/game-id-tk/game-id-tk.pipe';
import { MonsterCountPipe } from '@common/pipes/monster-count/monster-count.pipe';
import { MonsterTypeTkPipe } from '@common/pipes/monster-type-tk/monster-type-tk.pipe';
import { TranslationKey } from '@common/types/translation-key.type';
import { GameKey } from '@configs/games.config';
import { getMonstersTypes } from '@configs/monster-type.config';
import { TranslateModule } from '@ngx-translate/core';

export interface MonsterSummaryModalData {
    activeMonsters: MonsterTokenBase[];
    availableMonsters: MonsterTokenBase[];
    bagMonsters: MonsterTokenBase[];
    gameId: GameKey;
}

interface SummaryConfigItem {
    buttonKey: TranslationKey;
    containerKey: TranslationKey;
    monsters: MonsterTokenBase[];
    uncovered: WritableSignal<boolean>;
}

@Component({
    selector: 'app-monster-summary-modal',
    standalone: true,
    imports: [
        MatButton,
        MonsterTypeTkPipe,
        NonFocusableDirective,
        TranslateModule,
        MatDialogClose,
        MonsterCountPipe,
        GameIdTkPipe,
    ],
    templateUrl: './monster-summary-modal.component.html',
    styleUrl: './monster-summary-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonsterSummaryModalComponent {

    protected readonly data: MonsterSummaryModalData = inject(MAT_DIALOG_DATA);
    protected readonly monstersTypes: MonsterType[] = getMonstersTypes();
    protected readonly summaryConfig: SummaryConfigItem[] = [
        {
            buttonKey: 'tk.id_short.monster-summary.button.show-active',
            containerKey: 'tk.id_short.monster-summary.label.active-monsters',
            monsters: this.data.activeMonsters,
            uncovered: signal(false),
        },
        {
            buttonKey: 'tk.id_short.monster-summary.button.show-available',
            containerKey: 'tk.id_short.monster-summary.label.available-monsters',
            monsters: this.data.availableMonsters,
            uncovered: signal(false),
        },
        {
            buttonKey: 'tk.id_short.monster-summary.button.show-bag',
            containerKey: 'tk.id_short.monster-summary.label.bag-monsters',
            monsters: this.data.bagMonsters,
            uncovered: signal(false),
        },
    ];

}
