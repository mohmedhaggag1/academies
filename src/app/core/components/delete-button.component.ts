import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'delete-button',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <button type="button" class="btn white rounded py-75 black border border-1 border-dark {{classes}}" (click)="btnClicked()">{{text | translate}}</button>
  `,
  styles: [`
    button {
      background-color: white;
      width: 14rem;
      display: block;
    }
  `]
})
export class DeleteButtonComponent {
  @Input() text = 'delete';
  @Input() classes: string = '';
  @Output() clicked = new EventEmitter();

  btnClicked() {
    this.clicked.emit();
  }
}
