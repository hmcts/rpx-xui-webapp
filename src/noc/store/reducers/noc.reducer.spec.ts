import { NocState } from '../../models';
import * as fromActions from '../actions/noc.action';
import * as fromReducer from './noc.reducer';

describe('Noc Reducer', () => {

    describe('Actions', () => {

        it('should set correct object', () => {
            const initialState = fromReducer.initialState;
            const action = new fromActions.ChangeNavigation(NocState.START);
            const state = fromReducer.nocReducer(initialState, action);
            expect(state).toBeDefined();
        });

        describe('Change Navigation action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.ChangeNavigation(NocState.QUESTION);
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.state).toEqual(NocState.QUESTION);
            });
        });

        describe('Reset action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.Reset();
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState).toEqual(initialState);
            });
        });

        describe('SetCaseRefValidationFailure action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.SetCaseRefValidationFailure();
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.state).toEqual(NocState.CASE_REF_VALIDATION_FAILURE);
            });
        });

        describe('SetQuestions action', () => {	
            it('should set correct object', () => {	
                const initialState = fromReducer.initialState;	
                const action = new fromActions.SetQuestions({
                    questions: [{	
                        displayOrder: 0,	
                        answerType: null,	
                        displayContext: null,	
                        questionLabel: 'dummy'	
                    }],
                    caseReference: 'abcd'
                });
                const nocState = fromReducer.nocReducer(initialState, action);	
                expect(nocState.state).toEqual(NocState.QUESTION);	
                expect(nocState.questions[0].questionLabel).toEqual('dummy');
                expect(nocState.caseReference).toEqual('abcd');
            });	
        });

        describe('SetCaseRefSubmissionFailure action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.SetCaseRefSubmissionFailure({
                    responseCode: 400,
                    message: 'dummy'
                });
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.state).toEqual(NocState.CASE_REF_SUBMISSION_FAILURE);
                expect(nocState.lastError.responseCode).toEqual(400);
                expect(nocState.lastError.message).toEqual('dummy');
            });
        });

        describe('SetAnswersIncomplete action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.SetAnswersIncomplete();
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.state).toEqual(NocState.ANSWER_INCOMPLETE);
            });
        });

        describe('CheckAnswers action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.CheckAnswers([{
                    displayOrder: 0,
                    answer: 'dummy'
                }]);
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.state).toEqual(NocState.CHECK_ANSWERS);
                expect(nocState.answers[0].answer).toEqual('dummy');
            });
        });

        describe('SetAffirmationAgreed action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.SetAffirmationAgreed(true);
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.affirmationAgreed).toEqual(true);
            });
        });

        describe('SetSubmissionSuccessApproved action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.SetSubmissionSuccessApproved();
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.state).toEqual(NocState.SUBMISSION_SUCCESS_APPROVED);
            });
        });

        describe('SetSubmissionSuccessPending action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.SetSubmissionSuccessPending();
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.state).toEqual(NocState.SUBMISSION_SUCCESS_PENDING);
            });
        });

        describe('SetSubmissionFailure action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.SetSubmissionFailure({
                    responseCode: 400,
                    message: 'dummy'
                });
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.state).toEqual(NocState.SUBMISSION_FAILURE);
                expect(nocState.lastError.responseCode).toEqual(400);
                expect(nocState.lastError.message).toEqual('dummy');
            });
        });
    });

    describe('Get functions', () => {
        it('should get state properties', () => {
            const nocState = {
                state: NocState.ANSWER_INCOMPLETE
            };
            expect(fromReducer.getNocActiveState(nocState)).toEqual(NocState.ANSWER_INCOMPLETE);
        });

        it('should get last error', () => {
            const nocState = {
                lastError: {
                    responseCode: 400,
                    message: 'dada'
                }
            };
            const expected = {
                responseCode: 400,
                message: 'dada'
            };
            expect(fromReducer.getLastError(nocState)).toEqual(expected);
        });

        it('should get questions', () => {
            const nocState = {
                questions: [{
                    displayOrder: 0,
                    answerType: null,
                    displayContext: null,
                    questionLabel: 'dummy'
                }]
            };
            const expected = [{
                displayOrder: 0,
                answerType: null,
                displayContext: null,
                questionLabel: 'dummy'
            }];
            expect(fromReducer.getQuestions(nocState)).toEqual(expected);
        });

        it('should get answers', () => {
            const nocState = {
                answers: [{
                    displayOrder: 0,
                    answer: 'dummy'
                }]
            };
            const expected = [{
                displayOrder: 0,
                answer: 'dummy'
            }];
            expect(fromReducer.getAnswers(nocState)).toEqual(expected);
        });

        it('should get Affirmation Agreed', () => {
            const nocState = {
                affirmationAgreed: false
            };
            const expected = false;
            expect(fromReducer.getAffirmationAgreed(nocState)).toEqual(expected);
        });
    });
});
