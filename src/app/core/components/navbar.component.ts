import { Component, inject } from '@angular/core';
import { LogoComponent } from './logo.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../services/alert.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { AuthGuargService } from '../services/authGuard.service';

@Component({
  selector: 'navbar',
  template: `
    <div class="navbar flex aic jcsb px-4 pt-1 bg-white">
        <logo></logo>
      <div class="flex aic gap-x-2">

        <div class="flex aic gap-x-1 border round-25 bg-white px-1 py-50">
          <div class="img-profile d-none d-lg-block">
            <img
              src="/icons/user.svg"
              alt="profile picture"
              class="img-profile"
            />
          </div>
          <div class="user-name-container">
            <p class="user-name">
              {{ userName }}
            </p>
  @if (authGuard.isUser()) {
              <div
                class="w-fit-content flex aic pointer"
                [cdkCopyToClipboard]="companyCode"
                (click)="copy($event)"
              >
                <img
                  src="/icons/copy.svg"
                  alt="copy image"
                  width="12"
                />
                <p class="muted fs-10 ml-50">
                  {{ companyCode || '--' }}
                </p>
              </div>
  }
          </div>
          <div class="px-1 pointer" [matMenuTriggerFor]="menu">
            <i class="bx bx-chevron-down"></i>
          </div>
        </div>
      </div>
    </div>

    <mat-menu #menu="matMenu" class="filter-menu">
      
      <div dir="auto">
      @if (authGuard.isAdmin()) {
         <button
          mat-menu-item
          routerLink="bank-account"
          routerLinkActive="active"
        >
          <div class="flex aic gap-x-2">
            <img
              src="/icons/activate.svg"
              width="15"
              height="15"
              alt="lock icon"
            />
            <p class="bold">{{ 'bank_accounts' | translate }}</p>
          </div>
        </button>
      }
        <button
          mat-menu-item
          routerLink="/change-password"
          routerLinkActive="active"
        >
          <div class="flex aic gap-x-2">
            <img
              src="/icons/lock.svg"
              width="15"
              height="15"
              alt="lock icon"
            />
            <p class="bold">{{ 'change_password' | translate }}</p>
          </div>
        </button>

        <button mat-menu-item [matMenuTriggerFor]="language">
          <div class="flex aic gap-x-2">
            <img
              src="/icons/language.svg"
              width="15"
              height="15"
              alt="language icon"
            />
            <p class="bold">{{ 'language' | translate }}</p>
          </div>
        </button>
        <button mat-menu-item (click)="logout()">
          <div class="flex aic gap-x-2">
            <img
              src="/icons/logout.svg"
              width="15"
              height="15"
              alt="logout icon"
            />
            <p class="bold">{{ 'logout' | translate }}</p>
          </div>
        </button>
      </div>
    </mat-menu>

    <mat-menu #language>
      <button mat-menu-item class="flex aic jcc" (click)="switchLanguage()">
        <div class="flags pointer text-center">
          <div *ngIf="lang == 'ar'">English</div>
          <div *ngIf="lang == 'en'">العربية</div>
        </div>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .active {
        background: rgba(0, 37, 121, 0.15) !important;
        color: var(--primary) !important;
      }

      .img-profile {
        width: 33px;
        height: 33px;
        overflow: hidden;
      }

      .w-2 {
        width: 2rem;
      }

      .w-fit-content {
        width: fit-content;
      }

      .notification-badge {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(50%, -50%);
        border-radius: 50%;
        width: 15px;
        height: 15px;
        font-size: 12px;
      }

      :dir(ltr) .bold {
        font-weight: 500 !important;
      }

      :dir(rtl) .bold {
        font-weight: 400 !important;
      }

      .round-25{
        border-radius: 25px;
        border-color: #DADADA !important;
      }
    `,
  ],
  imports: [
    CommonModule,
    LogoComponent,
    MatMenuModule,
    TranslateModule,
    RouterModule,
    ClipboardModule,
  ]
})

export class NavbarComponent {
  active: string = '';
  lang: string = '';

  alert = inject(AlertService);
  dialog = inject(MatDialog);
  authService = inject(AuthService);
  authGuard = inject(AuthGuargService)

  dir = document.dir;

  profileUrl: string = '/no-user.jpg';

  userName: string = localStorage.getItem('username') || '--';

  role: string = localStorage.getItem('userRole') || '';

  companyCode: string =
    localStorage.getItem('academyId') || '--';

  daysLeft = 0;
  isAdminDefault = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.active = event.url;
      }
    });
  }

  ngOnInit() {
    this.lang = localStorage.getItem('language') || 'en';
    this.active = this.router.url;
  }

  switchLanguage() {
    const currentLanguage = localStorage.getItem('language');

    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';

    localStorage.setItem('language', newLanguage);

    window.location.reload();
  }

  copy(event: MouseEvent) {
    event.stopPropagation();
    this.alert.showAlert('academy_id_copied');
  }

  logout() {
    this.authService.logout();
  }
}
