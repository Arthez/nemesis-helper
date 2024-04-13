import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NonFocusableDirective } from '@common/directives/non-focusable.directive';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about-modal',
    standalone: true,
    imports: [
        MatButton,
        NonFocusableDirective,
        TranslateModule,
    ],
    templateUrl: './about-modal.component.html',
    styleUrl: './about-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutModalComponent {
    protected readonly appVer: string = environment.appVer;
}
