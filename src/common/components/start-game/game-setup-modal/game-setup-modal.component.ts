import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NldPowerSupplyComponent } from '@common/components/nld-specific/nld-power-supply/nld-power-supply.component';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { GameSetupData } from '@configs/games.config';
import { PowerSupplySectionConfig, powerSupplySections } from '@configs/nld-specific/power-supply.config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-game-setup-modal',
    standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        TranslateModule,
        NldPowerSupplyComponent,
        NonFocusableDirective,
    ],
    templateUrl: './game-setup-modal.component.html',
    styleUrl: './game-setup-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupModalComponent {

    protected readonly powerSupplySections: PowerSupplySectionConfig = powerSupplySections;
    protected readonly data: GameSetupData = inject(MAT_DIALOG_DATA);
    private readonly matDialogRef: MatDialogRef<GameSetupModalComponent> = inject(MatDialogRef);

    public onOk(): void {
        this.matDialogRef.close();
    }

}
