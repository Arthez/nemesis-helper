import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Player } from '@common/interfaces/player.interface';
import { MsToDurationPipe } from '@common/pipes/ms-to-duration/ms-to-duration.pipe';
import { ModalService } from '@common/services/modal/modal.service';
import { KeyboardUtil } from '@common/utils/keyboard.util';
import { Subscription } from 'rxjs';

interface Timer {
    player?: Player;
    intervalRef?: number;
}

const timerIntervalMs: number = 1000;

@Component({
    selector: 'app-players-section',
    standalone: true,
    imports: [
        MatButton,
        MsToDurationPipe,
    ],
    templateUrl: './players-section.component.html',
    styleUrl: './players-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersSectionComponent implements OnInit, OnDestroy {

    @Input({ required: true }) public players: Player[] = [];
    @Input({ required: false }) public timerEnabled: boolean = false;

    @Output() public playerTimeChanged: EventEmitter<Player[]> = new EventEmitter<Player[]>();

    protected playersData: WritableSignal<Player[]> = signal([]);
    protected timer: WritableSignal<Timer> = signal({});
    private readonly modalService: ModalService = new ModalService();
    private readonly subSink: Subscription = new Subscription();

    public ngOnInit(): void {
        this.playersData.set(this.players.map(player => ({ ...player })));
        if (this.timerEnabled) {
            this.registerKeyboardListener();
        }
    }

    public ngOnDestroy(): void {
        clearInterval(this.timer().intervalRef);
        this.subSink.unsubscribe();
    }

    protected togglePlayerTimer(playerNum: Player['num']): void {
        if (!this.timerEnabled) {
            return;
        }

        const playerData: Player | undefined = this.playersData().find(data => data.num === playerNum);
        if (playerData) {
            const timer: Timer = this.timer();
            if (timer.intervalRef) {
                if (playerData.num !== timer.player?.num) {
                    this.stopTimer();
                    this.startTimer(playerData);
                } else {
                    this.stopTimer();
                }
            } else {
                this.startTimer(playerData);
            }
        }
    }

    private startTimer(player: Player): void {
        this.timer.set({
            player,
            intervalRef: setInterval(() => {
                if (!this.modalService.anyDialogOpened$$.value) {
                    player.timeUsedMs = player.timeUsedMs + timerIntervalMs;
                    this.playersData.update(data => [...data]);
                    this.playerTimeChanged.emit(this.playersData());
                }
            }, timerIntervalMs),
        });
    }

    private stopTimer(): void {
        clearInterval(this.timer().intervalRef);
        this.timer.set({});
    }

    private registerKeyboardListener(): void {
        const keyboardKeys: string[] = this.timerEnabled ? this.players.map(player => `${ player.num }`) : [];
        this.subSink.add(KeyboardUtil.getKeyboardEvent(keyboardKeys).subscribe(keyboardEvent => {
            this.togglePlayerTimer(Number.parseInt(keyboardEvent.key, 10));
        }));
    }

}
