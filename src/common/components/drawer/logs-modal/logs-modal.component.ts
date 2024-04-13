import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogItem } from '@common/classes/logger.class';
import { GameIdTkPipe } from '@common/pipes/game-id-tk/game-id-tk.pipe';
import { GameKey } from '@configs/games.config';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export interface LogsModalData {
    gameId: GameKey;
    logs: LogItem[];
}

interface FiltersForm {
    event: FormControl<boolean>;
    tracker: FormControl<boolean>;
    monster: FormControl<boolean>;
}

@Component({
    selector: 'app-logs-modal',
    standalone: true,
    imports: [
        NgClass,
        DatePipe,
        TranslateModule,
        MatCheckbox,
        ReactiveFormsModule,
        GameIdTkPipe,
    ],
    templateUrl: './logs-modal.component.html',
    styleUrl: './logs-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsModalComponent implements OnInit, OnDestroy {

    protected readonly data: LogsModalData = inject(MAT_DIALOG_DATA);
    protected readonly logs: WritableSignal<LogItem[]> = signal(this.data.logs);
    protected readonly filters: FormGroup = new FormGroup<FiltersForm>({
        event: new FormControl<boolean>(true, { nonNullable: true }),
        tracker: new FormControl<boolean>(true, { nonNullable: true }),
        monster: new FormControl<boolean>(true, { nonNullable: true }),
    });
    private readonly subSink: Subscription = new Subscription();

    public ngOnInit(): void {
        this.subSink.add(this.filters.valueChanges.subscribe(filters => {
            this.logs.set(this.data.logs.filter(log => filters[log.type]));
        }));
    }

    public ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

}
