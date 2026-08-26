import { Component, Inject } from '@angular/core';

import {
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';

import { TranslateModule } from '@ngx-translate/core';

import { MagicScrollDirective } from '../../directives/magic-scroll.directive';
import { SubmitButtonComponent } from "../submit-button.component";


@Component({
    selector: 'app-bulk-invoice-dialog',
    standalone: true,
    imports: [
    TranslateModule,
    SubmitButtonComponent,
],

    templateUrl: './bulk-invoice-dialog.html',

    styleUrl: './bulk-invoice-dialog.scss',
})
export class BulkInvoiceDialogComponent {

loading = false;
    // ==========================================
    // Image
    // ==========================================

    selectedFile: File | null = null;

    imagePreview: string | null = null;

    isDragging = false;


    constructor(
        private dialogRef:
            MatDialogRef<BulkInvoiceDialogComponent>,

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


        if (
            !input.files ||
            input.files.length === 0
        ) {

            return;

        }


        this.setImage(input.files[0]);

    }


    // ==========================================
    // Drag Enter
    // ==========================================

    onDragOver(event: DragEvent): void {

        event.preventDefault();

        event.stopPropagation();

        this.isDragging = true;

    }


    // ==========================================
    // Drag Leave
    // ==========================================

    onDragLeave(event: DragEvent): void {

        event.preventDefault();

        event.stopPropagation();

        this.isDragging = false;

    }


    // ==========================================
    // Drop
    // ==========================================

    onDrop(event: DragEvent): void {

        event.preventDefault();

        event.stopPropagation();

        this.isDragging = false;


        const files =
            event.dataTransfer?.files;


        if (
            !files ||
            files.length === 0
        ) {

            return;

        }


        const file = files[0];


        this.setImage(file);

    }


    // ==========================================
    // Set Image
    // ==========================================

    private setImage(file: File): void {

        if (!file.type.startsWith('image/')) {

            return;

        }


        this.selectedFile = file;


        /*
         * Create preview
         */

        if (this.imagePreview) {

            URL.revokeObjectURL(
                this.imagePreview
            );

        }


        this.imagePreview =
            URL.createObjectURL(file);

    }


    // ==========================================
    // Change Image
    // ==========================================

    removeImage(): void {

        this.selectedFile = null;


        if (this.imagePreview) {

            URL.revokeObjectURL(
                this.imagePreview
            );

        }


        this.imagePreview = null;

    }


    // ==========================================
    // Cancel
    // ==========================================

    cancel(): void {

        this.cleanup();

        this.dialogRef.close();

    }


    // ==========================================
    // Confirm
    // ==========================================

    confirm(): void {

        if (!this.selectedFile) {

            return;

        }


        this.dialogRef.close({

            academyIds:
                this.data.academyIds,

            file:
                this.selectedFile

        });

    }


    // ==========================================
    // Cleanup
    // ==========================================

    private cleanup(): void {

        if (this.imagePreview) {

            URL.revokeObjectURL(
                this.imagePreview
            );

        }


        this.imagePreview = null;

        this.selectedFile = null;

    }

}
