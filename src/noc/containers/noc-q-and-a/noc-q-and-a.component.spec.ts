import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
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
});
