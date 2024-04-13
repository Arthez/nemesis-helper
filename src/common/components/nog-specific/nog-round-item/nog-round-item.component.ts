import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NogRoundItem } from '@common/components/nog-specific/nog-round-item/nog-round-item.interface';
import { Autodestruction } from '@common/interfaces/autodestruction.interface';
import { AutodestructionDisableRoundPipe } from '@common/pipes/autodestruction-disable-round/autodestruction-disable-round.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-nog-round-item',
    standalone: true,
    imports: [
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        TranslateModule,
        NgClass,
        AutodestructionDisableRoundPipe,
    ],
    templateUrl: './nog-round-item.component.html',
    styleUrl: './nog-round-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NogRoundItemComponent {

    @Input({ required: true }) public roundConfig: NogRoundItem | undefined;
    @Input({ required: true }) public activeRoundNum: number | undefined;
    @Input({ required: true }) public endRoundNum: number = 0;
    @Input({ required: true }) public autodestruction: Autodestruction | undefined;
    @Input({ required: true }) public hibernationRoundNum: number = 0;

}
