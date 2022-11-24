import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActions from '../../../app/store';
import { NoResultsMessageId } from '../../../search/enums';
import { SearchParameters } from '../../../search/models';
import { SearchService } from '../../../search/services/search.service';
import { SearchValidators } from '../../../search/utils';
import { NavItemsModel } from '../../models/nav-item.model';
import { CaseReferenceSearchBoxComponent } from './case-reference-search-box.component';

import createSpyObj = jasmine.createSpyObj;

describe('ExuiCaseReferenceSearchBoxComponent', () => {
  let component: CaseReferenceSearchBoxComponent;
  let fixture: ComponentFixture<CaseReferenceSearchBoxComponent>;
  let searchService: jasmine.SpyObj<SearchService>;
  let router: Router;
  let route: ActivatedRoute;
  let store: Store<fromActions.State>;
  let storeMock: jasmine.SpyObj<Store<fromActions.State>>;
  const formBuilder = new FormBuilder();
  const item: NavItemsModel = {
    text: 'Find',
    href: '',
    active: true
  };
  const searchParameters: SearchParameters = {
    caseReferences: ['1234123412341234'],
    CCDJurisdictionIds: ['TEST'],
    otherReferences: ['Abc'],
    fullName: 'Test test',
    address: '102 Petty France',
    postcode: 'SW1H 9AJ',
    emailAddress: 'test@example.com',
    dateOfBirth: '1980-10-01',
    dateOfDeath: '2020-02-02'
  };

  const result = {
    resultInfo: {
      casesReturned: 1,
      caseStartRecord: 1,
      moreResultsToGo: false
    },
    results: [{
      stateId: 'CASE_PROGRESSION',
      processForAccess: 'NONE',
      caseReference: '1234123412341234',
      otherReferences: [],
      baseLocationId: '214320',
      regionId: '4',
      regionName: 'North West',
      CCDJurisdictionId: 'CIVIL',
      CCDJurisdictionName: 'Civil',
      CCDCaseTypeId: 'CIVIL',
      CCDCaseTypeName: 'Civil'
    }]
  }

  beforeEach(async(() => {
    searchService = createSpyObj<SearchService>('searchService', ['retrieveState', 'storeState']);
    searchService.retrieveState.and.returnValue(searchParameters);

    storeMock = jasmine.createSpyObj('Store', ['dispatch']);
    TestBed.configureTestingModule({
      declarations: [CaseReferenceSearchBoxComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: SearchService, useValue: searchService },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseReferenceSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    route = TestBed.get(ActivatedRoute);
    store = TestBed.get(Store);
    component.item = item;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should decorate 16-digit case reference search box', () => {
    component.decorate16DigitCaseReferenceSearchBoxInHeader = true;
    component.ngOnInit();
    expect(searchService.retrieveState).toHaveBeenCalledTimes(1);
  });

  it('should not decorate 16-digit case reference search box', () => {
    component.decorate16DigitCaseReferenceSearchBoxInHeader = false;
    component.ngOnInit();
    expect(searchService.retrieveState).toHaveBeenCalledTimes(0);
  });

  it('should return to case details page if case found', () => {
    component.formGroup.get('caseReference').setValue('1234123412341234');
    component.onSubmit();

    expect(searchService.storeState).toHaveBeenCalledTimes(1);
    expect(component.formGroup.get('caseReference').invalid).toBe(false);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    router.navigateByUrl('/cases/case-loader').then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/cases/case-details/1234123412341234'], { state: { origin: '16digitCaseReferenceSearchFromHeader' }, relativeTo: route });
    });
  });

  it('should return to case details page if case found from case details page', () => {
    component.navigateToCaseDetails(false, '1234123412341234');
    expect(router.navigate).toHaveBeenCalledWith(['/cases/case-details/1234123412341234'], { state: { origin: '16digitCaseReferenceSearchFromHeader' }, relativeTo: route });
    component.navigateToCaseDetails(true, '1234123412341234');
    router.navigateByUrl('/cases/case-loader').then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/cases/case-details/1234123412341234'], { state: { origin: '16digitCaseReferenceSearchFromHeader' }, relativeTo: route });
    });
  });

  it('should return to no results page if case reference entered is invalid', () => {
    component.formGroup.get('caseReference').setValue('1234');
    component.onSubmit();

    // The case reference entered should be stored as a parameter even if it is invalid
    expect(searchService.storeState).toHaveBeenCalledTimes(1);
    expect(component.formGroup.get('caseReference').invalid).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith(['/search/noresults'], { state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH }, relativeTo: route });
  });

  it('should unsubscribe subscriptions onDestroy', () => {
    component.searchSubscription$ = new Observable().subscribe();
    spyOn(component.searchSubscription$, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.searchSubscription$.unsubscribe).toHaveBeenCalled();
  });

  it('should set the validator for the 16-digit case reference search box', () => {
    spyOn(SearchValidators, 'caseReferenceValidator');
    component.ngOnInit();
    expect(SearchValidators.caseReferenceValidator).toHaveBeenCalled();
  });

  it('should ensure the case reference is sanitised of any separators (spaces and \'-\' characters) before being used in navigation', () => {
    component.formGroup.get('caseReference').setValue('1234 1234-1234 -1234');
    component.onSubmit();

    expect(searchService.storeState).toHaveBeenCalledTimes(1);
    expect(component.formGroup.get('caseReference').invalid).toBe(false);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    router.navigateByUrl('/cases/case-loader').then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/cases/case-details/1234123412341234'], { state: { origin: '16digitCaseReferenceSearchFromHeader' }, relativeTo: route });
    });
  });
});
