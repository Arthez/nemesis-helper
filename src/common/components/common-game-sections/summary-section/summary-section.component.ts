import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContentItem } from '@common/interfaces/content-item.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-summary-section',
    standalone: true,
    imports: [
        TranslateModule,
        NgClass,
    ],
    templateUrl: './summary-section.component.html',
    styleUrl: './summary-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummarySectionComponent {

    @Input({ required: true }) public summary: ContentItem | undefined;

}
