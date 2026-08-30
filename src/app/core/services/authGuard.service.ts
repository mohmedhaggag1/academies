import { Injectable } from '@angular/core';

export type UserRole = 'ADMIN' | 'ACADEMY';

@Injectable({
  providedIn: 'root'
})
export class AuthGuargService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): UserRole | null {
    return localStorage.getItem('userRole') as UserRole | null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'ACADEMY';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userIdentityId');
    localStorage.removeItem('username');
    localStorage.removeItem('mustChangePassword');
  }
}
