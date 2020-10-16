import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../../../app/store/actions';
import { NocService } from '../../services';
import * as nocActions from '../actions/noc.action';

@Injectable()
export class NocEffects {

    constructor(
        private actions$: Actions,
        private nocService: NocService,
    ) { }

    @Effect()
    setCaseReference$ = this.actions$.pipe(
      ofType(nocActions.SET_CASE_REFERENCE),
      map((action: nocActions.SetCaseReference) => action.payload),
      switchMap(payload => {
        const caseReference = payload ? payload.replace(/-/g, '').replace(/ /g, '') : payload = '' ;

        if (caseReference.length === 16) {

          return this.nocService.getNoCQuestions(payload).pipe(
            map(
              (response) => new nocActions.SetQuestions({questions: response, caseReference})),
              catchError(error => {
                if (error && error.status && NocEffects.is404Or5xxError(error.status)) {
                  return of(new fromActions.Go({ path: ['/service-down'] }));
                } else {
                  return of(new nocActions.SetCaseRefSubmissionFailure(error));
                }
              })
          );
        } else {
          return of(new nocActions.SetCaseRefValidationFailure());
        }
      })
    );

    @Effect()
    setAnswers$ = this.actions$.pipe(
      ofType(nocActions.SET_ANSWERS),
      map((action: nocActions.SetAnswers) => action.payload),
      switchMap(payload => {

        const {nocAnswers} = payload;

        if (nocAnswers.length !== 0) {

          return this.nocService.validateNoCAnswers(payload).pipe(
            map(
              (response) => new nocActions.CheckAnswers(nocAnswers)),
              catchError(error => of(new nocActions.SetAnswerSubmissionFailure(error)))
          );
        } else {
          return of(new nocActions.SetAnswersIncomplete());
        }
      })
    );

    @Effect()
    submitNoc$ = this.actions$.pipe(
      ofType(nocActions.SUBMIT_NOC),
      map((action: nocActions.SubmitNoc) => action.payload),
      switchMap(payload => {

        return this.nocService.submitNoCEvent(payload).pipe(
          map(
            (response: {approval_status?: string}) => {
              if (response.approval_status === 'PENDING') {
                return new nocActions.SetSubmissionSuccessPending();
              } else {
                return new nocActions.SetSubmissionSuccessApproved();
              }

            }),
            catchError(error => of(new nocActions.SetSubmissionFailure(error)))
        );
      })
    );

    public static is404Or5xxError(errorStatus: any): boolean {
      return errorStatus && (errorStatus === 404 || (errorStatus >= 500 && errorStatus < 600));
    }
}
