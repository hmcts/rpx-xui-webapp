import { Component } from '@angular/core';
import { AppConstants } from '../../../app/app.constants';

@Component({
  standalone: false,
  selector: 'exui-noc-fill-form-offline',
  templateUrl: './noc-fill-form-offline.component.html',
})
export class NocFillFormOfflineComponent {
  public readonly newTabWarningText = AppConstants.NEW_TAB_WARNING_TEXT;
}
