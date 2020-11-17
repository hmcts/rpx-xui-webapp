import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromNocStore from '../../store';
import { NocCheckAndSubmitComponent } from './noc-check-and-submit.component';

describe('NocCheckAndSubmitComponent', () => {
  let store: MockStore<fromNocStore.State>;
  let component: NocCheckAndSubmitComponent;
  let fixture: ComponentFixture<NocCheckAndSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NocCheckAndSubmitComponent ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocCheckAndSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
