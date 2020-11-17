import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as fromContainers from '../../containers';
import { NocNavigationEvent, NocState } from '../../models';
import * as fromNocStore from '../../store';
import { UtilsModule } from '../noc-field/utils/utils.module';
import { NocCaseRefComponent } from './noc-case-ref.component';

describe('NocCaseRefComponent', () => {
  let fixture: ComponentFixture<NocCaseRefComponent>;
  let component: NocCaseRefComponent;
  let store: MockStore<fromNocStore.State>;
  let storePipeMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        UtilsModule
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
    storePipeMock.and.returnValue(of(NocState.START));
    fixture = TestBed.createComponent(NocCaseRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onSubmit', () => {
    it('should call navigationHandler', () => {
        const navigationHandlerSpy = spyOn(component, 'navigationHandler');
        component.navEvent = {
          event: NocNavigationEvent.CONTINUE,
          timestamp: 0
        };
        component.onSubmit();
        expect(navigationHandlerSpy).toHaveBeenCalledWith(NocNavigationEvent.CONTINUE);
    });

  });

  describe('mainErrorHandler', () => {
    it('should return an error object', () => {
        const action = component.mainErrorHandler({message: 'dummy', status: 0}, 'dummyId');
        const expected = [{
            id: 'dummyId',
            message: 'dummy'
          }];
        expect(action).toEqual(expected);
    });

  });

  describe('navigationHandler', () => {
    it('should dispatch an action', () => {

        const storeDispatchMock = spyOn(store, 'dispatch');
        component.navigationHandler(NocNavigationEvent.CONTINUE);

        expect(storeDispatchMock).toHaveBeenCalled();
    });

  });

});
