import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as fromContainers from '../../containers';
import { NocNavigationEvent, NocState } from '../../models';
import * as fromNocStore from '../../store';
import { NocHomeComponent } from './noc-home.component';

describe('NocHomeComponent', () => {
  let fixture: ComponentFixture<NocHomeComponent>;
  let component: NocHomeComponent;
  let store: MockStore<fromNocStore.State>;
  let storePipeMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        ...fromContainers.containers
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    storePipeMock = spyOn(store, 'pipe');

    fixture = TestBed.createComponent(NocHomeComponent);
    component = fixture.componentInstance;
    storePipeMock.and.returnValue(of(0));
    fixture.detectChanges();
  });

  describe('onNavEvent', () => {
    it('should set navEvent', () => {
      component.onNavEvent(NocNavigationEvent.CONTINUE);
      expect(component.navEvent.event).toEqual(NocNavigationEvent.CONTINUE);
    });

  });

  describe('isComponentVisible', () => {
    it('should determine visibility true', () => {
      const expected = component.isComponentVisible(NocState.START, [NocState.START, NocState.QUESTION]);
      expect(expected).toBeTruthy();
    });

  });

  describe('isComponentVisible', () => {
    it('should determine visibility false', () => {
      const expected = component.isComponentVisible(NocState.START, [NocState.CHECK_ANSWERS, NocState.QUESTION]);
      expect(expected).toBeFalsy();
    });

  });

});
