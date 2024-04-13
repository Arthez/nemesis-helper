import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameIdTkPipe } from '@common/pipes/game-id-tk/game-id-tk.pipe';
import { TranslationKey } from '@common/types/translation-key.type';
import { GameKey } from '@configs/games.config';
import { TranslateModule } from '@ngx-translate/core';

export interface KeyMomentsModalData {
    gameId: GameKey;
    keyMoments: TranslationKey[];
}

@Component({
    selector: 'app-key-moments-modal',
    standalone: true,
    imports: [
        TranslateModule,
        GameIdTkPipe,
    ],
    templateUrl: './key-moments-modal.component.html',
    styleUrl: './key-moments-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyMomentsModalComponent {
    protected readonly data: KeyMomentsModalData = inject(MAT_DIALOG_DATA);
}
