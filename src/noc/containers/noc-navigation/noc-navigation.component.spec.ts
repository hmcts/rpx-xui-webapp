import { ComponentFixture, TestBed } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { NocNavigationComponent } from './noc-navigation.component';
import * as fromNocNavigationStore from '../../store';
import * as fromRoot from '../../../app/store/reducers';
import { of } from 'rxjs';

describe('NocNavigationComponent', () => {
  let fixture: ComponentFixture<NocNavigationComponent>;
  let component: NocNavigationComponent;
  let store: Store<fromNocNavigationStore.NocNavigationState>;
  let storePipeMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromNocNavigationStore.reducers),
        }),
      ],
      declarations: [
        NocNavigationComponent
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    storePipeMock = spyOn(store, 'pipe');

    fixture = TestBed.createComponent(NocNavigationComponent);
    component = fixture.componentInstance;
    component.nocNavigationPreviousState$ = storePipeMock.and.returnValue(of('P'));
    component.nocNavigationCurrentState$ = storePipeMock.and.returnValue(of('C'));
    component.nocNavigationNextState$ = storePipeMock.and.returnValue(of('N'));
    fixture.detectChanges();
  });

  describe('isVisible', () => {
    it('should determine button visible if correct state', () => {
      const expected = component.isVisible('C', ['F', 'G', 'C', 'D']);
      expect(expected).toBeTruthy();
    });

    it('should determine button invisible if incorrect state', () => {
      const expected = component.isVisible('X', ['F', 'G', 'C', 'D']);
      expect(expected).toBeFalsy();
    });
  });

  describe('onBack', () => {
    it('should emit', () => {
      const backSpy = spyOn(component.back, 'emit');
      component.onBack({});
      expect(backSpy).toHaveBeenCalledWith({});
    });
  });

  describe('onContinue', () => {
    it('should emit', () => {
      const continueSpy = spyOn(component.continue, 'emit');
      component.onContinue({});
      expect(continueSpy).toHaveBeenCalledWith({});
    });

    describe('onSubmit', () => {
      it('should emit', () => {
        const submitSpy = spyOn(component.submit, 'emit');
        component.onSubmit({});
        expect(submitSpy).toHaveBeenCalledWith({});
      });
    });
  });

});
