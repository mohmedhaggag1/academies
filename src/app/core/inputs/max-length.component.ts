import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'max-length',
    imports: [CommonModule],
    template: `
    <p>{{currentLength}} / {{maxLength}}</p>
  `,
    styles: []
})
export class MaxLengthComponent {
  @Input() maxLength: number = 0;
  @Input() currentLength: number = 0;
}
