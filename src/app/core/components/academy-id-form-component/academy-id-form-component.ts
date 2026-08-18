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
// import { FloorsService } from '../../../core/services/floors.service';
import { LoadingComponent } from '../loading.component';
import { ConfirmationMessageComponent } from '../confirmation-message.component';

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
        LoadingComponent,
    ]
})
export class AcademyIdFormComponent {
  form!: FormGroup;
  loading = false;
  dialog = inject(MatDialog);
  alert = inject(AlertService);
  // service = inject(FloorsService);
  dialogContentLoading = true;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.floorId) {
      // this.service.getFloorById(this.data.floorId).subscribe((res: any) => {
      //   if (res.success) {
      //     this.form.patchValue({
      //       nameEn: res.data.nameEn,
      //       nameAr: res.data.nameAr,
      //     });
      //     this.dialogContentLoading = false;
      //   }
      // });
    } else {
      this.dialogContentLoading = false;
    }
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      
      const formData = new FormData();
      formData.append('NameEn', this.form.value.nameEn);
      formData.append('NameAr', this.form.value.nameAr);
      formData.append('BuildingId', this.data.buildId);

      if (this.data.floorId) {
        // this.service.updateFloor(this.data.floorId, formData).subscribe(
        //   (res: any) => {
        //     if (res.success) {
        //       this.loading = false;
        //       this.alert.showAlert('floor_updated');
        //       this.service.hasChanged.next(true);
        //       this.dialog.closeAll();
        //     } else {
        //       this.loading = false;
        //     }
        //   },
        //   () => (this.loading = false)
        // );
      } else {
        // this.service.addFloor(formData).subscribe(
        //   (res: any) => {
        //     if (res.success) {
        //       this.loading = false;
        //       this.alert.showAlert('floor_added');
        //       this.service.hasChanged.next(true);
        //       this.dialog.closeAll();
        //     } else {
        //       this.loading = false;
        //     }
        //   },
        //   () => (this.loading = false)
        // );
      }
    } else {
      this.form.markAllAsTouched();
    }
  }


    deleteAcademy(id: any) {
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


  get f() {
    return this.form.controls;
  }
}
