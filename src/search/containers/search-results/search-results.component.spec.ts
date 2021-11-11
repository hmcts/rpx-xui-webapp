import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { SearchResult } from 'src/search/models';
import { SearchResultsComponent } from './search-results.component';

import createSpyObj = jasmine.createSpyObj;

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  const formBuilder = new FormBuilder();
  let searchService: jasmine.SpyObj<SearchService>;
  let router: Router;
  let route: ActivatedRoute;

  const searchResultWithNoCases: SearchResult = {
    resultInfo: {
      caseStartRecord: 1,
      casesReturned: 0,
      moreResultsToGo: false
    },
    results: null
  }

  const searchResultWithCaseList: SearchResult = {
    resultInfo: {
      caseStartRecord: 1,
      casesReturned: 2,
      moreResultsToGo: false
    },
    results: [
      {
        CCDCaseTypeId: null,
        CCDCaseTypeName: null,
        CCDJurisdictionId: null,
        CCDJurisdictionName: 'IA',
        HMCTSServiceId: null,
        HMCTSServiceShortDescription: null,
        baseLocationId: null,
        baseLocationName: null,
        caseManagementCategoryId: null,
        caseManagementCategoryName: null,
        caseNameHmctsInternal: 'Derrick Rega',
        caseReference: '8771-7857-4127-5065',
        otherReferences: null,
        processForAccess: 'SPECIFIC',
        regionId: null,
        regionName: null,
        stateId: null
      },
      {
        CCDCaseTypeId: null,
        CCDCaseTypeName: null,
        CCDJurisdictionId: null,
        CCDJurisdictionName: 'IA',
        HMCTSServiceId: null,
        HMCTSServiceShortDescription: null,
        baseLocationId: null,
        baseLocationName: null,
        caseManagementCategoryId: null,
        caseManagementCategoryName: null,
        caseNameHmctsInternal: 'Lea Mangan',
        caseReference: '0598-5385-1020-1905',
        otherReferences: null,
        processForAccess: 'CHALLENGED',
        regionId: null,
        regionName: null,
        stateId: null
      }
    ]
  };

  beforeEach(async(() => {
    searchService = createSpyObj<SearchService>('searchService', ['getResults']);
    searchService.getResults.and.returnValue(of(searchResultWithCaseList));
    TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: SearchService, useValue: searchService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    route = TestBed.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called ngOnInit and populate search results', () => {
    expect(component.ngOnInit).toBeTruthy();
    expect(component.searchResultSubscription$).toBeTruthy();
    expect(searchService.getResults).toHaveBeenCalled();
    expect(component.searchResult).toEqual(searchResultWithCaseList);
  });

  it('should unsubscribe subscriptions onDestroy', () => {
    component.searchResultSubscription$ = new Observable().subscribe();
    spyOn(component.searchResultSubscription$, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.searchResultSubscription$.unsubscribe).toHaveBeenCalled();
  });

  it('should navigate to no results page if search result is empty', () => {
    searchService.getResults.and.returnValue(of(searchResultWithNoCases));
    component.ngOnInit();
    expect(searchService.getResults).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/search/noresults'], {relativeTo: route});
  });

  it('should verify process for access links', () => {
    component.ngOnInit();
    const nodes = fixture.debugElement.nativeElement.querySelectorAll('td > a');
    expect(nodes[0].innerText).toContain('Specific access');
    expect(nodes[1].innerText).toContain('Challenged access');
  });
});
