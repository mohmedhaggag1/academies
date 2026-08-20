import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'transfer-status',
  imports: [
    TranslateModule,
    MatMenuModule,
    CommonModule
],
  templateUrl: './transfer-status.html',
  styleUrl: './transfer-status.scss',
})
export class TransferStatus {

  @Input() academy: any = 'completed';
  selectedAcademy: any;

  accountStatuses = [
     {
      id: 1,
      name: 'completed',
       src : "/icons/hight.svg",
    },
    {
      id: 2,
      name: 'pending',
      src : "/icons/medium.svg",
    },
    {
      id: 3,
      name: 'not_arrived',
       src : "/icons/hight.svg",
    },
    
  ];
  
  ngOnOnit() {
    this.selectedAcademy = this.academy
  }

  changeAccountStatus(academy: any, status: any): void {
    academy.statusId = status.name;
  }


  getPriorityColor(id: number): any {
    switch (id) {
      case 2: return '#FF4D4F';
      case 1: return '#21b711';
    }
  }
}
