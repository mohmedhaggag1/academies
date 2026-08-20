import { Component, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';

import { TranslateModule } from '@ngx-translate/core';

import {
    ImageCroppedEvent,
    ImageCropperComponent
} from 'ngx-image-cropper';
import { MagicScrollDirective } from "../../directives/magic-scroll.directive";

@Component({
    selector: 'app-bulk-invoice-dialog',
    standalone: true,

    imports: [
    TranslateModule,
    ImageCropperComponent,
    MagicScrollDirective
],

    templateUrl: './bulk-invoice-dialog.html',
    styleUrl: './bulk-invoice-dialog.scss',
})
export class BulkInvoiceDialogComponent {

    imageChangedEvent: Event | null = null;

    croppedImage = '';

    constructor(
        private dialogRef: MatDialogRef<BulkInvoiceDialogComponent>,

        @Inject(MAT_DIALOG_DATA)
        public data: {
            academyIds: number[];
            academies: any[];
        }
    ) {}


    // ==========================================
    // Select Image
    // ==========================================

    fileChangeEvent(event: Event): void {

        const input =
            event.target as HTMLInputElement;

        if (!input.files || input.files.length === 0) {
            return;
        }

        this.imageChangedEvent = event;

    }


    // ==========================================
    // Crop Image
    // ==========================================

    imageCropped(event: ImageCroppedEvent): void {

        this.croppedImage =
            event.base64 || '';

    }


    // ==========================================
    // Change Image
    // ==========================================

    removeImage(): void {

        this.imageChangedEvent = null;

        this.croppedImage = '';

    }


    // ==========================================
    // Cancel
    // ==========================================

    cancel(): void {

        this.dialogRef.close();

    }


    // ==========================================
    // Confirm
    // ==========================================

    confirm(): void {

        if (!this.croppedImage) {
            return;
        }

        this.dialogRef.close({

            academyIds:
                this.data.academyIds,

            image:
                this.croppedImage

        });

    }

}
