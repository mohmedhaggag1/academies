import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'reject-button',
    imports: [CommonModule, TranslateModule],
    template: `
  <div class="pointer" (click)="btnClicked()">
    <img src="assets/images/icons/circle_reject.svg" alt="reject icon" />
  </div>
  `,
    styles: [``]
})
export class RejectButtonComponent {
  @Input() text = 'reject';
  @Input() classes: string = '';
  @Output() clicked = new EventEmitter();

  btnClicked() {
    this.clicked.emit();
  }
}
