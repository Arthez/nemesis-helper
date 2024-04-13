import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'playerActionsDisable',
    standalone: true,
})
export class PlayerActionsDisablePipe implements PipeTransform {

    public transform<Stage extends string>(stage: Stage | undefined, allowedStages: Stage[]): boolean {
        return stage ? !allowedStages.includes(stage) : true;
    }

}
