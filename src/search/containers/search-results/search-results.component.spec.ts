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
import { SearchResultCase } from 'src/search/models/search-result-case.model';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  const formBuilder = new FormBuilder();
	let searchService: jasmine.SpyObj<SearchService>;
  let router: Router;
  let route: ActivatedRoute;

	const searchResult: SearchResult = {
		info: {
			caseStartRecord: 0,
			casesReturned: 0,
			moreResultsToGo: false
		},
		caseList: null
	}

	const searchResultWithCaseList: SearchResult = {
		info: {
			caseStartRecord: 0,
			casesReturned: 0,
			moreResultsToGo: false
		},
		caseList: [
			{
				ccdCaseTypeId: null,
				ccdCaseTypeName: null,
				ccdJurisdictionId: null,
				ccdJurisdictionName: 'IA',
				hmctsServiceId: null,
				hmctsServiceShortDescription: null,
				baseLocationId: null,
				baseLocationName: null,
				caseManagementCategoryId: null,
				caseManagementCategoryName: null,
				caseNameHmctsInternal: 'Derrick Rega',
				caseReference: '8771-7857-4127-5065',
				otherReferences: null,
				processForAccess: null,
				regionId: null,
				regionName: null,
				stateId: null
			},
			{
				ccdCaseTypeId: null,
				ccdCaseTypeName: null,
				ccdJurisdictionId: null,
				ccdJurisdictionName: 'IA',
				hmctsServiceId: null,
				hmctsServiceShortDescription: null,
				baseLocationId: null,
				baseLocationName: null,
				caseManagementCategoryId: null,
				caseManagementCategoryName: null,
				caseNameHmctsInternal: 'Lea Mangan',
				caseReference: '0598-5385-1020-1905',
				otherReferences: null,
				processForAccess: null,
				regionId: null,
				regionName: null,
				stateId: null
			}
		]
	};

  beforeEach(async(() => {
		searchService = createSpyObj<SearchService>('searchService', ['getResults']);
		searchService.getResults.and.returnValue(of(searchResult));
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
		searchService.getResults.and.returnValue(of(searchResultWithCaseList));
		console.log('searchResultWithCaseList', searchResultWithCaseList);
		expect(component.ngOnInit).toBeTruthy();
		expect(component.searchResultSubscription$).toBeTruthy();
		expect(searchService.getResults).toHaveBeenCalled();
		console.log('component.searchResult', component.searchResult);
		expect(component.searchResult.caseList.length).toBeGreaterThan(0);
	});

	it('should unsubscribe subscriptions onDestroy', () => {
		component.searchResultSubscription$ = new Observable().subscribe();
		spyOn(component.searchResultSubscription$, 'unsubscribe').and.callThrough();

		component.ngOnDestroy();
		expect(component.searchResultSubscription$.unsubscribe).toHaveBeenCalled();
	});

	it('should navigate to no results page if search result is empty', async() => {
		expect(searchService.getResults).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledWith(['noresults'], {relativeTo: route});
	});
});
