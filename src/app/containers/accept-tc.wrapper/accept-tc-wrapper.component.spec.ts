import { Action } from '@ngrx/store';
import { AcceptTcWrapperComponent } from './accept-tc-wrapper.component';

describe('Accept Tc Wrapper Component', () => {
    let component: AcceptTcWrapperComponent;
    let mockStore: any;
    let mockService: any;
    let mockActions: any;

    class TestAction implements Action {
        type: string;
    }

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch']);
        mockService = jasmine.createSpyObj('mockService', ['get']);
        mockActions = jasmine.createSpyObj('mockActions', ['pipe']);
        component = new AcceptTcWrapperComponent(mockStore, mockService, mockActions);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should unsubscribe', () => {
        const subscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
        component.unsubscribe(subscription);
        expect(subscription.unsubscribe).toHaveBeenCalled();
    });

    it('should dispatchAction', () => {
        const action = new TestAction();
        component.dispatchAction(mockStore, action);
        expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });

    it('should getObservable', () => {
        component.getObservable(mockActions, 'Some Action');
        expect(mockActions.pipe).toHaveBeenCalled();
    });

    it('should onAcceptTandC', () => {
        component.onAcceptTandC();
        expect(mockStore.dispatch).toHaveBeenCalled();
    });
});
