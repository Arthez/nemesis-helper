import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { PhaseConfig } from '@common/interfaces/phase-config.interface';
import { PhaseStage } from '@common/interfaces/phase-stage.interface';
import { ModalService } from '@common/services/modal/modal.service';
import { KeyboardUtil } from '@common/utils/keyboard.util';
import { TranslateModule } from '@ngx-translate/core';
import { filter, Subscription } from 'rxjs';

@Component({
    selector: 'app-phases-section',
    standalone: true,
    imports: [
        TranslateModule,
        MatButton,
        NonFocusableDirective,
    ],
    templateUrl: './phases-section.component.html',
    styleUrl: './phases-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhasesSectionComponent<StageType extends string> implements OnInit, OnDestroy {

    @Input({ required: true }) public phasesConfig: PhaseConfig<StageType>[] = [];
    @Input({ required: true }) public activeStage: PhaseStage<StageType>['stageId'] | undefined;

    @Output() public stage: EventEmitter<PhaseStage<StageType>['stageId']> = new EventEmitter<PhaseStage<StageType>['stageId']>();

    private readonly modalService: ModalService = inject(ModalService);
    private readonly subSink: Subscription = new Subscription();

    public ngOnInit(): void {
        this.registerKeyboardListener();
    }

    public ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    protected nextStage(): void {
        const stages: PhaseStage<StageType>[] = this.phasesConfig.flatMap(phaseConfig => phaseConfig.stages);
        const activeIndex: number = stages.findIndex(stage => stage.stageId === this.activeStage);
        const nextStageIndex: number = activeIndex === stages.length - 1 ? 0 : activeIndex + 1;
        this.stage.emit(stages[nextStageIndex].stageId);
    }

    private registerKeyboardListener(): void {
        this.subSink.add(KeyboardUtil.getKeyboardEvent(['.'])
            .pipe(filter(() => !this.modalService.anyDialogOpened$$.value))
            .subscribe(() => {
                this.nextStage();
            }),
        );
    }
}
