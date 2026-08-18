import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
    selector: 'search',
    imports: [CommonModule, TranslateModule, FormsModule],
    template: `
    <div class="relative search">
      <input type="text" class="input" [(ngModel)]="value" (input)="onSearchChange()" placeholder="{{ searchPlaceHolder |translate}}">
      <i class='bx bx-search icon'></i>
    </div>

  `,
    styles: [`
    .search {
      input {
        text-indent: 2rem;
      }
      .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        inset-inline-start: 1rem !important;
        line-height: 0;
      }
    }
  `]
})
export class SearchComponent {

  value: any;
  @Input() searchPlaceHolder: string = 'search';
  @Output() valeChanged = new EventEmitter<string>();

  onSearchChange() {
    this.valeChanged.emit(this.value);
  }

}
