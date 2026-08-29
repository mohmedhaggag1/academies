import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
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
import { ConfirmationMessageComponent } from '../confirmation-message.component';
import { AllAcademies } from '../../services/all-academies';

@Component({
  selector: 'app-academy-id-form-component',

  templateUrl: './academy-id-form-component.html',
  styleUrl: './academy-id-form-component.scss',
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
export class AcademyIdFormComponent {
  form!: FormGroup;
  loading = false;
  dialog = inject(MatDialog);
  alert = inject(AlertService);
  service = inject(AllAcademies);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      contactPhone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.academyData) {
      this.form.patchValue({
        name: this.data.academyData.name,
        contactPhone: this.data.academyData.contactPhone,
      });
    }
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      if (this.data.academyData) {
        this.service.updateAcademy(this.data.academyData._id, this.form.value).subscribe(
          (res: any) => {
            if (res.success) {
              this.loading = false;
              this.alert.showAlert('academy_updated');
              this.service.hasChanged.next(true);
              this.dialog.closeAll();
            } else {
              this.loading = false;
            }
          },
          () => (this.loading = false)
        );
      } else {
        this.service.addAcademy(this.form.value).subscribe(
          (res: any) => {
            if (res.success) {
              this.loading = false;
              this.alert.showAlert('academy_added');
              this.service.hasChanged.next(true);
              this.dialog.closeAll();
            } else {
              this.loading = false;
            }
          },
          () => (this.loading = false)
        );
      }
    } else {
      this.form.markAllAsTouched();
    }
  }


  deleteAcademy(academyId: any) {
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
        this.service.deleteAcademy(academyId).subscribe((_res: any) => {
          if (_res.success) {
            this.alert.showAlert('academy_deleted');
            this.dialog.closeAll();
            this.service.hasChanged.next(true);
          }
        });
      }
    });
  }


  get f() {
    return this.form.controls;
  }
}
