import { SimpleChange, SimpleChanges } from '@angular/core';
import { NocNavigationEvent } from '../../models';
import { NocErrorComponent } from './noc-error.component';

describe('NocErrorComponent', () => {
    let component: NocErrorComponent;
    let store: any;

    beforeEach(() => {
        store = jasmine.createSpyObj('store', ['pipe', 'dispatch']);
        component = new NocErrorComponent(store);
    });

    it('ngOnChanges should trigger navigationHandler', () => {
        const simpleChanges = {} as SimpleChanges;
        simpleChanges.navEvent = {} as SimpleChange;
        component.navEvent.event = NocNavigationEvent.CONTINUE;
        component.ngOnChanges(simpleChanges);
        component.navigationHandler = jasmine.createSpy('navigationHandler');
        expect(store.pipe).toHaveBeenCalled();
    });

    it('navigationHandler should trigger BACK event', () => {
        component.navigationHandler(NocNavigationEvent.BACK);
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('navigationHandler should trigger Continue event', () => {
        component.navigationHandler(NocNavigationEvent.CONTINUE);
        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('navigationHandler should throw an error when trying to SUBMIT with invalid option', () => {
        expect(() => component.navigationHandler(NocNavigationEvent.SUBMIT)).toThrowError('Invalid option');
    });
});
