import { Component, inject } from '@angular/core';
import { LogoComponent } from './logo.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { AuthService } from '../services/auth.service';
// import { MyProfileService } from '../services/my-profile.service';
// import { environment } from '../../../environments/environment.development';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../services/alert.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
// import { NotificationsListComponent } from './notifications-list.component';
// import { PushNotificationService } from '../services/push-notification.service';
// import { GeneralStatisticsService } from '../services/general-statistics.service';
// import { CurrentPageService } from '../services/current-page.service';
// import { updatePermissions } from '../utils/permissions';
// import { Modules, Permissions } from '../interfaces/module-permission';

@Component({
  selector: 'navbar',
  template: `
    <div class="navbar flex aic jcsb px-4 pt-1 bg-white">
        <logo></logo>
      <div class="flex aic gap-x-2">

        <div class="flex aic gap-x-1 border round-25 bg-white px-1 py-50">
          <div class="img-profile">
            <img
              src="/icons/user.svg"
              alt="profile picture"
              class="img-profile"
            />
          </div>
          <div class="user-name-container">
            <p class="user-name">
              {{ 'haggag' }}
            </p>
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
          </div>
          <div class="px-1 pointer" [matMenuTriggerFor]="menu">
            <i class="bx bx-chevron-down"></i>
          </div>
        </div>
      </div>
    </div>

    <mat-menu #menu="matMenu" class="filter-menu">
      <div dir="auto">
        <button
          mat-menu-item
          routerLink="change-password"
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
  // authService = inject(AuthService);
  // profileService = inject(MyProfileService);
  alert = inject(AlertService);
  dialog = inject(MatDialog);
  // notificationsService = inject(PushNotificationService);
  dir = document.dir;
  profileUrl: string = '/no-user.jpg';
  userName: string = '';
  role = localStorage.getItem('role') || null;
  companyCode = localStorage.getItem('companyCode') || 'XS41b';
  daysLeft = 0;
  // currentPageTitle = inject(CurrentPageService);
  isAdminDefault: boolean = false;

  // Permission properties
  // offersAlertsPermissions: Permissions = {
  // canView: false,
  // canCreate: false,
  // canEdit: false,
  // canDelete: false,
  // canPrint: false,
  // };

  constructor(private router: Router) {
    // Subscribe to router events to update active based on the URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.active = event.url;
      }
    });
  }

  ngOnInit() {
    this.lang = localStorage.getItem('language') || 'en';
    // Set initial active value based on the current URL
    this.active = this.router.url;

    // this.profileService.userData$.subscribe((res) => {
    //   if (res) {
    //     // localStorage.setItem('SmsProviderId', res.SmsProviderId)
    //     localStorage.setItem('isSms', res.isSms)
    //     this.profileUrl = res.path
    //       ? `${environment.imageUrl}${res.path}`
    //       : '/no-user.jpg';

    //     this.userName = this.dir === 'ltr' ? res.nameEn : res.nameAr;
    //   }

    // });

    // if (this.role !== 'SuperAdmin') {
    //   this.profileService.daysLeft().subscribe((res: any) => {
    //     this.daysLeft = res.data;

    //   });
    // }

    // Subscribe to profile data to get module permissions
    // this.profileService.userData$.subscribe((profile) => {
    //   if (profile && profile.modulePermissions) {
    //     this.offersAlertsPermissions = updatePermissions(
    //       profile.modulePermissions,
    //       Modules.OFFERSANDALERTS
    //     );
    //     this.isAdminDefault = profile.isAdminDefault;
    //   }
    // });
  }

  openNotifications(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const top = rect.top + window.scrollY + rect.height + 10; // Adjust the top position
    const left = rect.left + window.scrollX - 150; // Adjust the left position
    //   this.dialog.open(NotificationsListComponent, {
    //     autoFocus: false,
    //     position: { top: `${top}px`, left: `${left}px` },
    //     panelClass: 'small-dialog',
    //     data: {},
    //   });
  }

  switchLanguage() {
    // Get the current language from local storage
    const currentLanguage = localStorage.getItem('language');

    // Toggle between 'ar' and 'eng'
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    // Set the new language in local storage
    localStorage.setItem('language', newLanguage);

    // Refresh the page
    window.location.reload();
  }

  copy(event: MouseEvent) {
    event.stopPropagation();
    this.alert.showAlert('academy_id_copied');
  }

  logout() {
    // this.authService.logout();
  }
}
