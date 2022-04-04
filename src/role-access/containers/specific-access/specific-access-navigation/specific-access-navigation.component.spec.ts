import { ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromRoot from '../../../../app/store/reducers';
import { SpecificAccessNavigationEvent } from '../../../models';
import * as fromStore from '../../../store';
import { SpecificAccessNavigationComponent } from './specific-access-navigation.component';

describe('ExclusionNavigationComponent', () => {
  let fixture: ComponentFixture<SpecificAccessNavigationComponent>;
  let component: SpecificAccessNavigationComponent;
  let store: Store<fromStore.State>;
  let storePipeMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromStore.reducers),
        }),
      ],
      declarations: [
        SpecificAccessNavigationComponent
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    storePipeMock = spyOn(store, 'pipe');

    fixture = TestBed.createComponent(SpecificAccessNavigationComponent);
    component = fixture.componentInstance;
    component.navigationCurrentState$ = storePipeMock.and.returnValue(of(0));
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

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
