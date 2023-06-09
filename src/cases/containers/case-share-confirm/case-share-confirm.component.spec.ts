import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { CaseShareConfirmComponent } from './case-share-confirm.component';

describe('CaseShareConfirmComponent', () => {
  let component: CaseShareConfirmComponent;
  let fixture: ComponentFixture<CaseShareConfirmComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CaseShareConfirmComponent],
      providers: [
        provideMockStore(), LoadingService
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
