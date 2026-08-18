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
// import { AuthService } from '../../core/services/auth.service';
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
  // service = inject(AuthService);
  alert = inject(AlertService);
  form!: FormGroup;
  passwordType: string = 'password';
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberCheckbox: [false],
    });


  }

  submit() {
    // if (this.form.valid) {
    //   this.loading = true;
    //   this.service.login(this.form.value).subscribe(
    //     (res: any) => {
    //       if (res.success) {
    //         if (res.data.isExpire) {
    //           localStorage.setItem('temToken', res.data.token)
    //           localStorage.setItem('temCompanyId', res.data.companyId);
    //           localStorage.setItem('role', res.data.roles[0]);

    //           this.dialog.open(RenewDialogComponent, {
    //             width: '700px'
    //           });
    //           return
    //         }
    //         if (
    //           res.data.isAuthenticated == false &&
    //           res.data.twoFactorEnabled == true
    //         ) {
    //           localStorage.setItem('otpAllowed', 'true');
    //           localStorage.setItem('email', this.form.value.email);
    //           localStorage.setItem('userIdentityId', res.data.userIdentityId);
    //           localStorage.setItem('companyCode', res.data.companyCode);
    //           window.location.href = '/auth/otp';
    //         } else if (res.data.isAuthenticated == true || res.data.userStatus == 'Approved') {
    //           localStorage.setItem('token', res.data.token);
    //           localStorage.setItem('id', res.data.userIdentityId);
    //           localStorage.setItem('role', res.data.roles[0]);
    //           if (res.data.roles[0] === 'Admin') {
    //             localStorage.setItem('companyId', res.data.companyId);
    //             localStorage.setItem('companyCode', res.data.companyCode);
    //           }
    //           window.location.href = '/';
    //         } else if (res.data.userStatus == 'Pending') {
    //           this.alert.showAlert('pending_status', 'bg-primary');
    //           this.loading = false;
    //         }
    //       }
    //     },
    //     (err) => (this.loading = false)
    //   );
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }

  get f() {
    return this.form.controls;
  }
}
