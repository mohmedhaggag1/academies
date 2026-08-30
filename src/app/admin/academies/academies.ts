import { AllAcademies } from './../../core/services/all-academies';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotFoundComponent } from '../../core/components/not-found.component';
import { RectangleSkeletonComponent } from '../../core/components/rectangle-skeleton.component';
import { SearchComponent } from '../../core/components/search.component';
import { MagicScrollDirective } from '../../core/directives/magic-scroll.directive';
import { ConfirmationMessageComponent } from '../../core/components/confirmation-message.component';
import { MatDialog } from '@angular/material/dialog';
import { AcademyIdFormComponent } from '../../core/components/academy-id-form-component/academy-id-form-component';
import { AlertService } from '../../core/services/alert.service';
import { RouterModule } from '@angular/router';
import { Subject, debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-academies',
  imports: [
    CommonModule,
    TranslateModule,
    NgxPaginationModule,
    SearchComponent,
    RectangleSkeletonComponent,
    MagicScrollDirective,
    MatMenuModule,
    NotFoundComponent,
    RouterModule
  ],
  templateUrl: './academies.html',
  styleUrl: './academies.scss',
})
export class Academies {
  loading = true;
  currentPage = 1;
  rowCount: any;
  pageSize = 15;
  maxSize = 7;

  alert = inject(AlertService)
  dialog = inject(MatDialog);
  AllAcademies: any[] = [];
  service = inject(AllAcademies);
  private searchSubject: Subject<string> = new Subject<string>();

    academies$ = this.service.houseUnits$.pipe(
    map((res: any) => {
      this.loading = false;
      this.AllAcademies = res;
      console.log(res)
      // this.rowCount = res;
      return res;
    })
  );

  ngOnInit() {
    this.service.search.next('');
    // search
    this.searchSubject.pipe(debounceTime(500)).subscribe((value: string) => {
      this.service.search.next(value);
      this.service.hasChanged.next(true);
    });
  }

  academyIdForm(academyData?: any) {
    this.dialog.open(AcademyIdFormComponent, {
      autoFocus: false,
      panelClass: 'medium-dialog',
      data: {
        academyData
      },
    });
  }


  deleteAcademy() {
    let dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      panelClass: 'small-dialog',
      data: {
        btn_name: 'confirm',
        message: 'delete_the_academy',
        classes: 'bg-danger',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        // this.service.deleteFloor(buildId).subscribe((_res: any) => {
        //   if (_res.success) {
        //     this.alert.showAlert('academy_deleted');
        //     this.dialog.closeAll();
        //     this.service.hasChanged.next(true);
        //   }
        // });
      }
    });


  }



  copyToClipboard(text: any) {
    navigator.clipboard.writeText(text);
    this.alert.showAlert('academy_id_copied', 'bg-success');

  }
  trackBy(index: number, item: any) {
    return item.id;
  }

  pageChanged(event: any) {
    this.loading = true;
    this.currentPage = event;
    this.service.page.next(event);
    this.service.hasChanged.next(true);
  }

  search(value: any) {
    this.loading = true;
    this.searchSubject.next(value);
  }

  ngOnDestroy(): void {
    this.searchSubject.next('');
    this.service.page.next(0);
    this.service.limit.next(0);
  }
}
