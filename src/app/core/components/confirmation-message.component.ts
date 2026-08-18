import {Component, Inject} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'confirmation-message',
    imports: [
        TranslateModule,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        MatDialogTitle
    ],
    template: `
    <div class="confirmation-message">
      <div mat-dialog-title>
        <p class="text-center fs-17">
          {{ data.message | translate }}
        </p>
      </div>
      <div mat-dialog-actions class="mt-50">
        <div class="flex aic w-100 mb-1 gap-x-1">
          <button [mat-dialog-close]="false" mat-raised-button class="flex-auto w-100 dark-color clickable-btn rounded cancel-btn">{{ 'cancel' | translate }}</button>
          <button [mat-dialog-close]="true" mat-raised-button class="flex-auto rounded w-100 {{data.classes}}">{{ data.btn_name | translate }}</button>
        </div>
      </div>
    </div>

  `,
    styles: ``
})
export class ConfirmationMessageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
