import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LogItem } from '@common/classes/logger.class';
import { MonstersSectionComponent } from '@common/components/common-game-sections/monsters-section/monsters-section.component';
import { PhasesSectionComponent } from '@common/components/common-game-sections/phases-section/phases-section.component';
import { PlayersSectionComponent } from '@common/components/common-game-sections/players-section/players-section.component';
import { SummarySectionComponent } from '@common/components/common-game-sections/summary-section/summary-section.component';
import { DrawerContentComponent } from '@common/components/drawer/drawer-content/drawer-content.component';
import { SectionWrapperComponent } from '@common/components/general/section-wrapper/section-wrapper.component';
import { NldRoundItem } from '@common/components/nld-specific/nld-round-item/nld-round-item.interface';
import {
    CssMoveEvent,
    NldRoundTrackerSectionComponent,
} from '@common/components/nld-specific/nld-round-tracker-section/nld-round-tracker-section.component';
import {
    NogRoundTrackerSectionComponent,
} from '@common/components/nog-specific/nog-round-tracker-section/nog-round-tracker-section.component';
import { MonsterType } from '@common/enums/monster-types.enum';
import { Autodestruction } from '@common/interfaces/autodestruction.interface';
import { ContentItem } from '@common/interfaces/content-item.interface';
import { MonsterDevelopmentResult } from '@common/interfaces/monster-development-result.interface';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { PhaseConfig } from '@common/interfaces/phase-config.interface';
import { PhaseStage } from '@common/interfaces/phase-stage.interface';
import { Player } from '@common/interfaces/player.interface';
import { MonsterTokensService } from '@common/services/monster-tokens/monster-tokens.service';
import { GAME_ID } from '@common/tokens/game-id.token';
import { numberOrFallback } from '@common/utils/number-or-fallback.util';
import { StorageManager } from '@common/utils/storage-manager.util';
import { GameKey, GameSetupDataLockdown } from '@configs/games.config';
import { defaultMonsterBagConfig, getMonsterTokensConfig, MonsterTokenConfig } from '@configs/nld-specific/monster-token.config';
import { getPhasesConfig, Stage, stagesSummaryConfig } from '@configs/nld-specific/phases.config';
import { PowerSupplyState } from '@configs/nld-specific/power-supply.config';
import { getRoundConfigs, RoundTrackerEvent } from '@configs/nld-specific/round.config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { NemesisLockdownLoggerService } from './nemesis-lockdown-logger.service';
import { NemesisLockdownModalService } from './nemesis-lockdown-modal.service';
import { NemesisLockdownState } from './nemesis-lockdown-state.interface';

const initialStage: PhaseStage<Stage>['stageId'] = 'draw_cards';
const isolationRoomOpeningRoundNum: number = 8;

@Component({
    selector: 'app-nemesis-lockdown',
    standalone: true,
    imports: [
        NldRoundTrackerSectionComponent,
        PlayersSectionComponent,
        PhasesSectionComponent,
        SummarySectionComponent,
        MonstersSectionComponent,
        SectionWrapperComponent,
        DrawerContentComponent,
        TranslateModule,
        RouterLink,
        MatDrawerContainer,
        MatDrawer,
        MatButton,
        NogRoundTrackerSectionComponent,
    ],
    providers: [
        NemesisLockdownModalService,
        NemesisLockdownLoggerService,
        {
            provide: GAME_ID,
            useValue: 'nemesisLockdown',
        },
    ],
    templateUrl: './nemesis-lockdown.component.html',
    styleUrl: './nemesis-lockdown.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NemesisLockdownComponent {

    protected readonly nemesisLockdownModalService: NemesisLockdownModalService = inject(NemesisLockdownModalService);
    protected readonly nemesisLockdownLoggerService: NemesisLockdownLoggerService = inject(NemesisLockdownLoggerService);
    protected readonly monsterBagService: MonsterTokensService<MonsterTokenConfig> = inject(MonsterTokensService);
    protected readonly translateService: TranslateService = inject(TranslateService);
    protected readonly matSnackBar: MatSnackBar = inject(MatSnackBar);
    protected readonly router: Router = inject(Router);
    protected readonly gameId: GameKey = inject(GAME_ID);

    protected readonly isolationRoomOpeningRoundNum: number = isolationRoomOpeningRoundNum;
    protected readonly gameSetupData: GameSetupDataLockdown | undefined = StorageManager.loadGameSetupData(this.gameId);
    protected readonly stateData: NemesisLockdownState | undefined = this.loadGameState();
    protected readonly monstersEnabled: boolean = !this.gameSetupData?.monstersDisabled;
    protected readonly phasesConfig: WritableSignal<PhaseConfig<Stage>[]> = signal(getPhasesConfig());
    protected readonly rounds: WritableSignal<NldRoundItem[]> = signal(this.stateData?.rounds || this.getInitialRounds());
    protected readonly endRoundNum: WritableSignal<number> = signal(
        numberOrFallback(this.stateData?.endRoundNum, this.rounds()[this.rounds().length - 1].num),
    );
    protected readonly activeRoundNum: WritableSignal<number> = signal(
        numberOrFallback(this.stateData?.activeRoundNum, this.rounds()[0].num),
    );
    protected readonly activeStage: WritableSignal<PhaseStage<Stage>['stageId']> = signal(this.stateData?.activeStage || initialStage);
    protected readonly activeMonsters: Signal<MonsterTokenConfig[]> = this.monsterBagService.activeMonsters;
    protected readonly availableMonsters: Signal<MonsterTokenConfig[]> = this.monsterBagService.availableMonsters;
    protected readonly bagMonsters: Signal<MonsterTokenConfig[]> = this.monsterBagService.bagMonsters;
    protected readonly powerState: WritableSignal<PowerSupplyState> = signal(this.stateData?.powerState || PowerSupplyState.INACTIVE);
    protected readonly autodestruction: WritableSignal<Autodestruction | undefined> = signal(this.stateData?.autodestruction || undefined);
    protected readonly alertProcedureActivatedRoundNum: WritableSignal<number | undefined> = signal(
        numberOrFallback(this.stateData?.alertProcedureActivatedRoundNum, undefined),
    );
    protected readonly summaryData: Signal<ContentItem> = computed(() => stagesSummaryConfig[this.activeStage()]);
    protected monsterEncounterHappenedRoundNum: number | undefined = this.stateData?.monsterEncounterHappenedRoundNum;

    public constructor() {
        if (this.stateData) {
            this.monsterBagService.loadBags(this.stateData);
        } else {
            this.monsterBagService.initMonsters(
                defaultMonsterBagConfig,
                getMonsterTokensConfig(),
                this.gameSetupData?.players.length || 0,
            );
        }
        this.nemesisLockdownLoggerService.init(this.loadLogs(), () => this.activeRoundNum());
    }


    protected onCssMoveEvent(event: CssMoveEvent): void {
        if (event) {
            const rounds: NldRoundItem[] = this.rounds();
            const eventRoundIndex: number = rounds.findIndex(round => round.num === event.roundConfig.num);
            const moveIndex: number = (event.side === 'right' ? 1 : -1) + eventRoundIndex;
            if (eventRoundIndex >= 0 && moveIndex > 0 && moveIndex < rounds.length - 1) {
                this.nemesisLockdownLoggerService.logCssMove(event, rounds[moveIndex].num);
                rounds[moveIndex].css = rounds[eventRoundIndex].css;
                rounds[eventRoundIndex].css = undefined;
                this.rounds.set(rounds);
            }
        }
    }

    protected onRoundTrackerEvent(event: RoundTrackerEvent): void {
        switch (event) {
            case 'power_turn_on':
                this.triggerPowerStateChange(PowerSupplyState.ACTIVE);
                break;
            case 'power_turn_off':
                this.triggerPowerStateChange(PowerSupplyState.INACTIVE);
                break;
            case 'autodestruction_start':
                this.triggerAutodestruction(true);
                break;
            case 'autodestruction_stop':
                this.triggerAutodestruction(false);
                break;
            case 'alert_procedure_trigger':
                this.triggerAlertProcedure();
                break;
            case 'end_the_game':
                this.showGameEndModal();
                break;
            default:
                break;
        }
    }

    protected onPlayerTimeChange(players: Player[]): void {
        const gameState: GameSetupDataLockdown | undefined = StorageManager.loadGameSetupData<GameSetupDataLockdown>(this.gameId);
        if (gameState) {
            StorageManager.saveGameSetupData(this.gameId, {
                ...gameState,
                players,
            });
        }
    }

    protected onStageChange(stage: PhaseStage<Stage>['stageId']): void {
        this.activeStage.set(stage);
        switch (stage) {
            case 'draw_cards': {
                this.saveGame();
                break;
            }
            case 'launch_css': {
                this.launchCssIfAvailable();
                break;
            }
            case 'round_tracker_update': {
                this.incrementRoundTracker();
                break;
            }
            case 'monster_development': {
                if (this.monstersEnabled) {
                    this.triggerMonsterDevelopment();
                }
                break;
            }
            default:
                break;
        }
    }

    protected drawMonster(monsterType: MonsterType | null): void {
        const monster: MonsterTokenConfig | undefined = this.monsterBagService.getMonsterEncounterFromBag(monsterType);
        if (monster) {
            this.nemesisLockdownLoggerService.logMonsterEncounter(monster);
            this.nemesisLockdownModalService.openMonsterWarning(monster).subscribe(() => {
                if (monster.type !== MonsterType.BLANK && !this.monsterEncounterHappenedRoundNum) {
                    this.handleFirstMonsterEncounter();
                }
            });
        }
    }

    protected addMonster(monsterType: MonsterType): void {
        const monster: MonsterTokenConfig | undefined = this.monsterBagService.addMonsterToBag(monsterType);
        if (monster) {
            this.nemesisLockdownLoggerService.logMonsterAdd(monster);
            this.nemesisLockdownModalService.openAddMonsterWarning(monster);
        }
    }

    protected showMonstersDetails(): void {
        this.nemesisLockdownModalService.openMonsterDetails({
            activeMonsters: this.activeMonsters(),
            availableMonsters: this.availableMonsters(),
            bagMonsters: this.bagMonsters(),
        });
    }

    protected killMonster(monster: MonsterTokenBase): void {
        this.nemesisLockdownModalService.openKillMonsterWarning(monster).pipe(filter(result => !!result)).subscribe(() => {
            this.nemesisLockdownLoggerService.logMonsterKill(monster);
            this.monsterBagService.killMonster(monster.id);
        });
    }

    protected retreatMonster(monster: MonsterTokenBase): void {
        this.nemesisLockdownModalService.openRetreatMonsterWarning(monster).pipe(filter(result => !!result)).subscribe(() => {
            this.nemesisLockdownLoggerService.logMonsterRetreat(monster);
            this.monsterBagService.putMonsterBackToBag(monster.id);
        });
    }

    protected handleFirstMonsterEncounter(): void {
        this.monsterEncounterHappenedRoundNum = this.activeRoundNum();
        this.nemesisLockdownModalService.openFirstEncounterWarning();
    }

    protected showGameEndModal(): void {
        const gameState: GameSetupDataLockdown | undefined = StorageManager.loadGameSetupData(this.gameId) || this.gameSetupData;
        if (gameState) {
            this.nemesisLockdownModalService.openGameEndSummary(
                gameState,
                !!this.autodestruction(),
                !!this.alertProcedureActivatedRoundNum(),
            ).subscribe(() => {
                StorageManager.clearAllGameData(this.gameId);
                this.goToLandingPage();
            });
        }
    }

    protected openSearchRoomModal(): void {
        this.nemesisLockdownModalService.openSearchForRoom();
    }

    protected openKeyMomentsModal(): void {
        this.nemesisLockdownModalService.openKeyMoments();
    }

    protected openFaqModal(): void {
        this.nemesisLockdownModalService.openFaq();
    }

    protected openLogsModal(): void {
        this.nemesisLockdownModalService.openLogs(this.nemesisLockdownLoggerService.logs());
    }

    protected openReloadGameModal(): void {
        this.nemesisLockdownModalService.openReload(this.nemesisLockdownLoggerService.logs()).subscribe(result => {
            if (result) {
                window.location.reload();
            }
        });
    }

    protected goToLandingPage(): void {
        this.router.navigate(['/']);
    }

    private getInitialRounds(): NldRoundItem[] {
        return getRoundConfigs().map(config => ({
            num: config.num,
            powerActive: config.powerActive,
            powerInactive: config.powerInactive,
            ...(config.cssSlotNum ? { css: { slotNum: config.cssSlotNum, launched: false } } : {}),
        }));
    }

    // eslint-disable-next-line max-statements,complexity
    private incrementRoundTracker(): void {
        const activeRoundNum: number = this.activeRoundNum();
        const nextRoundNum: number = activeRoundNum - 1;
        const wasLastRound: boolean = nextRoundNum <= this.endRoundNum();
        const autodestruction: Autodestruction | undefined = this.autodestruction();
        const baseExploded: boolean | undefined = activeRoundNum === autodestruction?.roundNum && autodestruction?.state === 'red';
        this.nemesisLockdownLoggerService.logRoundChange(nextRoundNum);

        if (wasLastRound || baseExploded) {
            this.activeRoundNum.set(nextRoundNum);
            this.showGameEndModal();
            return;
        }
        const nextRound: NldRoundItem | undefined = this.rounds().find(round => round.num === nextRoundNum);
        if (
            (this.powerState() === PowerSupplyState.INACTIVE && nextRound?.powerInactive) ||
            (this.powerState() === PowerSupplyState.ACTIVE && nextRound?.powerActive)
        ) {
            this.nemesisLockdownModalService.openPowerDropWarning();
            this.nemesisLockdownLoggerService.logPowerDrop(this.powerState());
        }
        if (nextRoundNum === autodestruction?.roundNum && autodestruction?.state === 'yellow') {
            this.triggerInevitableAutodestruction();
        }
        if (nextRoundNum === this.isolationRoomOpeningRoundNum && !this.alertProcedureActivatedRoundNum()) {
            this.showIsolationRoomOpeningModal();
        }

        this.activeRoundNum.set(nextRoundNum);
    }

    private launchCssIfAvailable(): void {
        const activeRound: number = this.activeRoundNum();
        const rounds: NldRoundItem[] = this.rounds();
        const activeRoundIndex: number = rounds.findIndex(round => round.num === activeRound);
        const activeRoundItem: NldRoundItem | undefined = rounds[activeRoundIndex];
        if (activeRoundItem?.css) {
            const slotNum: number = activeRoundItem.css.slotNum;
            rounds[activeRoundIndex] = { ...rounds[activeRoundIndex], css: { slotNum, launched: true } };
            this.nemesisLockdownLoggerService.logCssLaunch(slotNum);
            this.rounds.set(rounds);
        }
    }

    private triggerMonsterDevelopment(): void {
        const developmentResult: MonsterDevelopmentResult<MonsterTokenConfig> = this.monsterBagService.triggerMonsterDevelopment();
        this.nemesisLockdownLoggerService.logMonsterDevelopment(developmentResult);
        this.nemesisLockdownModalService.openMonsterDevelopmentResult(developmentResult).subscribe(queenInNestConfirmed => {
            if (queenInNestConfirmed) {
                this.monsterEncounterHappenedRoundNum = this.activeRoundNum();
                this.monsterBagService.summonQueenInNest();
            }
        });
    }

    private showIsolationRoomOpeningModal(): void {
        this.nemesisLockdownModalService.openIsolationRoomOpeningWarning();
    }

    private triggerAlertProcedure(): void {
        if (this.alertProcedureActivatedRoundNum()) {
            return;
        }
        const activeRoundNum: number = this.activeRoundNum();
        this.alertProcedureActivatedRoundNum.set(activeRoundNum);
        this.nemesisLockdownLoggerService.logAlertProcedureActivated();
        const endRoundNum: number = Math.floor(activeRoundNum / 2) - 1;
        this.endRoundNum.set(endRoundNum < 0 ? 0 : endRoundNum);
        this.showIsolationRoomOpeningModal();
    }

    private triggerPowerStateChange(state: PowerSupplyState): void {
        this.nemesisLockdownLoggerService.logPowerStateChange(this.powerState(), state);
        this.powerState.set(state);
    }

    private triggerAutodestruction(start: boolean): void {
        if (this.autodestruction()?.state === 'red') {
            return;
        }
        if (start) {
            this.nemesisLockdownLoggerService.logAutodestructionStateChange(this.autodestruction()?.state, 'yellow');
            this.setAutodestruction('yellow');
        } else {
            this.nemesisLockdownLoggerService.logAutodestructionStateChange(this.autodestruction()?.state, undefined);
            this.setAutodestruction(undefined);
        }
    }

    private triggerInevitableAutodestruction(): void {
        this.setAutodestruction('red');
        this.nemesisLockdownModalService.openInevitableAutodestructionWarning();
        this.nemesisLockdownLoggerService.logAutodestructionStateInevitable();
    }

    private setAutodestruction(state: Autodestruction['state'] | undefined): void {
        if (!state) {
            this.autodestruction.set(undefined);
            return;
        }
        const yellowTimeShift: number = 3;
        const redTimeShift: number = 4;
        const roundNumToken: number = this.activeRoundNum() - (state === 'red' ? redTimeShift : yellowTimeShift);
        this.autodestruction.set({ state, roundNum: roundNumToken < 0 ? 0 : roundNumToken });
    }

    private saveGameState(): void {
        StorageManager.saveGameState<NemesisLockdownState>(this.gameId, {
            dateIso: (new Date()).toISOString(),
            rounds: this.rounds(),
            endRoundNum: this.endRoundNum(),
            activeRoundNum: this.activeRoundNum(),
            activeStage: this.activeStage(),
            activeMonsters: this.activeMonsters(),
            availableMonsters: this.availableMonsters(),
            bagMonsters: this.bagMonsters(),
            powerState: this.powerState(),
            autodestruction: this.autodestruction(),
            alertProcedureActivatedRoundNum: this.alertProcedureActivatedRoundNum(),
            monsterEncounterHappenedRoundNum: this.monsterEncounterHappenedRoundNum,
        });
        this.nemesisLockdownLoggerService.logSaveGameState();
    }

    private loadGameState(): NemesisLockdownState | undefined {
        return StorageManager.loadGameState<NemesisLockdownState>(this.gameId);
    }

    private saveLogs(): void {
        StorageManager.saveGameLogs(this.gameId, this.nemesisLockdownLoggerService.logs());
    }

    private loadLogs(): LogItem[] {
        return StorageManager.loadGameLogs(this.gameId) || [];
    }

    private notifyAboutSave(): void {
        this.matSnackBar.open(this.translateService.instant('tk.notification.game-saved'), undefined, { duration: 3000 });
    }

    private saveGame(): void {
        this.saveGameState();
        this.saveLogs();
        this.notifyAboutSave();
    }

}
