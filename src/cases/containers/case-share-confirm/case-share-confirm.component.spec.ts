import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../../app/store/reducers';
import { CaseShareConfirmComponent } from './case-share-confirm.component';

describe('CaseShareConfirmComponent', () => {
  let component: CaseShareConfirmComponent;
  let fixture: ComponentFixture<CaseShareConfirmComponent>;

  let store: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ CaseShareConfirmComponent ],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CaseShareConfirmComponent);
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
