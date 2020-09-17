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

    it('should emitNavigate', () => {
        const event = {};
        const emitter = jasmine.createSpyObj('emitter', ['emit']);
        component.emitNavigate(event, emitter);
        expect(emitter.emit).toHaveBeenCalled();
    });
});
