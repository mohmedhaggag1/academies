import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'priority',
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="flex aic" dir="auto">
      <img src="/icons/hight.svg" *ngIf="priorityId == 1" width="10" height="10" alt="" />
      <img src="/icons/low.svg" *ngIf="priorityId == 2" width="10" height="10" alt="" />
      <img src="/icons/medium.svg" *ngIf="priorityId == 3" width="10" height="10" alt="" />
      @if(priorityName != '') {
    <p class="ml-50" [ngStyle]="{ color: getPriorityColor(priorityId) }">
    {{ priorityName | translate }}
  </p>      }
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
