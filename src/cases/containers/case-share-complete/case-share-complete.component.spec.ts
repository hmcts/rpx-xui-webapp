import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../../app/store/reducers';
import { CaseShareCompleteComponent } from './case-share-complete.component';

describe('CaseShareCompleteComponent', () => {
  let component: CaseShareCompleteComponent;
  let fixture: ComponentFixture<CaseShareCompleteComponent>;

  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ CaseShareCompleteComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CaseShareCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if pending', () => {
    const sharedCases = [{
      caseId: '9417373995765133',
      caseTitle: 'Sam Green Vs Williams Lee',
      sharedWith: [
        {
          idamId: 'u666666',
          firstName: 'Kate',
          lastName: 'Grant',
          email: 'kate.grant@lambbrooks.com'
        }],
      pendingUnshares: [
        {
          idamId: 'u777777',
          firstName: 'Nick',
          lastName: 'Rodrigues',
          email: 'nick.rodrigues@lambbrooks.com'
        }]
    }];
    component.isLoading = true;
    const returnValue = component.checkIfIncomplete(sharedCases);
    expect(returnValue).toEqual('PENDING');
  });

  it('should check if complete', () => {
    const sharedCases = [{
      caseId: '9417373995765133',
      caseTitle: 'Sam Green Vs Williams Lee',
      sharedWith: [
        {
          idamId: 'u666666',
          firstName: 'Kate',
          lastName: 'Grant',
          email: 'kate.grant@lambbrooks.com'
        }]
    }];
    component.isLoading = true;
    const returnValue = component.checkIfIncomplete(sharedCases);
    expect(returnValue).toEqual('COMPLETE');
  });

  it('should user access block', () => {
    const case1 = {
      caseId: '9417373995765133',
      caseTitle: 'Sam Green Vs Williams Lee',
      sharedWith: [
        {
          idamId: 'u666666',
          firstName: 'Kate',
          lastName: 'Grant',
          email: 'kate.grant@lambbrooks.com'
        }]
    };
    const case2 = {
      caseId: '9417373995765133',
      caseTitle: 'Sam Green Vs Williams Lee',
      pendingShares: [
        {
          idamId: 'u666666',
          firstName: 'Kate',
          lastName: 'Grant',
          email: 'kate.grant@lambbrooks.com'
        }]
    };
    const case3 = {
      caseId: '9417373995765133',
      caseTitle: 'Sam Green Vs Williams Lee',
      pendingUnshares: [
        {
          idamId: 'u666666',
          firstName: 'Kate',
          lastName: 'Grant',
          email: 'kate.grant@lambbrooks.com'
        }]
    };
    expect(component.showUserAccessBlock(case1)).toBeFalsy();
    expect(component.showUserAccessBlock(case2)).toBeTruthy();
    expect(component.showUserAccessBlock(case3)).toBeTruthy();
  });

  it('should tidy up shared case if complete', () => {
    component.completeScreenMode = 'COMPLETE';
    component.ngOnDestroy();
    expect(component.shareCases.length).toEqual(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
