import { HeaderComponent } from './header.component';

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

    it('should call emitNavigate with event and this.navigate', () => {

      const event = {};
      spyOn(component, 'emitNavigate');

      component.onNavigate(event);
      expect(component.emitNavigate).toHaveBeenCalled();
    });

    it('should emitNavigate', () => {

        const event = {};
        const emitter = jasmine.createSpyObj('emitter', ['emit']);
        component.emitNavigate(event, emitter);
        expect(emitter.emit).toHaveBeenCalled();
    });
});
