import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class IconRegistryService {

    private readonly matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
    private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);
    private readonly iconsToRegister: { iconName: string; assetPath: string }[] = [
        { iconName: 'assignment_late', assetPath: 'assets/icons/assignment_late.svg '},
        { iconName: 'hexagon', assetPath: 'assets/icons/hexagon.svg '},
        { iconName: 'bag', assetPath: 'assets/icons/bag.svg '},
        { iconName: 'eye', assetPath: 'assets/icons/eye.svg '},
        { iconName: 'fire', assetPath: 'assets/icons/fire.svg '},
        { iconName: 'exit_to_app', assetPath: 'assets/icons/exit_to_app.svg '},
        { iconName: 'overview', assetPath: 'assets/icons/overview.svg '},
        { iconName: 'info', assetPath: 'assets/icons/info.svg '},
        { iconName: 'help', assetPath: 'assets/icons/help.svg '},
        { iconName: 'quiz', assetPath: 'assets/icons/quiz.svg '},
        { iconName: 'light_mode', assetPath: 'assets/icons/light_mode.svg '},
        { iconName: 'dark_mode', assetPath: 'assets/icons/dark_mode.svg '},
    ];

    public initIcons(): void {
        this.iconsToRegister.forEach(iconData => {
            this.matIconRegistry.addSvgIcon(iconData.iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(iconData.assetPath));
        });
    }

}
