import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
    ConfirmationModalComponent,
    ConfirmationModalData,
} from '@common/components/general/confirmation-modal/confirmation-modal.component';
import { TranslationKey } from '@common/types/translation-key.type';
import { BehaviorSubject, first, Observable } from 'rxjs';

export interface ConfirmationModalConfig extends Omit<ConfirmationModalData, 'noButtonKey' | 'yesButtonKey'> {
    yesButtonKey?: TranslationKey;
    noButtonKey?: TranslationKey;
}

export interface DefaultModalConfig {
    closeOnNavigation: boolean;
    disableClose: boolean;
    hasBackdrop: boolean;
}

export const requiredActionModalConfig: DefaultModalConfig = {
    closeOnNavigation: true,
    disableClose: true,
    hasBackdrop: true,
};

export const optionalActionModalConfig: DefaultModalConfig = {
    closeOnNavigation: true,
    disableClose: false,
    hasBackdrop: true,
};

@Injectable({
    providedIn: 'root',
})
export class ModalService {

    public readonly anyDialogOpened$$: BehaviorSubject<boolean>;
    private readonly matDialog: MatDialog = inject(MatDialog);

    public constructor() {
        this.anyDialogOpened$$ = new BehaviorSubject<boolean>(!!this.matDialog.openDialogs);
        this.matDialog.afterOpened.subscribe(() => {
            this.anyDialogOpened$$.next(true);
        });
        this.matDialog.afterAllClosed.subscribe(() => {
            this.anyDialogOpened$$.next(false);
        });
    }

    public openConfirmation(config: ConfirmationModalConfig): Observable<boolean> {
        return this.matDialog.open(ConfirmationModalComponent, {
            disableClose: true,
            closeOnNavigation: true,
            hasBackdrop: true,
            panelClass: 'small-modal',
            data: {
                noButtonKey: 'tk.general.label.button.cancel',
                yesButtonKey: 'tk.general.label.button.yes',
                ...config,
            },
        }).afterClosed().pipe(first());
    }

    public openComponent<Component, Data>(
        component: ComponentType<Component>,
        config?: MatDialogConfig<Data>,
    ): Observable<boolean | undefined> {
        return this.matDialog.open<Component, Data>(component, config).afterClosed().pipe(first());
    }

}
