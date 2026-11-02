import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { HearingCancellationDialogComponent } from '../components/hearing-cancellation-dialog/hearing-cancellation-dialog.component';

@Injectable({ providedIn: 'root' })
export class HearingCancellationService {
  constructor(private readonly dialog: MatDialog) {}

  public confirm(onConfirmed: () => void): void {
    if (this.dialog.getDialogById('hearing-cancellation')) {
      return;
    }

    this.dialog
      .open(HearingCancellationDialogComponent, {
        id: 'hearing-cancellation',
        width: '568px',
        maxWidth: 'calc(100vw - 32px)',
        ariaLabelledBy: 'hearing-cancellation-title',
        ariaDescribedBy: 'hearing-cancellation-message',
        autoFocus: '#hearing-cancellation-no',
        restoreFocus: true,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed: boolean) => {
        if (confirmed === true) {
          onConfirmed();
        }
      });
  }
}
