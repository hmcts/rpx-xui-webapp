import { HeaderComponent } from './header.component';
import { Subscription } from 'rxjs';


describe('Header Component', () => {
    let mockStore: any;
    let mockService: any;
    let component: HeaderComponent;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('store', ['pipe']);
        mockService = jasmine.createSpyObj('service', ['get']);
        component = new HeaderComponent(mockStore, mockService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should unsubscribe', () => {
        const subscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
        component.unsubscribe(subscription);
        expect(subscription.unsubscribe).toHaveBeenCalled();
    });

    it('should emitNavigate', () => {
        const event = {};
        const emitter = jasmine.createSpyObj('emitter', ['emit']);
        component.emitNavigate(event, emitter);
        expect(emitter.emit).toHaveBeenCalled();
    });

    it('get Is CaseManager', () => {
        let isCase = component.getIsCaseManager('pui-case-manager,someotherRole');
        expect(isCase).toEqual(true);
        isCase = component.getIsCaseManager('somerole1,someotherRole2');
        expect(isCase).toEqual(false);
    });

    it('should getObservable', () => {
        component.getObservable(mockStore);
        expect(mockStore.pipe).toHaveBeenCalled();
    });
});
