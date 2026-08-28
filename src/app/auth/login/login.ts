import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EscobaInputComponent } from '../../core/inputs/escoba-input.component';
import { InputPasswordComponent } from '../../core/inputs/input-password.component';
import { AuthService } from '../../core/services/auth.service';
import { SubmitButtonComponent } from '../../core/components/submit-button.component';
import { AlertService } from '../../core/services/alert.service';
import { MatDialog } from "@angular/material/dialog";
import { LanguageComponent } from '../../core/components/language.component';
import { LeftComponent } from '../../core/components/left.component';

@Component({
  selector: 'login',
  imports: [
    CommonModule,
    LeftComponent,
    EscobaInputComponent,
    InputPasswordComponent,
    LanguageComponent,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    SubmitButtonComponent,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  service = inject(AuthService);
  alert = inject(AlertService);
  form!: FormGroup;
  passwordType: string = 'password';
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isAdmin: [false],
    });
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      this.service.login(this.form.value).subscribe(
        (res: any) => {
          if (res.success) {
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('userIdentityId', res.data.user.id);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('mustChangePassword', res.data.user.mustChangePassword);
            window.location.href = '/admin';
          }
        },
        (err) => (this.loading = false)
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  get f() {
    return this.form.controls;
  }
}
