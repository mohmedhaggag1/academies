import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from './alert.service';
import { ConfirmationMessageComponent } from '../components/confirmation-message.component';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dialog = inject(MatDialog);
  alert = inject(AlertService);
  router = inject(Router)

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(`${environment.apiUrl}Auth/RegisterAsyncAdmin`, data);
  }

  registerAsAdmin(data: any) {
    return this.http.post(`${environment.apiUrl}Auth/RegisterAdminByCompanyIdAsync`, data);
  }

 login(data: any) {
  const endpoint = data.isAdmin? 'auth/admin/login' : 'auth/academy/login';
  return this.http.post(`${environment.apiUrl}${endpoint}`, data);
  }


  logout() {
    let dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      panelClass: 'small-dialog',
      data: {
        btn_name: 'confirm',
        message: 'logout_message',
        classes: 'bg-primary white',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let lang = localStorage.getItem('language') || 'en';
        localStorage.clear();
        localStorage.setItem('language', lang);
        this.router.navigate(['/auth']);
      }
    });
  }

  changePassword(data: any) {
    return this.http.post(`${environment.apiUrl}auth/change-password`, data);
  }

  sendEmail(data: any) {
    let url = new URL(`${environment.apiUrl}Auth/ForgetPassword`);
    url.searchParams.append('EmailAddress', data);
    return this.http.post(`${url}`, {});
  }

  resetPassword(data: any) {
    return this.http.post(`${environment.apiUrl}Auth/ResetPassword`, data);
  }

  checkOtp(otpCode: number, userId: string) {
    let url = new URL(`${environment.apiUrl}Auth/CheckOTP`);
    url.searchParams.append('otp', otpCode.toString());
    url.searchParams.append('userId', userId);
    return this.http.post(`${url}`, {});
  }

  resendOtp(userId: any) {
    return this.http.post(
      `${environment.apiUrl}Auth/ResendOTP?userId=${userId}`,
      null
    );
  }

  // create Guest account
  CreateGuestQR(floorId: any) {
    let url = new URL(`${environment.apiUrl}Auth/RegisterUserGuestAsync?floorID=${floorId}`);
    return this.http.post(`${url}`, null);
  }
}
