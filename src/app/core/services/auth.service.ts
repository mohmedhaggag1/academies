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

  login(data: any) {
    const endpoint = data.isAdmin ? 'auth/admin/login' : 'auth/academy/login';
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
    return this.http.patch(`${environment.apiUrl}auth/change-password`, data);
  }


  
}
