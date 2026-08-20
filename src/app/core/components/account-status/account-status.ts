import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-account-status',
  imports: [
    TranslateModule,
    MatMenuModule,
    CommonModule
],
  templateUrl: './account-status.html',
  styleUrl: './account-status.scss',
})
export class AccountStatus {

  @Input() academy: any = 'active';
  selectedAcademy: any;

  accountStatuses = [
    {
      id: 1,
      name: 'active',
      src : "/icons/low.svg",
    },
    {
      id: 2,
      name: 'inactive',
       src : "/icons/hight.svg",
    }
  ];
  
  ngOnOnit() {
    this.selectedAcademy = this.academy
  }

  changeAccountStatus(academy: any, status: any): void {
    academy.accountStatus = status.name;

    console.log('Academy:', academy);
    console.log('Selected Account Status:', status);
  }


  getPriorityColor(id: number): any {
    switch (id) {
      case 2: return '#FF4D4F';

      case 1: return '#21b711';
    }
  }
}
