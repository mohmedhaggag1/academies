import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'account-status-select',
  standalone: true,
  templateUrl: './maintenance-status-select.component.html',
  styleUrl: './maintenance-status-select.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    TranslateModule
  ]
})
export class AccountStatusSelect {

  @Input() selectedValue: any = null;

  @Input() classes: string = 'w-21r';


  @Output() filterValue = new EventEmitter<any>();

  onChanged(): void {
    this.filterValue.emit(this.selectedValue);
  }
}