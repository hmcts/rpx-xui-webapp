import { ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { NocNavigationEvent } from 'src/noc/models/noc-navigation-event.enum';
import * as fromRoot from '../../../app/store/reducers';
import * as fromNocStore from '../../store';
import { NocNavigationComponent } from './noc-navigation.component';

describe('NocNavigationComponent', () => {
  let fixture: ComponentFixture<NocNavigationComponent>;
  let component: NocNavigationComponent;
  let store: Store<fromNocStore.State>;
  let storePipeMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromNocStore.reducers),
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
    component.nocNavigationCurrentState$ = storePipeMock.and.returnValue(of(0));
    fixture.detectChanges();
  });

  describe('isVisible', () => {
    it('should determine button visible if correct state', () => {
      const expected = component.isVisible(0, [0, 1, 2, 3]);
      expect(expected).toBeTruthy();
    });

    it('should determine button invisible if incorrect state', () => {
      const expected = component.isVisible(5, [0, 1, 2, 3]);
      expect(expected).toBeFalsy();
    });
  });

  describe('onEventTrigger', () => {
    it('should emit', () => {
      const backSpy = spyOn(component.onEvent, 'emit');
      component.onEventTrigger(NocNavigationEvent.BACK);
      expect(backSpy).toHaveBeenCalledWith(NocNavigationEvent.BACK);
    });
  });

});
