import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class IconRegistryService {

    private readonly matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
    private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);

    public initIcons(): void {
        this.matIconRegistry.addSvgIcon(
            'assignment_late',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/assignment_late.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'hexagon',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/hexagon.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'exit_to_app',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/exit_to_app.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'overview',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/overview.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'info',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/info.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'help',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/help.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'quiz',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/quiz.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'light_mode',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/light_mode.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'dark_mode',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/dark_mode.svg'),
        );
    }

}
