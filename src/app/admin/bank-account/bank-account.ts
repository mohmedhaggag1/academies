import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subject, debounceTime, map } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatMenuModule } from '@angular/material/menu';
import { AlertService } from '../../core/services/alert.service';
import { BankAccountService } from '../../core/services/bank-account';
import { SearchComponent } from '../../core/components/search.component';
import { NotFoundComponent } from '../../core/components/not-found.component';
import { EscobaInputComponent } from "../../core/inputs/escoba-input.component";
import { MagicScrollDirective } from '../../core/directives/magic-scroll.directive';
import { BankAccountForm } from '../../core/components/bank-account-form/bank-account-form';
import { RectangleSkeletonComponent } from '../../core/components/rectangle-skeleton.component';
import { ConfirmationMessageComponent } from '../../core/components/confirmation-message.component';

@Component({
  selector: 'bank-account',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatMenuModule,
    NgSelectModule,
    SearchComponent,
    TranslateModule,
    NotFoundComponent,
    NgxPaginationModule,
    MagicScrollDirective,
    EscobaInputComponent,
    RectangleSkeletonComponent,
  ],
  templateUrl: './bank-account.html',
  styleUrl: './bank-account.scss',
})
export class BankAccount {
  loading = true;
  currentPage = 1;
  rowCount: any;
  pageSize = 15;
  maxSize = 7;

  allData: any[] = [];
  selectedStatus = 'all'
  dialog = inject(MatDialog);
  alert = inject(AlertService)
  service = inject(BankAccountService);

  statusOptions = [
    { value: 'all', label: 'all' },
    { value: 'active', label: 'active' },
    { value: 'inactive', label: 'inactive' }

  ];

  private searchSubject: Subject<string> = new Subject<string>();

  accounts$ = this.service.accounts$.pipe(
    map((res: any) => {
      this.loading = false;
      this.allData = res;
      console.log(res)
      // this.rowCount = res;
      return res;
    })
  );

  ngOnInit() {
    this.selectedStatus = 'all';

    this.service.isActive.next(null);
    this.service.search.next('');
    this.service.hasChanged.next(true);

    this.searchSubject
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        this.service.search.next(value);
        this.service.hasChanged.next(true);
      });
  }

  statusChanged(event: string) {
    this.loading = true;
    const isActive = event === 'all' ? null : event === 'active';
    this.service.isActive.next(isActive);
    this.service.hasChanged.next(true);
  }

  accountdForm(accountData?: any) {
    this.dialog.open(BankAccountForm, {
      autoFocus: false,
      panelClass: 'large-dialog',
      data: {
        accountData
      },
    });
  }

  deleteAccount() {
    let dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      panelClass: 'small-dialog',
      data: {
        btn_name: 'confirm',
        message: 'delete_the_account',
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

  activateAccount(accountId: any) {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      panelClass: 'small-dialog',
      data: {
        btn_name: 'confirm',
        message: 'activate_the_account',
        classes: 'bg-primary',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.service.activateBankAccount(accountId).subscribe((_res: any) => {
          if (_res.success) {
            this.alert.showAlert('account_activated');
            this.dialog.closeAll();
            this.service.hasChanged.next(true);
          }
        });
      }
    });
  }

  deactivateAccount(accountId: any) {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      panelClass: 'small-dialog',
      data: {
        btn_name: 'confirm',
        message: 'deactivate_the_account',
        classes: 'bg-danger',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.service.disabledBankAccount(accountId).subscribe((_res: any) => {
          if (_res.success) {
            this.alert.showAlert('account_deactivated');
            this.dialog.closeAll();
            this.service.hasChanged.next(true);
          }
        });
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
    this.service.hasChanged.next(true);
  }

  ngOnDestroy(): void {
    this.searchSubject.next('');
    this.service.page.next(0);
    this.service.limit.next(0);
  }
}
