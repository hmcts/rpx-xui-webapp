import { HeaderComponent } from './header.component';
import { of } from 'rxjs';


describe('Header Component', () => {
    let mockStore: any;
    let mockService: any;
    let component: HeaderComponent;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('store', ['pipe']);
        mockService = jasmine.createSpyObj('service', ['get']);
        component = new HeaderComponent(mockStore);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // xit('should unsubscribe', () => {
    //     const subscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
    //     component.unsubscribe(subscription);
    //     expect(subscription.unsubscribe).toHaveBeenCalled();
    // });

    it('should emitNavigate', () => {
        const event = {};
        const emitter = jasmine.createSpyObj('emitter', ['emit']);
        component.emitNavigate(event, emitter);
        expect(emitter.emit).toHaveBeenCalled();
    });

    // xit('get Is CaseManager', () => {
    //     let isCase = component.getIsCaseManager('pui-case-manager,someotherRole');
    //     expect(isCase).toEqual(true);
    //     isCase = component.getIsCaseManager('somerole1,someotherRole2');
    //     expect(isCase).toEqual(false);
    // });
    //
    // xit('should getObservable', () => {
    //     component.getObservable(mockStore);
    //     expect(mockStore.pipe).toHaveBeenCalled();
    // });
    //
    // xit('should ngOnInit', () => {
    //     mockService.get.and.returnValue('pui-case-manager');
    //     mockStore.pipe.and.returnValue(of('true'));
    //     component.ngOnInit();
    //     expect(mockService.get).toHaveBeenCalled();
    //     expect(component.isCaseManager).toEqual(true);
    // });
});
