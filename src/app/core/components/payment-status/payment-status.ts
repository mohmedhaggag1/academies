import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, map, Subject } from 'rxjs';
// import { BuildingsService } from '../../services/buildings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'payment-status',
  templateUrl: './payment-status.html',
  styleUrl: './payment-status.scss',
  imports: [NgSelectModule, FormsModule, TranslateModule, CommonModule]
})

export class PaymentStatusComponent {
  @Input() selectedValue: any = null;
  @Input() classes: string = 'w-21r'
  @Output() filterValue = new EventEmitter();
  // service = inject(BuildingsService);
  searchBuilding$ = new Subject<string>();

  ngOnInit(): void {
    // this.service.limit.next(10);
    // this.service.page.next(1);
    // this.searchBuilding$.pipe(debounceTime(400)).subscribe(term => {
    //   this.service.search.next(term);
    //   this.service.hasChanged.next(true);
    // });
  }

  // buildings$ = this.service.buildings$.pipe(
  //   map((res: any) => {
  //     return res.results;
  //   })
  // );


  onBuildingSearch(e: any) { this.searchBuilding$.next(e.term); }

  onChanged(event: any) {
    this.filterValue.emit(event)
  }

  onClear() {
    // this.service.search.next('');
    // this.service.hasChanged.next(true);
  }

  onClose() {
    // this.service.search.next('');
    // this.service.hasChanged.next(true);
  }

  ngOnDestroy(): void {
    // this.service.search.next('');
    // this.service.limit.next(15);
  }
}


