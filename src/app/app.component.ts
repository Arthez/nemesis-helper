import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInitErrorComponent } from '@common/components/general/app-init-error/app-init-error.component';
import { AppLoaderComponent } from '@common/components/general/app-loader/app-loader.component';
import { AppInitializerService } from '@common/services/app-initializer/app-initializer.service';
import { IconRegistryService } from '@common/services/icon-registry/icon-registry.service';
import { PwaUpdateService } from '@common/services/pwa-update/pwa-update.service';
import { ScreenWakeLockerService } from '@common/services/screen-wake-locker/screen-wake-locker.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        HttpClientModule,
        AppLoaderComponent,
        AppInitErrorComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

    protected readonly appInitializerService: AppInitializerService = inject(AppInitializerService);
    protected readonly iconRegistryService: IconRegistryService = inject(IconRegistryService);
    protected readonly screenWakeLockerService: ScreenWakeLockerService = inject(ScreenWakeLockerService);
    protected readonly pwaUpdateService: PwaUpdateService = inject(PwaUpdateService);

    public constructor() {
        this.iconRegistryService.initIcons();
        this.appInitializerService.init();
        this.screenWakeLockerService.init();
    }

    public ngOnInit(): void {
        this.pwaUpdateService.update();
    }

}
