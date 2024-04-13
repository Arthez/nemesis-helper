import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCard, MatCardImage } from '@angular/material/card';
import { backgroundColorAnimation } from '@common/animations/background-color.animation';
import { GameData } from '@common/components/start-game/select-game/select-game.component';
import { GameModeTkPipe } from '@common/pipes/game-mode-tk/game-mode-tk.pipe';
import { LanguageService } from '@common/services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-select-game-tile',
    standalone: true,
    imports: [TranslateModule, DatePipe, GameModeTkPipe, NgOptimizedImage, MatCardImage, MatCard],
    templateUrl: './select-game-tile.component.html',
    styleUrl: './select-game-tile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        backgroundColorAnimation('selectedTile', '300ms', 'rgba(var(--select-game-tile-overlay-color), 0.5)', 'var(--transparent)'),
    ],
})
export class SelectGameTileComponent {

    @Input({ required: true }) public gameData: GameData | undefined;
    @Input({ required: false }) public isSelected: boolean = false;
    @Output() public readonly selected: EventEmitter<GameData> = new EventEmitter<GameData>();

    protected readonly languageService: LanguageService = inject(LanguageService);

    protected onGameClicked(): void {
        if (this.gameData?.config.disabled) {
            return;
        }
        this.selected.emit(this.gameData);
    }

}
