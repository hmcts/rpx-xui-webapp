import { of } from 'rxjs';
import { HeaderComponent } from './header.component';

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

    it('should ngOnInit', () => {
        mockService.get.and.returnValue('pui-case-manager');
        mockStore.pipe.and.returnValue(of('true'));
        component.ngOnInit();
        expect(mockService.get).toHaveBeenCalled();
        expect(component.isCaseManager).toEqual(true);
    });
});
