import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslationKey } from '@common/types/translation-key.type';
import { PowerSupplyStateConfig } from '@configs/nld-specific/power-supply.config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-nld-power-supply',
    standalone: true,
    imports: [
        TranslateModule,
    ],
    templateUrl: './nld-power-supply.component.html',
    styleUrl: './nld-power-supply.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NldPowerSupplyComponent {

    @Input({ required: true }) public powerSupplyStateConfig: PowerSupplyStateConfig | undefined;
    @Input({ required: true }) public powerSupplyTranslationKey: TranslationKey | undefined;

}
