import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SubmitButtonComponent } from '../submit-button.component';
import { InputPasswordComponent } from '../../inputs/input-password.component';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
 import { finalize } from 'rxjs';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    InputPasswordComponent,
    SubmitButtonComponent,
    RouterModule
  ],
  standalone: true
})
export class ChangePasswordComponent {
  service = inject(AuthService);
  alertService = inject(AlertService);
  loading: boolean = false;
  passwordType: string = 'password';
  confirmPasswordType: string = 'password';
  form: FormGroup;
    isRtl = document.dir === 'rtl';
private cdr = inject(ChangeDetectorRef);
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          // Validators.minLength(8),
          // this.passwordValidator(),
        ],
      ],
    });

  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (regex.test(password)) {
        return null; // Password is strong, return null
      } else {
        return { weakPassword: true }; // Password is weak, return error
      }
    };
  }

submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.service.changePassword(this.form.value)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
          console.log('Loading state after finalize:', this.loading);
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res && res.success === false) {
            this.alertService.showAlert(res.message || 'حدث خطأ ما');
            return;
          }

          this.alertService.showAlert('password_updated');
          this.form.reset();
        },
      });
  }

  get f() {
    return this.form.controls;
  }
}
