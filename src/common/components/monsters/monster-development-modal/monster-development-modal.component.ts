import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MonsterItemComponent } from '@common/components/monsters/monster-item/monster-item.component';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterDevelopmentResult } from '@common/interfaces/monster-development-result.interface';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { GameIdTkPipe } from '@common/pipes/game-id-tk/game-id-tk.pipe';
import { MonsterDevelopmentResultTkPipe } from '@common/pipes/monster-development-result-tk/monster-development-result-tk.pipe';
import { MonsterDevelopmentTkPipe } from '@common/pipes/monster-development-tk/monster-development-tk.pipe';
import { MonsterTypeTkPipe } from '@common/pipes/monster-type-tk/monster-type-tk.pipe';
import { MonsterDevelopmentConfig } from '@common/types/monster-development-config.type';
import { GameKey } from '@configs/games.config';
import { TranslateModule } from '@ngx-translate/core';

export interface MonsterDevelopmentModalData {
    gameId: GameKey;
    developmentResult: MonsterDevelopmentResult<MonsterTokenBase>;
    monsterDevelopmentConfig: MonsterDevelopmentConfig;
}

@Component({
    selector: 'app-monster-development-modal',
    standalone: true,
    imports: [
        TranslateModule,
        MonsterTypeTkPipe,
        MonsterItemComponent,
        MatButton,
        NonFocusableDirective,
        MonsterDevelopmentTkPipe,
        MonsterDevelopmentResultTkPipe,
        GameIdTkPipe,
    ],
    templateUrl: './monster-development-modal.component.html',
    styleUrl: './monster-development-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonsterDevelopmentModalComponent {

    protected readonly monsterType: typeof MonsterType = MonsterType;
    protected readonly data: MonsterDevelopmentModalData = inject(MAT_DIALOG_DATA);
    private readonly matDialogRef: MatDialogRef<MonsterDevelopmentModalComponent> = inject(MatDialogRef);

    public onClick(result: boolean): void {
        this.matDialogRef.close(result);
    }

}
