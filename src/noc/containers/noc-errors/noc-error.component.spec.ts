import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MockStore } from '@ngrx/store/testing';
import { NocNavigationEvent } from '../../models';
import * as fromNocStore from '../../store';
import { NocErrorComponent } from './noc-error.component';

describe('NocHomeComponent', () => {
    let component: NocErrorComponent;
    let store: any;

    beforeEach(() => {
        store = jasmine.createSpyObj('store', ['pipe', 'dispatch']);
        component = new NocErrorComponent(store);
    });

    it('ngOnChanges', () => {
        const simpleChanges = {} as SimpleChanges;
        simpleChanges.navEvent = {} as SimpleChange;
        component.navEvent.event = NocNavigationEvent.CONTINUE;
        component.ngOnChanges(simpleChanges);
        component.navigationHandler = jasmine.createSpy('navigationHandler');
        expect(store.pipe).toHaveBeenCalled();
    });

    it('navigationHandler CONTINUE', () => {
        component.navigationHandler(NocNavigationEvent.BACK);
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('navigationHandler BACK', () => {
        component.navigationHandler(NocNavigationEvent.CONTINUE);
        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('navigationHandler SUBMIT', () => {
        expect(() => component.navigationHandler(NocNavigationEvent.SUBMIT)).toThrowError('Invalid option');
    });
});
