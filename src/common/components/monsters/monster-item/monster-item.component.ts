import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { ImageUrlPipe } from '@common/pipes/image-url/image-url.pipe';
import { MonsterTypeTkPipe } from '@common/pipes/monster-type-tk/monster-type-tk.pipe';
import { TranslateModule } from '@ngx-translate/core';

const flipTimeMs: number = 3000;

interface MonsterToken extends MonsterTokenBase {
    powerActive?: number;
    powerInactive?: number;
    surprise?: number;
}

@Component({
    selector: 'app-monster-item',
    standalone: true,
    imports: [
        NgOptimizedImage,
        MonsterTypeTkPipe,
        TranslateModule,
        ImageUrlPipe,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        MatIcon,
    ],
    templateUrl: './monster-item.component.html',
    styleUrl: './monster-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonsterItemComponent {

    @Input({ required: true }) public monster: MonsterToken | undefined;
    @Input({ required: false }) public showName: boolean = true;
    @Input({ required: false }) public showMenu: boolean = false;

    @Input({ required: false })
    public set flipped(flipped: boolean) {
        this.clearRotationTimeout();
        this.flippedS.set(flipped);
    }

    @Output() public kill: EventEmitter<MonsterTokenBase> = new EventEmitter<MonsterTokenBase>();
    @Output() public retreat: EventEmitter<MonsterTokenBase> = new EventEmitter<MonsterTokenBase>();

    protected readonly flippedS: WritableSignal<boolean> = signal(false);
    protected readonly monsterType: typeof MonsterType = MonsterType;
    private timeoutRef: number | undefined;

    protected onRotate(): void {
        this.clearRotationTimeout();
        const flipped: boolean = this.flippedS();

        if (!flipped) {
            this.timeoutRef = setTimeout(() => {
                this.flippedS.set(false);
            }, flipTimeMs);
        }
        this.flippedS.set(!flipped);
    }

    private clearRotationTimeout(): void {
        clearTimeout(this.timeoutRef);
        this.timeoutRef = undefined;
    }

}
