import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { TranslationKey } from '@common/types/translation-key.type';
import { TranslateModule } from '@ngx-translate/core';

export interface ConfirmationModalData {
    titleKey: TranslationKey;
    messageKey: TranslationKey;
    yesButtonKey: TranslationKey;
    noButtonKey?: TranslationKey;
}

@Component({
    selector: 'app-confirmation-modal',
    standalone: true,
    imports: [
        TranslateModule,
        MatButton,
        MatDialogActions,
        MatDialogTitle,
        MatDialogContent,
        NonFocusableDirective,
    ],
    templateUrl: './confirmation-modal.component.html',
    styleUrl: './confirmation-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {

    protected readonly data: ConfirmationModalData = inject(MAT_DIALOG_DATA);
    private readonly matDialogRef: MatDialogRef<ConfirmationModalComponent> = inject(MatDialogRef);

    public onClick(result: boolean): void {
        this.matDialogRef.close(result);
    }

}
