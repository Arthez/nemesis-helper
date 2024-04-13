import { inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ModalService } from '@common/services/modal/modal.service';

const updateDelayMs: number = 1000;

@Injectable({
    providedIn: 'root',
})
export class PwaUpdateService {

    protected readonly modalService: ModalService = inject(ModalService);
    protected readonly swUpdate: SwUpdate = inject(SwUpdate);

    public update(): void {
        window.setTimeout(() => {
            if (this.swUpdate.isEnabled) {
                this.swUpdate.checkForUpdate().then(newVerAvailable => {
                    if (!newVerAvailable) {
                        return;
                    }
                    this.modalService.openConfirmation({
                        titleKey: 'tk.app.title.new-version-available',
                        messageKey: 'tk.app.message.new-version-available',
                    }).subscribe(confirmed => {
                        if (confirmed) {
                            window.location.reload();
                        }
                    });
                });
            }
        }, updateDelayMs);
    }

}
