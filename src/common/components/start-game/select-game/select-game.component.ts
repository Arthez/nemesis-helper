import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SelectGameTileComponent } from '@common/components/start-game/select-game-tile/select-game-tile.component';
import { GameConfig, GameSetupData } from '@configs/games.config';
import { TranslateModule } from '@ngx-translate/core';

export interface GameData {
    config: GameConfig;
    saveState?: GameSetupData;
}

@Component({
    selector: 'app-select-game',
    standalone: true,
    imports: [
        SelectGameTileComponent,
        TranslateModule,
        MatButton,
    ],
    templateUrl: './select-game.component.html',
    styleUrl: './select-game.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGameComponent {

    @Input({ required: true }) public games: GameData[] = [];
    @Input({ required: false }) public selectedGame: GameData | undefined = undefined;
    @Output() public readonly gameSelect: EventEmitter<GameData> = new EventEmitter<GameData>();
    @Output() public readonly setupGame: EventEmitter<void> = new EventEmitter<void>();
    @Output() public readonly loadGame: EventEmitter<void> = new EventEmitter<void>();

    protected onGameSelect(gameData: GameData): void {
        this.gameSelect.emit(gameData);
    }

    protected setupNewGame(): void {
        this.setupGame.emit();
    }

    protected loadSavedGame(): void {
        this.loadGame.emit();
    }

}
