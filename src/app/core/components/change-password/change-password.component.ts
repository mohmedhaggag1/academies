import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      currectPassword: ['', [Validators.required]],
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
    if (this.form.valid) {
      this.loading = true;
      this.service.changePassword(this.form.value).subscribe(
        (res) => {
          this.alertService.showAlert('password_updated');
          this.loading = false;
          this.form.reset();
        },
        (err) => {
          this.loading = false;
        }
      );
    } else {
      this.form.markAllAsTouched()
    }
  }
  get f() {
    return this.form.controls;
  }
}
