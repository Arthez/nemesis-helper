import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { gameSavedLogText, LogItem } from '@common/classes/logger.class';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { GameKey } from '@configs/games.config';
import { TranslateModule } from '@ngx-translate/core';

export interface ReloadModalData {
    gameId: GameKey;
    logs: LogItem[];
}

@Component({
    selector: 'app-reload-modal',
    standalone: true,
    imports: [
        MatButton,
        NonFocusableDirective,
        TranslateModule,
        DatePipe,
        NgClass,
    ],
    templateUrl: './reload-modal.component.html',
    styleUrl: './reload-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReloadModalComponent {
    protected readonly data: ReloadModalData = inject(MAT_DIALOG_DATA);
    protected readonly logs: LogItem[] | null;
    protected readonly saveGameLog: LogItem | null;
    private readonly matDialogRef: MatDialogRef<ReloadModalComponent> = inject(MatDialogRef);

    public constructor() {
        const reversedLogs: LogItem[] = [...this.data.logs].reverse();
        const firstDataSaveLogIndex: number = reversedLogs.findIndex(logItem => logItem.text.includes(gameSavedLogText));
        this.saveGameLog = reversedLogs[firstDataSaveLogIndex] || reversedLogs[0];
        this.logs = firstDataSaveLogIndex > -1 ? reversedLogs.slice(0, firstDataSaveLogIndex) : reversedLogs;
    }

    public closeModal(result: boolean): void {
        this.matDialogRef.close(result);
    }
}
