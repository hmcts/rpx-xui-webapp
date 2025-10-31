import { Location } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable, of } from 'rxjs';
import { CASEWORKERS } from '../../../../api/test/pact/constants/work-allocation/caseworkers.spec';
import { CASEROLES } from '../../../../api/workAllocation/constants/roles.mock.data';
import { CaseReferencePipe } from '../../../hearings/pipes/case-reference.pipe';
import { AllocateRoleService } from '../../../role-access/services';
import { CaseworkerDataService, WASupportedJurisdictionsService } from '../../../work-allocation/services';
import { RestrictedCaseAccessContainerComponent } from './restricted-case-access-container.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { JudicialRefDataService } from 'src/hearings/services/judicial-ref-data.service';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('RestrictedCaseAccessContainerComponent', () => {
  let component: RestrictedCaseAccessContainerComponent;
  let fixture: ComponentFixture<RestrictedCaseAccessContainerComponent>;
  const mockAllocateService = jasmine.createSpyObj('AllocateRoleService', ['getCaseAccessRolesByCaseId']);
  const mockWASupportedJurisdictionsService = jasmine.createSpyObj('WASupportedJurisdictionsService', ['getWASupportedJurisdictions']);
  const mockCaseworkerDataService = jasmine.createSpyObj('CaseworkerDataService', ['getUsersFromServices']);
  const mockLoadingService = jasmine.createSpyObj('LoadingService', ['register', 'unregister']);
  const mockJudicialRefDataService = jasmine.createSpyObj('JudicialRefDataService', ['searchJudicialUserByIdamID']);
  const mockActivatedRoute = {
    snapshot: {
      params: {
        cid: '1234123412341234'
      }
    }
  };
  const firstJudgeResponse = [
    {
      title: 'Ms',
      knownAs: 'jane',
      surname: 'doe',
      fullName: 'Ms Jane Doe',
      emailId: 'jane.doe@imajudge.net',
      idamId: '6343',
      initials: 'JD',
      postNominals: null,
      personalCode: '1234568'
    }
  ];
  const secondJudgeResponse = [
    {
      title: 'Mr',
      knownAs: 'bob',
      surname: 'Smith',
      fullName: 'Mr Bob Smith',
      emailId: 'bob.smith@imajudge.net',
      idamId: '12343',
      initials: 'BS',
      postNominals: null,
      personalCode: '1234568'
    }
  ];
  const mockRouter = {
    navigate: jasmine.createSpy(),
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  const mockLocation = {
    back: jasmine.createSpy('back')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        RestrictedCaseAccessContainerComponent,
        CaseReferencePipe,
        RpxTranslateMockPipe
      ],
      providers: [
        { provide: AllocateRoleService, useValue: mockAllocateService },
        { provide: WASupportedJurisdictionsService, useValue: mockWASupportedJurisdictionsService },
        { provide: CaseworkerDataService, useValue: mockCaseworkerDataService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation },
        { provide: JudicialRefDataService, useValue: mockJudicialRefDataService },
        HttpClient,
        HttpHandler
      ]
    })
      .compileComponents();
    mockAllocateService.getCaseAccessRolesByCaseId.and.returnValue(of(CASEROLES));
    mockWASupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of(['IA']));
    mockCaseworkerDataService.getUsersFromServices.and.returnValue(of([CASEWORKERS.JANE_DOE, CASEWORKERS.JOHN_SMITH]));
    mockLoadingService.register.and.callThrough();
    mockLoadingService.unregister.and.callThrough();
    let callCount = 0;
    mockJudicialRefDataService.searchJudicialUserByIdamID.and.callFake(() => {
      callCount++;
      if (callCount === 1) {
        return of(firstJudgeResponse);
      } else if (callCount === 2) {
        return of(secondJudgeResponse);
      }
    });
    fixture = TestBed.createComponent(RestrictedCaseAccessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockLoadingService.register).toHaveBeenCalled();
    expect(mockAllocateService.getCaseAccessRolesByCaseId).toHaveBeenCalled();
    expect(mockWASupportedJurisdictionsService.getWASupportedJurisdictions).toHaveBeenCalled();
    expect(mockCaseworkerDataService.getUsersFromServices).toHaveBeenCalled();
    expect(mockLoadingService.unregister).toHaveBeenCalled();
    expect(mockJudicialRefDataService.searchJudicialUserByIdamID).toHaveBeenCalled();
    expect(component.restrictedCases).toEqual([
      { user: 'Ms Jane Doe', email: 'jane.doe@imajudge.net', role: 'Lead judge' },
      { user: 'Mr Bob Smith', email: 'bob.smith@imajudge.net', role: 'Lead judge' },
      { user: 'John Smith', email: 'john.smith@caseworkers.gov.uk', role: 'Case manager' }
    ]);
  });

  it('should unsubscribe', () => {
    component.allocateServiceSubscription = new Observable().subscribe();
    spyOn(component.allocateServiceSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.allocateServiceSubscription.unsubscribe).toHaveBeenCalled();
  });

  describe('onBack()', () => {
    const resetReferrer = () =>
      Object.defineProperty(document, 'referrer', { value: '', configurable: true });

    afterEach(() => {
      // clean up spies and global mutations between tests
      resetReferrer();
      mockLocation.back.calls.reset();
      mockRouter.navigateByUrl.calls.reset();
    });

    it('uses Location.back() when referrer is same-origin and history > 1', () => {
      // same-origin referrer
      Object.defineProperty(document, 'referrer', {
        value: window.location.origin + '/previous',
        configurable: true
      });

      // force history.length > 1 without navigating away
      spyOnProperty(window.history, 'length', 'get').and.returnValue(2);

      component.onBack();

      expect(mockLocation.back).toHaveBeenCalled();
      expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
    });

    it('navigates to /cases/case-search when referrer is cross-origin', () => {
      Object.defineProperty(document, 'referrer', {
        value: 'https://external.example/somewhere',
        configurable: true
      });

      // even if history > 1, cross-origin should trigger navigate fallback
      spyOnProperty(window.history, 'length', 'get').and.returnValue(3);

      component.onBack();

      expect(mockLocation.back).not.toHaveBeenCalled();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/cases/case-search');
    });

    it('navigates to /cases/case-search when history length <= 1 (no useful history)', () => {
      Object.defineProperty(document, 'referrer', {
        value: window.location.origin + '/previous',
        configurable: true
      });

      // simulate first page / new tab (no meaningful back)
      spyOnProperty(window.history, 'length', 'get').and.returnValue(1);

      component.onBack();

      expect(mockLocation.back).not.toHaveBeenCalled();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/cases/case-search');
    });
  });
});
