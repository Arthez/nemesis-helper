import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { GameConfig } from '@configs/games.config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-save-warning-modal',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        TranslateModule,
        NonFocusableDirective,
    ],
    templateUrl: './save-warning-modal.component.html',
    styleUrl: './save-warning-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveWarningModalComponent {

    protected readonly data: GameConfig = inject(MAT_DIALOG_DATA);
    private readonly matDialogRef: MatDialogRef<SaveWarningModalComponent> = inject(MatDialogRef);

    protected onProceed(): void {
        this.matDialogRef.close(true);
    }

    protected onCancel(): void {
        this.matDialogRef.close(false);
    }

}
