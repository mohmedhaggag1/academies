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
    <div class="navbar flex aic jcsb px-3 pt-1 bg-white py-1">
      <!-- <div class="w-10">
        <logo/>
      </div> -->
      <!-- <h3 class="primary">{{currentPageTitle.header() | translate}}</h3> -->
      @if (role != 'SuperAdmin') {
        <p class="danger bold fs-14" *ngIf="daysLeft && daysLeft <= 14">{{'subscription_ends_in_days' | translate:{days: daysLeft} }}</p>
      }
      <div class="flex aic gap-x-2">
        <!-- notification -->
        <!-- @if(offersAlertsPermissions.canView) { -->
        <div class="notification-icon w-2 relative">
          <!-- @if(notificationsService.notifications$ | async; as notifications) {
            @if(notifications.maintenanceCount > 0) {
              <div (click)="openNotifications($event)">
                <div class="notification-badge flex aic jcc p-1 white bg-danger pointer">{{notifications.maintenanceCount}}</div>
                <div class="flex aic mr-2">
                  <img
                    src="assets/images/sidebar/new-notification.svg"
                    width="35px"
                    alt="notifications icon"
                    class="pointer"
                  />
                </div>
              </div>
            } @else {
              <img
                src="assets/images/sidebar/new-notification.svg"
                width="35px"
                alt="notifications icon"
              />
            }
          } -->
        </div>
        <!-- } -->

        <div class="flex aic gap-x-1 border round-25 bg-white px-1 py-50">
          <div class="img-profile">
            <img
              [src]="profileUrl"
              alt="profile picture"
              class="img-profile rounded-50"
            />
          </div>
          <div class="user-name-container">
            <p class="user-name">
              {{ userName }}
            </p>
            @if (role != 'SuperAdmin') {
              <div
                class="w-fit-content flex aic pointer"
                [cdkCopyToClipboard]="companyCode"
                (click)="copy($event)"
              >
                <img
                  src="assets/images/icons/copy.svg"
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
        <button mat-menu-item routerLink="my-profile" routerLinkActive="active">
          <div class="flex aic gap-x-2">
            <img
              src="assets/images/icons/user.svg"
              width="15"
              height="15"
              alt="user icon"
            />
            <p class="bold">{{ 'profile' | translate }}</p>
          </div>
        </button>
        <button
          mat-menu-item
          routerLink="change-password"
          routerLinkActive="active"
        >
          <div class="flex aic gap-x-2">
            <img
              src="assets/images/icons/lock.svg"
              width="15"
              height="15"
              alt="lock icon"
            />
            <p class="bold">{{ 'change_password' | translate }}</p>
          </div>
        </button>
        @if(isAdminDefault && role != 'SuperAdmin') {
          <button
            mat-menu-item
            routerLink="subscription"
            routerLinkActive="active"
          >
            <div class="flex aic gap-x-2">
              <img
                src="assets/images/icons/subscription.svg"
                width="15"
                height="15"
                alt="subscription icon"
              />
              <p class="bold">{{ 'subscription' | translate }}</p>
            </div>
          </button>
        }
        <button mat-menu-item [matMenuTriggerFor]="language">
          <div class="flex aic gap-x-2">
            <img
              src="assets/images/icons/language.svg"
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
              src="assets/images/icons/logout.svg"
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
    // LogoComponent,
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
  profileUrl: string = 'assets/images/no-user.jpg';
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
    //       : 'assets/images/no-user.jpg';

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
    this.alert.showAlert('code_copied');
  }

  logout() {
    // this.authService.logout();
  }
}
