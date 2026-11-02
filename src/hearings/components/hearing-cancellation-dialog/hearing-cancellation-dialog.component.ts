import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: false,
  selector: 'exui-hearing-cancellation-dialog',
  templateUrl: './hearing-cancellation-dialog.component.html',
  styleUrls: ['./hearing-cancellation-dialog.component.scss'],
})
export class HearingCancellationDialogComponent {
  constructor(public readonly dialogRef: MatDialogRef<HearingCancellationDialogComponent, boolean>) {}
}
