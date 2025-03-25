import { inject, Injectable } from '@angular/core';
import { LogItem } from '@common/classes/logger.class';
import { FaqModalComponent, FaqModalData } from '@common/components/drawer/faq-modal/faq-modal.component';
import { KeyMomentsModalComponent, KeyMomentsModalData } from '@common/components/drawer/key-moments-modal/key-moments-modal.component';
import { LogsModalComponent, LogsModalData } from '@common/components/drawer/logs-modal/logs-modal.component';
import { ReloadModalComponent, ReloadModalData } from '@common/components/drawer/reload-modal/reload-modal.component';
import { RoomsModalComponent, RoomsModalData } from '@common/components/drawer/rooms-modal/rooms-modal.component';
import {
    MonsterDevelopmentModalComponent,
    MonsterDevelopmentModalData,
} from '@common/components/monsters/monster-development-modal/monster-development-modal.component';
import {
    MonsterSummaryModalComponent,
    MonsterSummaryModalData,
} from '@common/components/monsters/monster-summary/monster-summary-modal.component';
import {
    MonsterWarningModalComponent,
    MonsterWarningModalData,
} from '@common/components/monsters/monster-warning-modal/monster-warning-modal.component';
import {
    NldGameEndModalComponent,
    NlGameEndModalData,
} from '@common/components/nld-specific/nld-game-end-modal/nld-game-end-modal.component';
import { MonsterDevelopmentResult } from '@common/interfaces/monster-development-result.interface';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { ModalService, optionalActionModalConfig, requiredActionModalConfig } from '@common/services/modal/modal.service';
import { GAME_ID } from '@common/tokens/game-id.token';
import { GameKey, GameSetupDataLockdown } from '@configs/games.config';
import { getFaqConfig } from '@configs/nld-specific/faq.config';
import { getKeyMomentsConfig } from '@configs/nld-specific/key-moments.config';
import { monsterDevelopmentConfig } from '@configs/nld-specific/monster-token.config';
import { getRoomsConfig } from '@configs/nld-specific/rooms.config';
import { Observable } from 'rxjs';

@Injectable()
export class NemesisLockdownModalService {

    protected readonly modalService: ModalService = inject(ModalService);
    protected readonly gameId: GameKey = inject(GAME_ID);

    public openMonsterWarning(monster: MonsterTokenBase): Observable<boolean | undefined> {
        return this.modalService.openComponent<MonsterWarningModalComponent, MonsterWarningModalData>(MonsterWarningModalComponent, {
            ...requiredActionModalConfig,
            panelClass: 'small-modal',
            data: {
                titleKey: 'tk.nld.monsters-warning.title.draw',
                messageKey: 'tk.nld.monsters-warning.message.draw',
                yesButtonKey: 'tk.general.label.button.continue',
                showTokenBack: true,
                monster,
            },
        });
    }

    public openFirstEncounterWarning(): Observable<boolean> {
        return this.modalService.openConfirmation({
            titleKey: 'tk.nld.config.label.key-moment.first-encounter.title',
            messageKey: 'tk.nld.config.label.key-moment.first-encounter.message',
            yesButtonKey: 'tk.general.label.button.continue',
            noButtonKey: undefined,
        });
    }

    public openAddMonsterWarning(monster: MonsterTokenBase): Observable<boolean | undefined> {
        return this.modalService.openComponent<MonsterWarningModalComponent, MonsterWarningModalData>(MonsterWarningModalComponent, {
            ...requiredActionModalConfig,
            panelClass: 'small-modal',
            data: {
                titleKey: 'tk.nld.monsters-warning.title.add',
                messageKey: 'tk.nld.monsters-warning.message.add',
                yesButtonKey: 'tk.general.label.button.continue',
                monster,
            },
        });
    }

    public openMonsterDetails(monsters: {
        activeMonsters: MonsterTokenBase[];
        availableMonsters: MonsterTokenBase[];
        bagMonsters: MonsterTokenBase[];
    }): Observable<boolean | undefined> {
        return this.modalService.openComponent<MonsterSummaryModalComponent, MonsterSummaryModalData>(MonsterSummaryModalComponent, {
            ...optionalActionModalConfig,
            panelClass: 'medium-modal',
            data: {
                activeMonsters: monsters.activeMonsters,
                availableMonsters: monsters.availableMonsters,
                bagMonsters: monsters.bagMonsters,
                gameId: this.gameId,
            },
        });
    }

    public openKillMonsterWarning(monster: MonsterTokenBase): Observable<boolean | undefined> {
        return this.modalService.openComponent<MonsterWarningModalComponent, MonsterWarningModalData>(MonsterWarningModalComponent, {
            ...requiredActionModalConfig,
            panelClass: 'small-modal',
            data: {
                titleKey: 'tk.nld.monsters-warning.title.kill',
                messageKey: 'tk.nld.monsters-warning.message.kill',
                yesButtonKey: 'tk.general.label.button.yes',
                noButtonKey: 'tk.general.label.button.no',
                monster,
            },
        });
    }

    public openRetreatMonsterWarning(monster: MonsterTokenBase): Observable<boolean | undefined> {
        return this.modalService.openComponent<MonsterWarningModalComponent, MonsterWarningModalData>(MonsterWarningModalComponent, {
            ...requiredActionModalConfig,
            panelClass: 'small-modal',
            data: {
                titleKey: 'tk.nld.monsters-warning.title.retreat',
                messageKey: 'tk.nld.monsters-warning.message.retreat',
                yesButtonKey: 'tk.general.label.button.yes',
                noButtonKey: 'tk.general.label.button.no',
                monster,
            },
        });
    }

    public openIsolationRoomOpeningWarning(): Observable<boolean | undefined> {
        return this.modalService.openConfirmation({
            titleKey: 'tk.nld.config.label.key-moment.isolation-opening.title',
            messageKey: 'tk.nld.config.label.key-moment.isolation-opening.message',
            yesButtonKey: 'tk.general.label.button.continue',
            noButtonKey: undefined,
        });
    }

    public openInevitableAutodestructionWarning(): Observable<boolean | undefined> {
        return this.modalService.openConfirmation({
            titleKey: 'tk.nld.config.label.key-moment.inevitable-autodestruction.title',
            messageKey: 'tk.nld.config.label.key-moment.inevitable-autodestruction.message',
            yesButtonKey: 'tk.general.label.button.continue',
            noButtonKey: undefined,
        });
    }

    public openGameEndSummary(
        gameState: GameSetupDataLockdown,
        autodestructionHappened: boolean,
        alertProcedureActivated: boolean,
    ): Observable<boolean | undefined> {
        return this.modalService.openComponent<NldGameEndModalComponent, NlGameEndModalData>(NldGameEndModalComponent, {
            ...requiredActionModalConfig,
            panelClass: 'medium-modal',
            data: {
                ...gameState,
                autodestructionHappened,
                alertProcedureActivated,
            },
        });
    }

    public openSearchForRoom(): Observable<boolean | undefined> {
        return this.modalService.openComponent<RoomsModalComponent, RoomsModalData>(RoomsModalComponent, {
            ...optionalActionModalConfig,
            panelClass: 'large-modal',
            data: {
                roomGroups: getRoomsConfig(),
            },
        });
    }

    public openKeyMoments(): Observable<boolean | undefined> {
        return this.modalService.openComponent<KeyMomentsModalComponent, KeyMomentsModalData>(KeyMomentsModalComponent, {
            ...optionalActionModalConfig,
            panelClass: 'large-modal',
            data: {
                gameId: this.gameId,
                keyMoments: getKeyMomentsConfig(),
            },
        });
    }

    public openFaq(): Observable<boolean | undefined> {
        return this.modalService.openComponent<FaqModalComponent, FaqModalData>(FaqModalComponent, {
            ...optionalActionModalConfig,
            panelClass: 'large-modal',
            data: {
                gameId: this.gameId,
                faqGroups: getFaqConfig(),
            },
        });
    }

    public openLogs(logs: LogItem[]): Observable<boolean | undefined> {
        return this.modalService.openComponent<LogsModalComponent, LogsModalData>(LogsModalComponent, {
            ...optionalActionModalConfig,
            panelClass: 'medium-modal',
            data: {
                gameId: this.gameId,
                logs,
            },
        });
    }

    public openReload(logs: LogItem[]): Observable<boolean | undefined> {
        return this.modalService.openComponent<ReloadModalComponent, ReloadModalData>(ReloadModalComponent, {
            ...optionalActionModalConfig,
            panelClass: 'medium-modal',
            data: {
                gameId: this.gameId,
                logs,
            },
        });
    }

    public openPowerDropWarning(): Observable<boolean | undefined> {
        return this.modalService.openConfirmation({
            titleKey: 'tk.nld.config.label.power-thresholds.power-drop.title',
            messageKey: 'tk.nld.config.label.power-thresholds.power-drop.message',
            yesButtonKey: 'tk.general.label.button.continue',
            noButtonKey: undefined,
        });
    }

    public openMonsterDevelopmentResult(developmentResult: MonsterDevelopmentResult<MonsterTokenBase>): Observable<boolean | undefined> {
        return this.modalService.openComponent<MonsterDevelopmentModalComponent, MonsterDevelopmentModalData>(
            MonsterDevelopmentModalComponent,
            {
                ...requiredActionModalConfig,
                panelClass: 'small-modal',
                data: {
                    gameId: this.gameId,
                    developmentResult,
                    monsterDevelopmentConfig,
                },
            },
        );
    }

    public openExitWarning(): Observable<boolean | undefined> {
        return this.modalService.openConfirmation({
            titleKey: 'tk.exit-confirmation-modal.title',
            messageKey: 'tk.exit-confirmation-modal.message',
            yesButtonKey: 'tk.general.label.button.continue',
            noButtonKey: 'tk.general.label.button.back',
        });
    }

}
