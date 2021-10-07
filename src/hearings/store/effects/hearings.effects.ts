import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HearingsService } from '../../services/hearings.service';

@Injectable()
export class HearingsEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly hearingsService: HearingsService,
    ) { }
}
