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

    it('ngOnChanges should retrieve error from store', () => {
        const simpleChanges = {} as SimpleChanges;
        simpleChanges.navEvent = {} as SimpleChange;
        component.navEvent.event = NocNavigationEvent.CONTINUE;
        component.ngOnChanges(simpleChanges);
        expect(store.pipe).toHaveBeenCalled();
    });
});
