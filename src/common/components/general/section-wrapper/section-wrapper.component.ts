import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslationKey } from '@common/types/translation-key.type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-section-wrapper',
    standalone: true,
    imports: [
        TranslateModule,
    ],
    templateUrl: './section-wrapper.component.html',
    styleUrl: './section-wrapper.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionWrapperComponent {

    @Input({ required: false }) public label: TranslationKey | undefined;
}
