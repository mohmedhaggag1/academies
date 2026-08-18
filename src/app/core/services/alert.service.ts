import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private snackbar: MatSnackBar,
    // private translate: TranslateService
  ) {}

  showAlert(message: string, type = 'bg-success', duration = 3000) {
    const isRtl = document.dir === 'rtl';
    // const translatedMessage = this.translate.instant(message);
    const translatedMessage = message;

    // Default message modification for bg-success
    const finalMessage = type === 'bg-success' ? `${translatedMessage} 🎉🎊` : translatedMessage;

    if (type === 'bg-success' || type === 'bg-primary' || type === 'bg-danger' || type === 'bg-blue' || type === 'bg-warning') {
      this.snackbar.open(finalMessage, '', {
        duration,
        panelClass: [isRtl ? 'direction-rtl' : 'direction-ltr', type],
      });
    } else {
      this.snackbar.open(message, '', {
        duration: 7000,
        panelClass: type,
      });
    }
  }
}
