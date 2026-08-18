import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from './input-error.component';
import { InputLabelComponent } from './input-label.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'escoba-input',
  imports: [
    CommonModule,
    InputErrorComponent,
    InputLabelComponent,
    ReactiveFormsModule,
  ],
  template: `
    <div class="escoba-input">
      @if(key) {
      <input-label [key]="key" [control]="control" />
      }
      <div class="mt-50" [ngClass]="{ relative: icon }">
        <ng-content />
        <div class="img icon flex-center" *ngIf="icon">
          <img
            src="assets/images/input/{{ icon }}.svg"
            alt="icon name"
            class="pointer"
          />
        </div>
      </div>
      <input-error [control]="control" />
    </div>
  `,
  styles: [
    `
      .icon {
        position: absolute;
        inset-inline-end: 0;
        top: 0;
        bottom: 0;
        padding-inline: 15px;
      }
    `,
  ],
})
export class EscobaInputComponent {
  @Input() key!: string;
  @Input() control!: AbstractControl;
  @Input() icon?: string;
}
