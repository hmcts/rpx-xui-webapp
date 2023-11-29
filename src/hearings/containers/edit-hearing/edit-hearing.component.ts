import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';

@Component({
  selector: 'exui-edit-hearing',
  templateUrl: './edit-hearing.component.html'
})
export class EditHearingComponent implements OnInit {
  public showSpinner$: Observable<boolean>;
  public validationErrors: { id: string, message: string }[] = [];

  constructor(private readonly loadingService: LoadingService) {
  }

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
    this.loadingService.unregister(loadingToken);
  }
}
