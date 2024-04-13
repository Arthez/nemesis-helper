import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LogItem } from '@common/classes/logger.class';
import { MonstersSectionComponent } from '@common/components/common-game-sections/monsters-section/monsters-section.component';
import { PhasesSectionComponent } from '@common/components/common-game-sections/phases-section/phases-section.component';
import { PlayersSectionComponent } from '@common/components/common-game-sections/players-section/players-section.component';
import { SummarySectionComponent } from '@common/components/common-game-sections/summary-section/summary-section.component';
import { DrawerContentComponent } from '@common/components/drawer/drawer-content/drawer-content.component';
import { SectionWrapperComponent } from '@common/components/general/section-wrapper/section-wrapper.component';
import { NogRoundItem } from '@common/components/nog-specific/nog-round-item/nog-round-item.interface';
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
import { GameKey, GameSetupDataOriginal } from '@configs/games.config';
import { defaultMonsterBagConfig, getMonsterTokensConfig, MonsterTokenConfig } from '@configs/nog-specific/monster-token.config';
import { getPhasesConfig, Stage, stagesSummaryConfig } from '@configs/nog-specific/phases.config';
import { getRoundConfigs, RoundTrackerEvent } from '@configs/nog-specific/round.config';
import { filter } from 'rxjs';
import { NemesisOriginalLoggerService } from './nemesis-original-logger.service';
import { NemesisOriginalModalService } from './nemesis-original-modal.service';
import { NemesisOriginalState } from './nemesis-original-state.interface';

const initialStage: PhaseStage<Stage>['stageId'] = 'draw_cards';
const hibernationChambersOpeningRoundNum: number = 8;

@Component({
    selector: 'app-nemesis-original',
    standalone: true,
    imports: [
        DrawerContentComponent,
        PhasesSectionComponent,
        PlayersSectionComponent,
        SummarySectionComponent,
        MatDrawer,
        MatDrawerContainer,
        MonstersSectionComponent,
        NogRoundTrackerSectionComponent,
        SectionWrapperComponent,
    ],
    providers: [
        NemesisOriginalLoggerService,
        NemesisOriginalModalService,
        {
            provide: GAME_ID,
            useValue: 'nemesisOriginal',
        },
    ],
    templateUrl: './nemesis-original.component.html',
    styleUrl: './nemesis-original.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NemesisOriginalComponent {

    protected readonly nemesisOriginalModalService: NemesisOriginalModalService = inject(NemesisOriginalModalService);
    protected readonly nemesisOriginalLoggerService: NemesisOriginalLoggerService = inject(NemesisOriginalLoggerService);
    protected readonly monsterBagService: MonsterTokensService<MonsterTokenConfig> = inject(MonsterTokensService);
    protected readonly router: Router = inject(Router);
    protected readonly gameId: GameKey = inject(GAME_ID);

    protected readonly hibernationChambersOpeningRoundNum: number = hibernationChambersOpeningRoundNum;
    protected readonly gameSetupData: GameSetupDataOriginal | undefined = StorageManager.loadGameSetupData(this.gameId);
    protected readonly stateData: NemesisOriginalState | undefined = this.loadGameState();
    protected readonly phasesConfig: WritableSignal<PhaseConfig<Stage>[]> = signal(getPhasesConfig());
    protected readonly rounds: WritableSignal<NogRoundItem[]> = signal(this.stateData?.rounds || this.getInitialRounds());
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
    protected readonly autodestruction: WritableSignal<Autodestruction | undefined> = signal(this.stateData?.autodestruction || undefined);
    protected readonly summaryData: Signal<ContentItem> = computed(() => stagesSummaryConfig[this.activeStage()]);
    private monsterEncounterHappenedRoundNum: number | undefined = this.stateData?.monsterEncounterHappenedRoundNum;

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
        this.nemesisOriginalLoggerService.init(this.loadLogs(), () => this.activeRoundNum());
    }

    protected onRoundTrackerEvent(event: RoundTrackerEvent): void {
        switch (event) {
            case 'autodestruction_start':
                this.triggerAutodestruction(true);
                break;
            case 'autodestruction_stop':
                this.triggerAutodestruction(false);
                break;
            case 'end_the_game':
                this.showGameEndModal();
                break;
            default:
                break;
        }
    }

    protected onPlayerTimeChange(players: Player[]): void {
        const gameState: GameSetupDataOriginal | undefined = StorageManager.loadGameSetupData<GameSetupDataOriginal>(this.gameId);
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
                this.saveGameState();
                this.saveLogs();
                break;
            }
            case 'round_tracker_update': {
                this.incrementRoundTracker();
                break;
            }
            case 'monster_development': {
                this.triggerMonsterDevelopment();
                break;
            }
            default:
                break;
        }
    }

    protected drawMonster(): void {
        const monster: MonsterTokenConfig | undefined = this.monsterBagService.getMonsterEncounterFromBag();
        if (monster) {
            this.nemesisOriginalLoggerService.logMonsterEncounter(monster);
            this.nemesisOriginalModalService.openMonsterWarning(monster).subscribe(() => {
                if (monster.type !== MonsterType.BLANK && !this.monsterEncounterHappenedRoundNum) {
                    this.monsterEncounterHappenedRoundNum = this.activeRoundNum();
                    this.nemesisOriginalModalService.openFirstEncounterWarning();
                }
            });
        }
    }

    protected addMonster(monsterType: MonsterType): void {
        const monster: MonsterTokenConfig | undefined = this.monsterBagService.addMonsterToBag(monsterType);
        if (monster) {
            this.nemesisOriginalLoggerService.logMonsterAdd(monster);
            this.nemesisOriginalModalService.openAddMonsterWarning(monster);
        }
    }

    protected showMonstersDetails(): void {
        this.nemesisOriginalModalService.openMonsterDetails({
            activeMonsters: this.activeMonsters(),
            availableMonsters: this.availableMonsters(),
            bagMonsters: this.bagMonsters(),
        });
    }

    protected killMonster(monster: MonsterTokenBase): void {
        this.nemesisOriginalModalService.openKillMonsterWarning(monster).pipe(filter(result => !!result)).subscribe(() => {
            this.nemesisOriginalLoggerService.logMonsterKill(monster);
            this.monsterBagService.killMonster(monster.id);
        });
    }

    protected retreatMonster(monster: MonsterTokenBase): void {
        this.nemesisOriginalModalService.openRetreatMonsterWarning(monster).pipe(filter(result => !!result)).subscribe(() => {
            this.nemesisOriginalLoggerService.logMonsterRetreat(monster);
            this.monsterBagService.putMonsterBackToBag(monster.id);
        });
    }

    protected showGameEndModal(): void {
        const gameState: GameSetupDataOriginal | undefined = StorageManager.loadGameSetupData(this.gameId) || this.gameSetupData;
        if (gameState) {
            this.nemesisOriginalModalService.openGameEndSummary(
                gameState,
                !!this.autodestruction(),
            ).subscribe(() => {
                StorageManager.clearAllGameData(this.gameId);
                this.goToLandingPage();
            });
        }
    }

    protected openSearchRoomModal(): void {
        this.nemesisOriginalModalService.openSearchForRoom();
    }

    protected openKeyMomentsModal(): void {
        this.nemesisOriginalModalService.openKeyMoments();
    }

    protected openFaqModal(): void {
        this.nemesisOriginalModalService.openFaq();
    }

    protected openLogsModal(): void {
        this.nemesisOriginalModalService.openLogs(this.nemesisOriginalLoggerService.logs());
    }

    protected goToLandingPage(): void {
        this.router.navigate(['/']);
    }

    private getInitialRounds(): NogRoundItem[] {
        return getRoundConfigs();
    }

    private incrementRoundTracker(): void {
        const activeRoundNum: number = this.activeRoundNum();
        const nextRoundNum: number = activeRoundNum - 1;
        const wasLastRound: boolean = nextRoundNum <= this.endRoundNum();
        const autodestruction: Autodestruction | undefined = this.autodestruction();
        const baseExploded: boolean | undefined = autodestruction ?
            nextRoundNum <= autodestruction.roundNum && autodestruction.state === 'red' : false;
        this.nemesisOriginalLoggerService.logRoundChange(nextRoundNum);

        if (wasLastRound || baseExploded) {
            this.activeRoundNum.set(nextRoundNum);
            this.showGameEndModal();
            return;
        }
        if (nextRoundNum === autodestruction?.roundNum && autodestruction?.state === 'yellow') {
            this.triggerInevitableAutodestruction();
        }
        if (nextRoundNum === this.hibernationChambersOpeningRoundNum) {
            this.showHibernationChambersOpeningModal();
        }

        this.activeRoundNum.set(nextRoundNum);
    }

    private triggerMonsterDevelopment(): void {
        const developmentResult: MonsterDevelopmentResult<MonsterTokenConfig> = this.monsterBagService.triggerMonsterDevelopment();
        this.nemesisOriginalLoggerService.logMonsterDevelopment(developmentResult);
        this.nemesisOriginalModalService.openMonsterDevelopmentResult(developmentResult).subscribe(queenInNestConfirmed => {
            if (queenInNestConfirmed) {
                this.monsterEncounterHappenedRoundNum = this.activeRoundNum();
                this.monsterBagService.summonQueenInNest();
            }
        });
    }

    private showHibernationChambersOpeningModal(): void {
        this.nemesisOriginalModalService.openHibernationChambersOpeningWarning();
    }

    private triggerAutodestruction(start: boolean): void {
        if (this.autodestruction()?.state === 'red') {
            return;
        }
        if (start) {
            this.nemesisOriginalLoggerService.logAutodestructionStateChange(this.autodestruction()?.state, 'yellow');
            this.setAutodestruction('yellow');
        } else {
            this.nemesisOriginalLoggerService.logAutodestructionStateChange(this.autodestruction()?.state, undefined);
            this.setAutodestruction(undefined);
        }
    }

    private triggerInevitableAutodestruction(): void {
        this.setAutodestruction('red');
        this.nemesisOriginalModalService.openInevitableAutodestructionWarning();
        this.nemesisOriginalLoggerService.logAutodestructionStateInevitable();
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
        StorageManager.saveGameState<NemesisOriginalState>(this.gameId, {
            rounds: this.rounds(),
            endRoundNum: this.endRoundNum(),
            activeRoundNum: this.activeRoundNum(),
            activeStage: this.activeStage(),
            activeMonsters: this.activeMonsters(),
            availableMonsters: this.availableMonsters(),
            bagMonsters: this.bagMonsters(),
            autodestruction: this.autodestruction(),
            monsterEncounterHappenedRoundNum: this.monsterEncounterHappenedRoundNum,
        });
        this.nemesisOriginalLoggerService.logSaveGameState();
    }

    private loadGameState(): NemesisOriginalState | undefined {
        return StorageManager.loadGameState<NemesisOriginalState>(this.gameId);
    }

    private saveLogs(): void {
        StorageManager.saveGameLogs(this.gameId, this.nemesisOriginalLoggerService.logs());
    }

    private loadLogs(): LogItem[] {
        return StorageManager.loadGameLogs(this.gameId) || [];
    }

}
