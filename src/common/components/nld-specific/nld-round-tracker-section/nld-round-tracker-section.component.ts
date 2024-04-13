import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NldRoundItemComponent } from '@common/components/nld-specific/nld-round-item/nld-round-item.component';
import { NldRoundItem } from '@common/components/nld-specific/nld-round-item/nld-round-item.interface';
import { Autodestruction } from '@common/interfaces/autodestruction.interface';
import { PlayerActionsDisablePipe } from '@common/pipes/player-actions-disable/player-actions-disable.pipe';
import { ModalService } from '@common/services/modal/modal.service';
import { CssMoveSide } from '@common/types/css-move-side.type';
import { Stage } from '@configs/nld-specific/phases.config';
import { RoundTrackerEvent } from '@configs/nld-specific/round.config';
import { TranslateModule } from '@ngx-translate/core';

export interface CssMoveEvent {
    side: CssMoveSide;
    roundConfig: NldRoundItem;
}

@Component({
    selector: 'app-nld-round-tracker-section',
    standalone: true,
    imports: [
        NldRoundItemComponent,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        MatButton,
        TranslateModule,
        PlayerActionsDisablePipe,
    ],
    templateUrl: './nld-round-tracker-section.component.html',
    styleUrl: './nld-round-tracker-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NldRoundTrackerSectionComponent {

    @Input({ required: true }) public rounds: NldRoundItem[] = [];
    @Input({ required: true }) public activeStage: Stage | undefined;
    @Input({ required: true }) public activeRoundNum: number | undefined;
    @Input({ required: true }) public activePower: boolean = false;
    @Input({ required: true }) public endRoundNum: number = 0;
    @Input({ required: true }) public autodestruction: Autodestruction | undefined;
    @Input({ required: true }) public alertProcedureActivatedRoundNum: number | undefined;
    @Input({ required: true }) public isolationRoomOpeningRoundNum: number = 0;

    @Output() public roundTrackerEvent: EventEmitter<RoundTrackerEvent> = new EventEmitter<RoundTrackerEvent>();
    @Output() public cssMoveEvent: EventEmitter<CssMoveEvent> = new EventEmitter<CssMoveEvent>();

    protected readonly allowedStages: Stage[] = ['draw_cards', 'first_player_transfer', 'player_actions'];
    private readonly modalService: ModalService = inject(ModalService);

    protected canMoveCssLeft(roundIndex: number, round: NldRoundItem): boolean {
        if (round.css?.launched) {
            return false;
        }
        const lastRoundIndex: number = this.rounds.length - 1;
        if (roundIndex >= lastRoundIndex || roundIndex < 1 || !this.activeRoundNum) {
            return false;
        }
        return !this.rounds[roundIndex - 1].css && (round.num + 1 < this.activeRoundNum);
    }

    protected canMoveCssRight(roundIndex: number, round: NldRoundItem): boolean {
        if (round.css?.launched) {
            return false;
        }
        const lastRoundIndex: number = this.rounds.length - 1;
        if (roundIndex >= lastRoundIndex || roundIndex < 1 || !this.activeRoundNum || round.num >= this.activeRoundNum) {
            return false;
        }
        return !this.rounds[roundIndex + 1].css && (roundIndex < lastRoundIndex - 1);
    }

    protected onCssMoveEvent(side: CssMoveSide, roundConfig: NldRoundItem): void {
        this.cssMoveEvent.emit({ side, roundConfig });
    }

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
            case 'alert_procedure_trigger':
                this.modalService.openConfirmation({
                    titleKey: 'tk.nld.round.label.event.alert-procedure.warning-title',
                    messageKey: 'tk.nld.round.label.event.alert-procedure.warning-message',
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
