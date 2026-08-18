import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'status',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
   
   <div class="status white px-75 rounded" [ngClass]="{'bg-success' : status == 'active',  'bg-danger': status == 'expired'}">
     {{status | translate}}
   </div>
  `,
  styles: `
    .status {
      width: fit-content;
  }
  `
})
export class StatusComponent {

  @Input() status: any;
}
