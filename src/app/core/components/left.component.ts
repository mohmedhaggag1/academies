import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogoComponent } from './logo.component';
@Component({
    selector: 'app-left',
    imports: [CommonModule, TranslateModule, LogoComponent],
    template: `
    <div class="flex h-100 pl-5 bg-color">
      <div class="w-80 h-100 relative">
        <div class="logo">
          <logo [width]="150"></logo>
        </div>
        <div class="desc flex-column gap-y-4">
          <div class="fs-3">
            <ng-content />
          </div>
          <p class="desc-text w-80">{{ data?.desc | translate }}</p>
        </div>
      </div>
    </div>
  `,
    styles: [
        `
      .bg-color {
        background-color: rgba(26, 172, 172, 0.1);
      }

      .logo {
        position: absolute;
        top: 20%;
      }

      .desc {
        position: absolute;
        top: 40%;
      }

      .fs-3 {
        font-size: 3rem;
      }

      .desc-text {
        font-size: 2.5rem;
        color: #121212;
        line-height: 158%;
      }
    `,
    ]
})
export class LeftComponent {
  @Input() data: any;
}
