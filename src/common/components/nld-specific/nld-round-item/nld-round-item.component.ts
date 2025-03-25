import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { backgroundColorAnimation } from '@common/animations/background-color.animation';
import { verticalShakeAnimation } from '@common/animations/vertical-shake.animation';
import { NldRoundItem } from '@common/components/nld-specific/nld-round-item/nld-round-item.interface';
import { Autodestruction } from '@common/interfaces/autodestruction.interface';
import { AutodestructionDisableRoundPipe } from '@common/pipes/autodestruction-disable-round/autodestruction-disable-round.pipe';
import { CssMoveSide } from '@common/types/css-move-side.type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-nld-round-item',
    standalone: true,
    imports: [
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        TranslateModule,
        NgClass,
        AutodestructionDisableRoundPipe,
        MatIcon,
    ],
    templateUrl: './nld-round-item.component.html',
    styleUrl: './nld-round-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        verticalShakeAnimation('launch', '1.5s'),
        backgroundColorAnimation('activePower', '1.5s', 'var(--inactive-power-color)', 'var(--active-power-color)'),
    ],
})
export class NldRoundItemComponent {

    @Input({ required: true }) public roundConfig: NldRoundItem | undefined;
    @Input({ required: true }) public activeRoundNum: number | undefined;
    @Input({ required: true }) public activePower: boolean = false;
    @Input({ required: true }) public endRoundNum: number = 0;
    @Input({ required: true }) public isolationRoomOpeningRoundNum: number = 0;
    @Input({ required: true }) public autodestruction: Autodestruction | undefined;
    @Input({ required: true }) public canMoveCssLeft: boolean = false;
    @Input({ required: true }) public canMoveCssRight: boolean = false;
    @Input({ required: false }) public isFirstRound: boolean = false;
    @Input({ required: false }) public monsterEncounterHappenedRoundNum: number | undefined;

    @Output() public cssMove: EventEmitter<CssMoveSide> = new EventEmitter<CssMoveSide>();

    public emitMoveCssLeft(): void {
        this.cssMove.emit('left');
    }

    public emitMoveCssRight(): void {
        this.cssMove.emit('right');
    }

}
