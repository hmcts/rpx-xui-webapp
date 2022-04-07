import { SpecificAccessFormData, SpecificAccessState } from '../../models';
import * as fromActions from '../actions/specific-access.action';
import * as fromReducer from './specific-access.reducer';
describe('Specific Access Reducer', () => {

  describe('Actions', () => {

    describe('Change Navigation action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.specificAccessInitialState;
        const action = new fromActions.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_REVIEW);
        const specificAccessState = fromReducer.specificAccessReducer(initialState, action);
        expect(specificAccessState.state).toEqual(SpecificAccessState.SPECIFIC_ACCESS_REVIEW);
      });

      it('should set correct object', () => {
        const initialState = fromReducer.specificAccessInitialState;
        const specificAccessFormData: SpecificAccessFormData ={
              specificAccessDurationForm:{
                selectedDuration:{},
                selectedOption:1
              }
        }
        const action = new fromActions.SetSpecificAccessFormData(specificAccessFormData);
        const specificAccessState = fromReducer.specificAccessReducer(initialState, action);
        expect(specificAccessState.specificAccessFormData).toEqual(specificAccessFormData);
      });
    });
  });

});
