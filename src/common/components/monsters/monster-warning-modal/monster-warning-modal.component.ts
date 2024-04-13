import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MonsterItemComponent } from '@common/components/monsters/monster-item/monster-item.component';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { MonsterTypeTkPipe } from '@common/pipes/monster-type-tk/monster-type-tk.pipe';
import { TranslationKey } from '@common/types/translation-key.type';
import { TranslateModule } from '@ngx-translate/core';

export interface MonsterWarningModalData {
    titleKey: TranslationKey;
    messageKey: TranslationKey;
    noButtonKey?: TranslationKey;
    yesButtonKey: TranslationKey;
    monster: MonsterTokenBase;
    showTokenBack?: boolean;
}

@Component({
    selector: 'app-monster-warning-modal',
    standalone: true,
    imports: [
        TranslateModule,
        MatButton,
        MonsterItemComponent,
        NonFocusableDirective,
        MonsterTypeTkPipe,
    ],
    templateUrl: './monster-warning-modal.component.html',
    styleUrl: './monster-warning-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonsterWarningModalComponent {

    protected readonly monsterType: typeof MonsterType = MonsterType;
    protected readonly data: MonsterWarningModalData = inject(MAT_DIALOG_DATA);
    private readonly matDialogRef: MatDialogRef<MonsterWarningModalComponent> = inject(MatDialogRef);

    public onClick(result: boolean): void {
        this.matDialogRef.close(result);
    }

}
