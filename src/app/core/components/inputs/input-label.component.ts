import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { MaxLengthComponent } from './max-length.component';

@Component({
  selector: 'input-label',
  standalone: true,
  imports: [
    CommonModule,
    MaxLengthComponent
  ],
  template: `
    <div
      [ngClass]="{
        'danger': control?.errors && control?.touched
      }"
      class="{{ classes }} mb-25 flex aic jcsb"
    >
      <p class="flex aic bold">
        <span>{{ key }}</span>

        <i *ngIf="optional" class="ml-50">
          ( optional )
        </i>
      </p>

      <max-length
        *ngIf="maxLength"
        [maxLength]="maxLength"
        [currentLength]="control?.value?.length || 0"
      />
    </div>
  `,
  styles: []
})
export class InputLabelComponent {
  @Input() key!: string;
  @Input() optional = false;
  @Input() classes = 'fs-14';
  @Input() control?: AbstractControl;
  @Input() maxLength!: number;
}