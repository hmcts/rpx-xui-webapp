import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromNocStore from '../../store';
import { NocAnswerErrorComponent } from './noc-answer-error.component';

describe('NocAnswerErrorComponent', () => {
  let store: MockStore<fromNocStore.State>;
  let component: NocAnswerErrorComponent;
  let fixture: ComponentFixture<NocAnswerErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocAnswerErrorComponent ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocAnswerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
