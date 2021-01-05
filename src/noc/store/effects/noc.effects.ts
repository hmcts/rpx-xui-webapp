import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../../../app/store/actions';
import { NocHttpError } from '../../models';
import { NocService } from '../../services';
import * as nocActions from '../actions/noc.action';

@Injectable()
export class NocEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly nocService: NocService,
    ) { }

    @Effect()
    public setCaseReference$ = this.actions$.pipe(
      ofType(nocActions.SET_CASE_REFERENCE),
      map((action: nocActions.SetCaseReference) => action.payload),
      switchMap(payload => {
        const caseReference = payload ? payload.replace(/-/g, '').replace(/ /g, '') : payload = '' ;

        if (caseReference.length === 16) {

          return this.nocService.getNoCQuestions(caseReference).pipe(
            map(
              (response) => new nocActions.SetQuestions({questions: response, caseReference})),
              catchError(error => {
                return NocEffects.handleError(error, nocActions.SET_CASE_REFERENCE);
              })
          );
        } else {
          return of(new nocActions.SetCaseRefValidationFailure());
        }
      })
    );

    @Effect()
    public setAnswers$ = this.actions$.pipe(
      ofType(nocActions.SET_ANSWERS),
      map((action: nocActions.SetAnswers) => action.payload),
      switchMap(payload => {

        const {nocAnswers} = payload;

        if (nocAnswers.length !== 0) {

          return this.nocService.validateNoCAnswers(payload).pipe(
            map(
              (response) => new nocActions.CheckAnswers(nocAnswers)),
              catchError(error => {
                return NocEffects.handleError(error, nocActions.SET_ANSWERS);
              })
          );
        } else {
          return of(new nocActions.SetAnswersIncomplete());
        }
      })
    );

    @Effect()
    public submitNoc$ = this.actions$.pipe(
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
            catchError(error => {
              return NocEffects.handleError(error, nocActions.SUBMIT_NOC);
            })
        );
      })
    );

    public static handleError(error: NocHttpError, action: string): Observable<Action> {
      if (error && error.status && error.status === 400) {
        switch (action) {
          case nocActions.SET_CASE_REFERENCE:
            return of(new nocActions.SetCaseRefSubmissionFailure(error));
          case nocActions.SET_ANSWERS:
            return of(new nocActions.SetAnswerSubmissionFailure(error));
          case nocActions.SUBMIT_NOC:
            return of(new nocActions.SetSubmissionFailure(error));
          default:
            return of(new fromActions.Go({ path: ['/service-down'] }));
        }
      } else {
        return of(new fromActions.Go({ path: ['/service-down'] }));
      }
    }
}
