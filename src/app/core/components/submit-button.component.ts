import {Component, Input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";

@Component({
    selector: 'submit-button',
    imports: [
        TranslateModule,
        NgIf
    ],
    template: `
    <span *ngIf="!loading" class="fs-16">{{ text | translate }}</span>
    <p *ngIf="loading" class="flex aic jcc">
      <i class='bx bx-loader-circle bx-spin bx-rotate-90 mr-50 fs-20'></i>
      <span class="fs-16">{{ 'loading' | translate }}</span>
    </p>

  `,
    styles: ``
})
export class SubmitButtonComponent {
  @Input() loading!: any;
  @Input() text!: string;
}
