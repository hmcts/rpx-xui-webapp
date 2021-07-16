import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class ExclusionEffects {
  private payload: any;

  constructor(
    private actions$: Actions,
  ) {
  }

}
