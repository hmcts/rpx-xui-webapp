import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../../app/store/reducers';
import { CaseShareComponent } from './case-share.component';

describe('CaseShareComponent', () => {
  let component: CaseShareComponent;
  let fixture: ComponentFixture<CaseShareComponent>;

  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ CaseShareComponent ],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CaseShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
