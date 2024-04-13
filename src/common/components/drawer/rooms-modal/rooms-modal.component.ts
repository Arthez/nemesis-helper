import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { ContentGroup } from '@common/interfaces/content-group.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';

export interface RoomsModalData {
    roomGroups: ContentGroup[];
}

const searchDebounceTimeMs: number = 200;

@Component({
    selector: 'app-rooms-modal',
    standalone: true,
    imports: [
        MatDialogContent,
        TranslateModule,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        NgOptimizedImage,
    ],
    templateUrl: './rooms-modal.component.html',
    styleUrl: './rooms-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsModalComponent implements OnInit {

    protected roomData: WritableSignal<ContentGroup[]> = signal([]);
    protected searchControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });
    private readonly data: RoomsModalData = inject(MAT_DIALOG_DATA);
    private readonly translateService: TranslateService = inject(TranslateService);
    private translatedRoomData: ContentGroup[] = [];

    public ngOnInit(): void {
        this.translatedRoomData = this.data.roomGroups.map(roomGroup => ({
            name: this.translateService.instant(roomGroup.name),
            items: roomGroup.items.map(room => ({
                name: this.translateService.instant(room.name),
                content: this.translateService.instant(room.content),
            })),
        }));
        this.roomData.set(this.translatedRoomData);
        this.searchControl.valueChanges.pipe(debounceTime(searchDebounceTimeMs)).subscribe(search => {
            this.roomData.set(this.translatedRoomData.map(
                roomGroup => ({
                    ...roomGroup,
                    items: roomGroup.items.filter(room => search === '' || room.name.toLowerCase().includes(search.toLowerCase())),
                }),
            ));
        });
    }

}
