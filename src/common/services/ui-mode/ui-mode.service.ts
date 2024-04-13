import { inject, Injectable, Renderer2, RendererFactory2, Signal, signal, WritableSignal } from '@angular/core';
import { StorageManager } from '@common/utils/storage-manager.util';

@Injectable({
    providedIn: 'root',
})
export class UiModeService {

    public readonly isDarkMode: Signal<boolean>;
    private readonly rendererFactory2: RendererFactory2  = inject(RendererFactory2);
    private readonly renderer2: Renderer2;
    private readonly darkMode: WritableSignal<boolean>;

    public constructor() {
        this.renderer2 = this.rendererFactory2.createRenderer(window.document, null);
        const savedDarkModeState: boolean | undefined = StorageManager.loadConfig()?.uiDarkMode;
        const defaultDarkMode: boolean = savedDarkModeState !== undefined && savedDarkModeState !== null ?
            savedDarkModeState : this.isPreferredDarkColorScheme();
        this.darkMode = signal(defaultDarkMode);
        this.isDarkMode = this.darkMode.asReadonly();
        this.refreshDarkModeClass();
    }

    public toggleUiMode(): void {
        this.darkMode.update(mode => !mode);
        this.refreshDarkModeClass();
    }

    private refreshDarkModeClass(): void {
        const body: HTMLBodyElement | null = window.document.querySelector('body');
        if (!body) {
            return;
        }
        const darkModeClassName: string = 'dark-mode';
        if (this.darkMode()) {
            this.renderer2.addClass(body, darkModeClassName);
        } else {
            this.renderer2.removeClass(body, darkModeClassName);
        }
    }

    private isPreferredDarkColorScheme(): boolean {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            return false;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        } else {
            return true;
        }
    }

}
