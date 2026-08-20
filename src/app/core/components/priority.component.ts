import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'priority',
  imports: [CommonModule, TranslateModule],
  template: `
    <div >
      <p [ngStyle]="{ color: getPriorityColor(priorityId) }">
    {{ priorityName | translate }}
   </p>
    </div>
  `,
  styles: ``
})
export class PriorityComponent {
  @Input() priorityId: number = 1;
  @Input() priorityName: string = '';

  getPriorityColor(id: number): any {
    switch (id) {
      case 1: return '#FF4D4F';
      case 2: return '#fec142';
      case 3: return '#99e1de';
    }
  }
}
