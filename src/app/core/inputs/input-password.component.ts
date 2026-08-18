import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from './input-error.component';
import { InputLabelComponent } from './input-label.component';

@Component({
    selector: 'input-password',
    imports: [
        CommonModule,
        InputErrorComponent,
        InputLabelComponent,
        ReactiveFormsModule,
    ],
    template: `
    <div class="escoba-input">
      <input-label [key]="key" [control]="control" />
      <div class="relative">
        <ng-content />
        <div class="icon flex-center pointer">
          <img
            *ngIf="type == 'text'"
            (click)="changeType('password')"
            src="/icons/eye.svg"
            alt="eye icon"
          />
          <img
            *ngIf="type == 'password'"
            (click)="changeType('text')"
            src="/icons/eye-closed.svg"
            alt="eye closed icon"
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

      .icon img {
        animation: keyframes-fill 0.5s;
      }

      /* ------ Animation ------ */
      @keyframes keyframes-fill {
        0% {
          transform: scale(0);
          opacity: 0;
        }

        50% {
          transform: scale(1.2);
        }
      }
    `,
    ]
})
export class InputPasswordComponent {
  type = 'password';
  @Input() key!: string;
  @Output() getType = new EventEmitter();
  @Input() control!: AbstractControl;

  changeType(type: string) {
    this.type = type;
    this.getType.emit(type);
  }
}
