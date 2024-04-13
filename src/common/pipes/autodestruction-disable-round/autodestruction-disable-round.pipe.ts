import { Pipe, PipeTransform } from '@angular/core';
import { Autodestruction } from '@common/interfaces/autodestruction.interface';

@Pipe({
    name: 'autodestructionDisableRound',
    standalone: true,
})
export class AutodestructionDisableRoundPipe implements PipeTransform {

    public transform(autodestruction: Autodestruction | undefined, roundNum: number): boolean {
        return !!autodestruction && autodestruction.state === 'red' && autodestruction.roundNum > roundNum;
    }

}
