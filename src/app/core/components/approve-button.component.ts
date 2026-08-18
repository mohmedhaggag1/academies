import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'approve-button',
    imports: [CommonModule, TranslateModule],
    template: `
  <div class="pointer" (click)="btnClicked()">
    <img src="assets/images/icons/circle_check.svg" alt="check icon" />
  </div>
  `,
    styles: [``]
})
export class ApproveButtonComponent {
  @Input() text = 'accept';
  @Input() classes: string = '';
  @Output() clicked = new EventEmitter();

  btnClicked() {
    this.clicked.emit();
  }
}
