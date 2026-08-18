import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'order-status',
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="status-container flex-center" 
    [ngClass]="{
      'status-new': requestStatus.id == 1, 
      'status-pending' : requestStatus.id == 2,
      'status-completed' : requestStatus.id == 3
      }">
  <p class="fs-14 px-25">{{ getTranslatedStatus(requestStatus.id) | translate }}</p>
    </div>
  `,
  styles: [`
    .status-container {
      border-radius: 3rem;
      padding: 0.7rem 0.4rem;
      gap: 0.5rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-new {
      background-color: #d9e5ff;
      color: #82a0e2;
    }

    .status-completed {
      background-color: #e4f5f5;
      color: #6ccaca;
    }

    .status-pending {
      background-color: #fff9e2;
      color: #ffd43d;
    }
  `]
})
export class OrderStatusComponent {
  @Input() requestStatus: any;

  statusTranslations: { [key: number]: string } = {
    1: 'new',
    2: 'in_progress',
    3: 'completed'
  };

  getTranslatedStatus(id: number): string {
    return this.statusTranslations[id] || '';
  }
}
