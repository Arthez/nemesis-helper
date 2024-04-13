import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DrawerContentComponent } from '@common/components/drawer/drawer-content/drawer-content.component';
import { GameSetupModalComponent } from '@common/components/start-game/game-setup-modal/game-setup-modal.component';
import { SaveWarningModalComponent } from '@common/components/start-game/save-warning-modal/save-warning-modal.component';
import { GameData, SelectGameComponent } from '@common/components/start-game/select-game/select-game.component';
import { SelectedGameSetupComponent } from '@common/components/start-game/selected-game-setup/selected-game-setup.component';
import { StorageManager } from '@common/utils/storage-manager.util';
import { GameConfig, gameConfigs, GameSetupData } from '@configs/games.config';
import { filter } from 'rxjs';

@Component({
    selector: 'app-start-game',
    standalone: true,
    imports: [
        SelectGameComponent,
        SelectedGameSetupComponent,
        MatDrawer,
        MatDrawerContainer,
        DrawerContentComponent,
    ],
    templateUrl: './start-game.component.html',
    styleUrl: './start-game.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartGameComponent {

    protected readonly selectedGame: WritableSignal<GameData | undefined> = signal(undefined);
    protected readonly showNewGameForm: WritableSignal<boolean> = signal(false);
    protected readonly games: GameData[] = Object.values(gameConfigs).map((config: GameConfig) => ({
        config,
        saveState: StorageManager.loadGameSetupData(config.id),
    }));
    private readonly router: Router = inject(Router);
    private readonly matDialog: MatDialog = inject(MatDialog);

    protected onSelectedGame(gameData: GameData): void {
        this.selectedGame.set(gameData);
    }

    protected setupNewGame(): void {
        const selectedGame: GameData | undefined = this.selectedGame();
        if (!selectedGame) {
            return;
        }
        if (selectedGame.saveState) {
            this.matDialog.open(SaveWarningModalComponent, {
                data: selectedGame.config,
                closeOnNavigation: true,
                hasBackdrop: true,
                panelClass: 'small-modal',
            }).afterClosed().pipe(filter(result => result)).subscribe(() => {
                this.showNewGameForm.set(true);
            });
        } else {
            this.showNewGameForm.set(true);
        }
    }

    protected loadSavedGame(): void {
        this.navigateToSelectedGame();
    }

    protected goBackToGameSelection(): void {
        this.showNewGameForm.set(false);
    }

    protected startNewGame(gameSetupData: GameSetupData): void {
        StorageManager.clearAllGameData(gameSetupData.gameId);
        StorageManager.saveGameSetupData(gameSetupData.gameId, gameSetupData);
        this.navigateToSelectedGame();
        this.matDialog.open(GameSetupModalComponent, {
            data: gameSetupData,
            closeOnNavigation: false,
            disableClose: true,
            hasBackdrop: true,
            panelClass: 'small-modal',
        });
    }

    private navigateToSelectedGame(): void {
        const selectedGame: GameData | undefined = this.selectedGame();
        if (selectedGame) {
            this.router.navigate([`game/${ selectedGame.config.path }`]);
        }
    }

}
