import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { GlobalLoaderService } from '@common/services/global-loader/global-loader.service';

@Component({
    selector: 'app-app-loader',
    standalone: true,
    imports: [
        MatProgressSpinner,
    ],
    templateUrl: './app-loader.component.html',
    styleUrl: './app-loader.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLoaderComponent {
    protected readonly globalLoader: GlobalLoaderService = inject(GlobalLoaderService);
}
