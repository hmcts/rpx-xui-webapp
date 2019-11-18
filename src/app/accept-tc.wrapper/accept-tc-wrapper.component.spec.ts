import { AcceptTcWrapperComponent } from '../components';
import { Subscription, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

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

    it('should getCookieValueForKey', () => {

        mockService.get.and.returnValue('someValue');
        const result = component.getCookieValueForKey('key', mockService);
        result.subscribe(value => {
            console.log(value);
            expect(value).toEqual('someValue');
        });
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
