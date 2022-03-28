import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SpecificAccessReviewComponent } from './specific-access-review.component';
import { State } from '../../../../app/store';
import { SpecificAccessNavigationEvent } from '../../../models';
import { Observable } from 'rxjs';

describe('SpecificAccessReviewComponent', () => {
  let component: SpecificAccessReviewComponent;
  let fixture: ComponentFixture<SpecificAccessReviewComponent>;
  let mockStore: MockStore<State>;

  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnStoreDispatch = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SpecificAccessReviewComponent],
      imports: [],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(Store);
    spyOnPipeToStore = spyOn(mockStore, 'pipe').and.callThrough();
    spyOnStoreDispatch = spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(SpecificAccessReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });

  describe('navigation', () => {

    it('should correctly navigate on click of continue button', () => {
      component.navigationHandler(SpecificAccessNavigationEvent.CONTINUE);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });

  });

  describe('onDestroy()', () => {
    it('should unsubscribe', () => {
      component.specificAccessStateDataSub = new Observable().subscribe();
      spyOn(component.specificAccessStateDataSub, 'unsubscribe').and.callThrough();
      component.ngOnDestroy();
      expect(component.specificAccessStateDataSub.unsubscribe).toHaveBeenCalled();
    });
  });
});
