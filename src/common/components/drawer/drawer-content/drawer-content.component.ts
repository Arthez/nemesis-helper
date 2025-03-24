import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AboutModalComponent } from '@common/components/drawer/about-modal/about-modal.component';
import { AppConfig } from '@common/interfaces/app-config.interface';
import { LanguageService } from '@common/services/language/language.service';
import { ModalService } from '@common/services/modal/modal.service';
import { UiModeService } from '@common/services/ui-mode/ui-mode.service';
import { StorageManager } from '@common/utils/storage-manager.util';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-drawer-content',
    standalone: true,
    imports: [
        MatButton,
        MatIcon,
        MatTooltip,
        TranslateModule,
    ],
    templateUrl: './drawer-content.component.html',
    styleUrl: './drawer-content.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContentComponent {
    @Output() protected readonly openSearchRoomModal: EventEmitter<void> = new EventEmitter<void>();
    @Output() protected readonly openFaqModal: EventEmitter<void> = new EventEmitter<void>();
    @Output() protected readonly openKeyMomentsModal: EventEmitter<void> = new EventEmitter<void>();
    @Output() protected readonly openReloadModal: EventEmitter<void> = new EventEmitter<void>();
    @Output() protected readonly openLogsModal: EventEmitter<void> = new EventEmitter<void>();
    @Output() protected readonly goToLandingPage: EventEmitter<void> = new EventEmitter<void>();
    // eslint-disable-next-line no-magic-numbers
    protected readonly tooltipShowDelay: number = 1000;
    protected readonly uiModeService: UiModeService = inject(UiModeService);
    private readonly languageService: LanguageService = inject(LanguageService);
    private readonly modalService: ModalService = inject(ModalService);

    protected changeLanguage(): void {
        this.languageService.toggleLanguage().subscribe(language => {
            const savedConfig: AppConfig | undefined = StorageManager.loadConfig();
            StorageManager.saveConfig(
                savedConfig ? { ...savedConfig, language } : { language },
            );
        });
    }

    protected changeUiMode(): void {
        this.uiModeService.toggleUiMode();
        const uiDarkMode: boolean = this.uiModeService.isDarkMode();
        const savedConfig: AppConfig | undefined = StorageManager.loadConfig();
        StorageManager.saveConfig(
            savedConfig ? { ...savedConfig, uiDarkMode } : { uiDarkMode },
        );
    }

    protected openAboutModal(): Observable<boolean | undefined> {
        return this.modalService.openComponent<AboutModalComponent, void>(AboutModalComponent, {
            closeOnNavigation: true,
            disableClose: false,
            hasBackdrop: true,
            panelClass: 'medium-modal',
        });
    }

}
