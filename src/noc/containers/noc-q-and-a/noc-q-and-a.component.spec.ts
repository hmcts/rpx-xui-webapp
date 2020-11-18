import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NocNavigationEvent } from 'src/noc/models';
import * as fromNocStore from '../../store';
import { NocErrorPipe } from '../noc-field/utils';
import { NocQAndAComponent } from './noc-q-and-a.component';

describe('NocQAndAComponent', () => {
  const FORM_GROUP = new FormGroup({});
  let store: MockStore<fromNocStore.State>;
  let component: NocQAndAComponent;
  let fixture: ComponentFixture<NocQAndAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NocQAndAComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore(),
        NocErrorPipe
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocQAndAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.formGroup = FORM_GROUP;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigationHandler', () => {
    const FORM_GROUP_WITH_ANSWERS = new FormGroup({
      question1: new FormControl('An answer'),
      question2: new FormControl('Another answer')
    });
    const caseReference = '1111222233334444';

    beforeEach(() => {
      component.formGroup = FORM_GROUP_WITH_ANSWERS;
      component.nocCaseReference = caseReference;
    });

    it('should handle the SET_ANSWERS NoC navigation event and set the question answers on the store', () => {
      component.navigationHandler(NocNavigationEvent.SET_ANSWERS);
      expect(store.dispatch).toHaveBeenCalledWith(new fromNocStore.SetAnswers({
        caseReference,
        nocAnswers: [
          {
            question_id: 'question1',
            value: 'An answer'
          },
          {
            question_id: 'question2',
            value: 'Another answer'
          }
        ]
      }));
    });

    afterEach(() => {
      component = null;
      fixture.destroy();
    });
  });
});
