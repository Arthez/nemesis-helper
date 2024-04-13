import { Pipe, PipeTransform } from '@angular/core';

const millisecInSecond: number = 1000;
const sixty: number = 60;
const ten: number = 10;
const two: number = 2;

@Pipe({
    name: 'msToDuration',
    standalone: true,
})
export class MsToDurationPipe implements PipeTransform {

    public transform(value: number): string {
        let seconds: number = Math.floor(Math.abs(value) / millisecInSecond);
        let minutes: number = Math.floor(seconds / sixty);
        const hours: number = Math.floor(minutes / sixty);

        seconds = seconds % sixty;
        minutes = minutes % sixty;

        return `${
            hours.toString(ten).padStart(two, '0')
        }:${
            minutes.toString(ten).padStart(two, '0')
        }:${
            seconds.toString(ten).padStart(two, '0')
        }`;
    }

}
