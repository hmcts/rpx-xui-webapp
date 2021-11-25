import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromActions from '../../../app/store';
import { NoResultsMessageId, ProcessForAccessType } from '../../../search/enums';
import { SearchParameters, SearchResult } from '../../../search/models';
import { SearchService } from '../../../search/services/search.service';
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
  const storeMock = jasmine.createSpyObj('Store', [
    'dispatch'
  ]);
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
  const searchResultWithNoCases: SearchResult = {
    resultInfo: {
      caseStartRecord: 1,
      casesReturned: 0,
      moreResultsToGo: false
    },
    results: []
  };
  const searchResultWithCaseList: SearchResult = {
    resultInfo: {
      caseStartRecord: 1,
      casesReturned: 2,
      moreResultsToGo: false
    },
    results: [
      {
        CCDCaseTypeId: 'FT_GlobalSearch',
        CCDCaseTypeName: null,
        CCDJurisdictionId: 'BEFTA_MASTER',
        CCDJurisdictionName: 'BEFTA Master',
        HMCTSServiceId: null,
        HMCTSServiceShortDescription: null,
        baseLocationId: null,
        baseLocationName: null,
        caseManagementCategoryId: null,
        caseManagementCategoryName: null,
        caseNameHmctsInternal: 'Derrick Rega',
        caseReference: '1234123412341234',
        otherReferences: null,
        processForAccess: ProcessForAccessType.SPECIFIC,
        regionId: null,
        regionName: null,
        stateId: 'CaseCreated'
      },
      {
        CCDCaseTypeId: 'FT_GlobalSearch',
        CCDCaseTypeName: null,
        CCDJurisdictionId: 'BEFTA_MASTER',
        CCDJurisdictionName: 'BEFTA Master',
        HMCTSServiceId: null,
        HMCTSServiceShortDescription: null,
        baseLocationId: null,
        baseLocationName: null,
        caseManagementCategoryId: null,
        caseManagementCategoryName: null,
        caseNameHmctsInternal: 'Lea Mangan',
        caseReference: '0598538510201905',
        otherReferences: null,
        processForAccess: ProcessForAccessType.CHALLENGED,
        regionId: null,
        regionName: null,
        stateId: 'CaseCreated'
      }
    ]
  };

  beforeEach(async(() => {
    searchService = createSpyObj<SearchService>('searchService', ['getResults', 'retrieveState', 'storeState']);
    searchService.getResults.and.returnValue(of(searchResultWithCaseList));
    searchService.retrieveState.and.returnValue(searchParameters);
    searchService.storeState.and.returnValue({});
    TestBed.configureTestingModule({
      declarations: [ CaseReferenceSearchBoxComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpClientModule, RouterTestingModule ],
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

  it('should decorate 16 digit case reference search box', () => {
    component.decorate16DigitCaseReferenceSearchBoxInHeader = true;
    component.ngOnInit();
    expect(searchService.retrieveState).toHaveBeenCalledTimes(1);
  });

  it('should not decorate 16 digit case reference search box', () => {
    component.decorate16DigitCaseReferenceSearchBoxInHeader = false;
    component.ngOnInit();
    expect(searchService.retrieveState).toHaveBeenCalledTimes(0);
  });

  it('should return to case details page if case found', () => {
    component.formGroup.get('caseReference').setValue('1234123412341234');
    component.onSubmit();

    expect(searchService.storeState).toHaveBeenCalledTimes(1);
    expect(searchService.getResults).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/cases/case-details/1234123412341234'], { relativeTo: route });
  });

  it('should return to no results page if case not found', () => {
    searchService.getResults.and.returnValue(of(searchResultWithNoCases));
    component.formGroup.get('caseReference').setValue('1234');
    component.onSubmit();

    expect(searchService.storeState).toHaveBeenCalledTimes(1);
    expect(searchService.getResults).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/search/noresults'], { state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH } });
  });

  it('should unsubscribe subscriptions onDestroy', () => {
    component.searchSubscription$ = new Observable().subscribe();
    spyOn(component.searchSubscription$, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.searchSubscription$.unsubscribe).toHaveBeenCalled();
  });
});
