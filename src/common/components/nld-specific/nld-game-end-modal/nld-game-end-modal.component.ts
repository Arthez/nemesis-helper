import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { MsToDurationPipe } from '@common/pipes/ms-to-duration/ms-to-duration.pipe';
import { GameSetupDataLockdown } from '@configs/games.config';
import { TranslateModule } from '@ngx-translate/core';

export interface NlGameEndModalData extends GameSetupDataLockdown {
    alertProcedureActivated: boolean;
    autodestructionHappened: boolean;
}

@Component({
    selector: 'app-nld-game-end-modal',
    standalone: true,
    imports: [
        TranslateModule,
        MatButton,
        NonFocusableDirective,
        MatDialogClose,
        MsToDurationPipe,
        MatCheckbox,
        FormsModule,
    ],
    templateUrl: './nld-game-end-modal.component.html',
    styleUrl: './nld-game-end-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NldGameEndModalComponent {

    public agreeToFinish: boolean = false;

    protected readonly data: NlGameEndModalData = inject(MAT_DIALOG_DATA);
    protected gameEndDate: Date = new Date();
    protected duration: number = this.gameEndDate.getTime() - (new Date(this.data.createdDate)).getTime();

}
