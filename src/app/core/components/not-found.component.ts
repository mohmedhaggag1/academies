import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'not-found',
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="not-found">
      <img src="assets/images/noData.png" width="300"  alt="not Found image">
      <p class="primary fs-18 bold text-center"> {{'not_found' | translate}} </p>
    </div>
  `,
  styles: [`
  .not-found {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);      
    }
  `]
})
export class NotFoundComponent {

}
