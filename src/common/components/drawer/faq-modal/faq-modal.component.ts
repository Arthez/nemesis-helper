import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationGroup } from '@common/interfaces/translation-group.interface';
import { GameIdTkPipe } from '@common/pipes/game-id-tk/game-id-tk.pipe';
import { GameKey } from '@configs/games.config';
import { TranslateModule } from '@ngx-translate/core';

export interface FaqModalData {
    gameId: GameKey;
    faqGroups: TranslationGroup[];
}

@Component({
    selector: 'app-faq-modal',
    standalone: true,
    imports: [
        TranslateModule,
        GameIdTkPipe,
    ],
    templateUrl: './faq-modal.component.html',
    styleUrl: './faq-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqModalComponent {
    protected readonly data: FaqModalData = inject(MAT_DIALOG_DATA);

    protected scrollInto(index: number): void {
        document.querySelector(`#group${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
}
