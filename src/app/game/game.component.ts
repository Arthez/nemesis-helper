import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [
        RouterOutlet,
    ],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {

}
