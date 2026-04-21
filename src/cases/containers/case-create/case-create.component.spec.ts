import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import * as fromCases from '../../store';
import { CasesCreateComponent } from './case-create.component';

describe('CaseCreateComponent', () => {
  let component: CasesCreateComponent;
  let fixture: ComponentFixture<CasesCreateComponent>;
  const caseCreateInputs = { jurisdictionId: 'IA', caseTypeId: 'Asylum', eventId: 'createCase' };

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CasesCreateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false },
      providers: [
        provideMockStore({
          selectors: [{ selector: fromCases.getCreateCaseFilterState, value: caseCreateInputs }],
        }),
      ],
    })
      .overrideComponent(CasesCreateComponent, {
        set: { template: '' },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should call unsubscribe on ngDestroy', () => {
    const subscription = jasmine.createSpyObj('myObject', ['unsubscribe']);

    component.unSubscribe(subscription);
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should not call unsubscribe when no subscription', () => {
    const subscription = jasmine.createSpyObj('myObject', ['unsubscribe']);

    component.unSubscribe(null);
    expect(subscription.unsubscribe).not.toHaveBeenCalled();
  });
});
