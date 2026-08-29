import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { SubmitButtonComponent } from '../../../core/components/submit-button.component';
import { EscobaInputComponent } from '../../../core/inputs/escoba-input.component';
import { AlertService } from '../../../core/services/alert.service';
import { BankAccountService } from '../../../core/services/bank-account';

@Component({
  selector: 'bank-account-form',
  templateUrl: './bank-account-form.html',
  styleUrl: './bank-account-form.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    TranslateModule,
    MatDialogContent,
    EscobaInputComponent,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    SubmitButtonComponent,
  ]
})
export class BankAccountForm implements OnInit {
  form!: FormGroup;
  loading = false;

  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private alert = inject(AlertService);
  private service = inject(BankAccountService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data?.accountData) {
      this.form.patchValue({
        accountHolderName: this.data.accountData.accountHolderName,
        accountNumber: this.data.accountData.accountNumber,
        bankName: this.data.accountData.bankName,
        currency: this.data.accountData.currency,
        marketRate: this.data.accountData.marketRate,
        intermediaryRate: this.data.accountData.intermediaryRate,
        isActive: this.data.accountData.isActive ?? true,
      });
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      accountHolderName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      currency: ['USD', Validators.required],
      marketRate: [null, [Validators.required, Validators.min(0)]],
      intermediaryRate: [null, [Validators.required, Validators.min(0)]],
      isActive: [true],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = this.form.value;
    const isEdit = !!this.data?.accountData?.id;

    const request$ = isEdit
      ? this.service.updateBankAccount(this.data.accountData.id, payload)
      : this.service.addBankAccount(payload);

    request$.subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res?.success) {
          this.alert.showAlert(isEdit ? 'account_updated' : 'account_added');
          this.service.hasChanged.next(true);
          this.dialog.closeAll();
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get f() {
    return this.form.controls;
  }
}
