import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslationKey } from '@common/types/translation-key.type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-info-tooltip',
    standalone: true,
    imports: [
        MatIcon,
        MatTooltip,
        TranslateModule,
    ],
    templateUrl: './info-tooltip.component.html',
    styleUrl: './info-tooltip.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoTooltipComponent {
    @Input({ required: true }) public textKey!: TranslationKey;
}
