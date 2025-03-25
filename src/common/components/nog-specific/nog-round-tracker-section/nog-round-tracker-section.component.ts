import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NogRoundItemComponent } from '@common/components/nog-specific/nog-round-item/nog-round-item.component';
import { NogRoundItem } from '@common/components/nog-specific/nog-round-item/nog-round-item.interface';
import { Autodestruction } from '@common/interfaces/autodestruction.interface';
import { ModalService } from '@common/services/modal/modal.service';
import { RoundTrackerEvent } from '@configs/nog-specific/round.config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-nog-round-tracker-section',
    standalone: true,
    imports: [
        NogRoundItemComponent,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        MatButton,
        TranslateModule,
    ],
    templateUrl: './nog-round-tracker-section.component.html',
    styleUrl: './nog-round-tracker-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NogRoundTrackerSectionComponent {

    @Input({ required: true }) public rounds: NogRoundItem[] = [];
    @Input({ required: true }) public activeRoundNum: number | undefined;
    @Input({ required: true }) public endRoundNum: number = 0;
    @Input({ required: true }) public autodestruction: Autodestruction | undefined;
    @Input({ required: true }) public hibernationRoundNum: number = 0;
    @Input({ required: false }) public enableMonsterEncounterAction: boolean = false;
    @Input({ required: false }) public monsterEncounterHappenedRoundNum: number | undefined;

    @Output() public roundTrackerEvent: EventEmitter<RoundTrackerEvent> = new EventEmitter<RoundTrackerEvent>();
    @Output() public monsterEncounter: EventEmitter<void> = new EventEmitter<void>();

    private readonly modalService: ModalService = inject(ModalService);

    protected onRoundTrackerEvent(event: RoundTrackerEvent): void {
        switch (event) {
            case 'end_the_game':
                this.modalService.openConfirmation({
                    titleKey: 'tk.round.label.event.end-the-game.warning-title',
                    messageKey: 'tk.round.label.event.end-the-game.warning-message',
                }).subscribe(result => {
                    if (result) {
                        this.roundTrackerEvent.emit(event);
                    }
                });
                break;
            default:
                this.roundTrackerEvent.emit(event);
        }
    }

}
