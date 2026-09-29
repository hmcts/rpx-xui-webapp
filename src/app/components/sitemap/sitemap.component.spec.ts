import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserDetails, WAVerificationModel } from '../../models';
import { HeaderConfigService } from '../../services/header-config/header-config.service';
import { WAVerificationService } from '../../../work-allocation/services';
import * as fromRoot from '../../store';
import { SitemapComponent } from './sitemap.component';

@Pipe({
  standalone: false,
  name: 'rpxTranslate',
})
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('SitemapComponent', () => {
  let component: SitemapComponent;
  let fixture: ComponentFixture<SitemapComponent>;
  let storeMock: jasmine.SpyObj<Store<fromRoot.State>>;
  let headerConfigServiceMock: jasmine.SpyObj<HeaderConfigService>;
  let waVerificationServiceMock: jasmine.SpyObj<WAVerificationService>;

  const userDetails = {
    userInfo: {
      roles: ['caseworker-civil', 'case-manager', 'task-supervisor'],
    },
    roleAssignmentInfo: [
      {
        jurisdiction: 'IA',
        roleCategory: 'LEGAL_OPERATIONS',
        roleName: 'case-manager',
        roleType: 'ORGANISATION',
      },
    ],
  } as UserDetails;

  const waVerification: WAVerificationModel = {
    waSupportedCategories: ['LEGAL_OPERATIONS'],
    waSupportedRoleTypes: ['ORGANISATION'],
    waSupportedJurisdictions: ['IA'],
  };

  const supportedCaseManagerAssignment = {
    jurisdiction: 'IA',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'case-manager',
    roleType: 'ORGANISATION',
    isCaseAllocator: false,
  };

  const headerItems = [
    { active: false, href: '/cases', roles: ['caseworker-civil'], text: 'Case list' },
    { active: false, href: '/cases/case-filter', text: 'Create case' },
    { active: false, href: '/cases/case-search', roles: ['caseworker-civil'], text: 'Find case' },
    { active: false, href: '/search', roles: ['case-manager'], text: 'Search' },
    { active: false, href: '/noc', roles: ['caseworker-divorce-solicitor'], text: 'Notice of change' },
    { active: false, href: '/refunds', roles: ['payments-refund'], text: 'Refunds' },
    { active: false, href: '/work/my-work/list', roles: ['case-manager'], text: 'My work' },
    { active: false, href: '/work/all-work/tasks', roles: ['task-supervisor'], text: 'All work' },
    { active: false, href: '/staff', roles: ['staff-admin'], text: 'Staff' },
    { active: false, href: '/booking', roles: ['fee-paid-judge'], text: 'Work access' },
  ];

  const createState = (details: UserDetails): fromRoot.State =>
    ({
      routerReducer: undefined,
      appConfig: { userDetails: details },
    }) as unknown as fromRoot.State;

  beforeEach(waitForAsync(() => {
    fromRoot.getUserDetails.clearResult();
    storeMock = jasmine.createSpyObj<Store<fromRoot.State>>('store', ['pipe']);
    headerConfigServiceMock = jasmine.createSpyObj<HeaderConfigService>('headerConfigService', ['constructHeaderConfig']);
    waVerificationServiceMock = jasmine.createSpyObj<WAVerificationService>('waVerificationService', ['getWAVerification']);

    mockStoreState(userDetails);
    headerConfigServiceMock.constructHeaderConfig.and.returnValue(of(headerItems));
    waVerificationServiceMock.getWAVerification.and.returnValue(of(waVerification));

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SitemapComponent, RpxTranslateMockPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: HeaderConfigService, useValue: headerConfigServiceMock },
        { provide: WAVerificationService, useValue: waVerificationServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function mockStoreState(details: UserDetails): void {
    storeMock.pipe.and.callFake((...operators: any[]) =>
      operators.reduce((source, operator) => operator(source), of(createState(details)))
    );
  }

  function createUserDetails(roles: string[], roleAssignmentInfo: UserDetails['roleAssignmentInfo'] = []): UserDetails {
    return {
      userInfo: { roles },
      roleAssignmentInfo,
    } as UserDetails;
  }

  function renderSitemap(details: UserDetails): string[] {
    mockStoreState(details);
    fixture = TestBed.createComponent(SitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    return fixture.debugElement.queryAll(By.css('main a')).map((link) => link.attributes.href);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass sitemap headings and link labels through the translation pipe', () => {
    const translatePipeSpy = spyOn(RpxTranslateMockPipe.prototype, 'transform').and.callThrough();
    mockStoreState(
      createUserDetails(
        [
          'caseworker-civil',
          'case-manager',
          'task-supervisor',
          'staff-admin',
          'caseworker-divorce-solicitor',
          'payments-refund',
          'fee-paid-judge',
        ],
        [supportedCaseManagerAssignment]
      )
    );
    const translatedFixture = TestBed.createComponent(SitemapComponent);
    translatedFixture.detectChanges();

    const translatedPhrases = translatePipeSpy.calls.allArgs().map(([phrase]) => phrase);

    expect(translatedPhrases).toEqual(
      jasmine.arrayContaining([
        'Site map',
        'Work allocation',
        'My work',
        'Available tasks',
        'My cases',
        'My access',
        'All work',
        'All work cases',
        'Work access',
        'Case management',
        'Case list',
        'Create case',
        'Find case',
        'Search cases',
        'Notice of change',
        'Refunds',
        'Staff administration',
        'Staff',
        'Accessibility statement',
        'Terms and conditions',
        'Cookies',
        'Privacy policy',
        'Get help',
        'Help and information',
      ])
    );
  });

  it('should show links available to the current user and unrestricted footer help pages', () => {
    const links = fixture.debugElement.queryAll(By.css('main a'));
    const destinations = links.map((link) => link.attributes.href);
    const linkText = links.map((link) => link.nativeElement.textContent.trim());

    expect(destinations).toEqual([
      '/work/my-work/list',
      '/work/my-work/available',
      '/work/my-work/my-cases',
      '/work/my-work/my-access',
      '/work/all-work/tasks',
      '/work/all-work/cases',
      '/cases',
      '/cases/case-filter',
      '/cases/case-search',
      '/search',
      '/accessibility',
      '/terms-and-conditions',
      '/cookies',
      '/privacy-policy',
      '/get-help',
    ]);
    expect(linkText).toEqual([
      'My work',
      'Available tasks',
      'My cases',
      'My access',
      'All work',
      'All work cases',
      'Case list',
      'Create case',
      'Find case',
      'Search cases',
      'Accessibility statement',
      'Terms and conditions',
      'Cookies',
      'Privacy policy',
      'Get help',
    ]);
  });

  describe('role-based visibility', () => {
    describe('positive scenarios', () => {
      it('should show Case list for a caseworker-civil user', () => {
        const destinations = renderSitemap(createUserDetails(['caseworker-civil']));

        expect(destinations).toContain('/cases');
      });

      it('should show Create case without a role restriction', () => {
        const destinations = renderSitemap(createUserDetails([]));

        expect(destinations).toContain('/cases/case-filter');
      });

      it('should show Find case for a caseworker-civil user', () => {
        const destinations = renderSitemap(createUserDetails(['caseworker-civil']));

        expect(destinations).toContain('/cases/case-search');
      });

      it('should show Search cases for a case-manager with a supported role assignment', () => {
        const destinations = renderSitemap(createUserDetails(['case-manager'], [supportedCaseManagerAssignment]));

        expect(destinations).toContain('/search');
      });

      it('should show Notice of change for a caseworker-divorce-solicitor user', () => {
        const destinations = renderSitemap(createUserDetails(['caseworker-divorce-solicitor']));

        expect(destinations).toContain('/noc');
      });

      it('should show Refunds for a payments-refund user', () => {
        const destinations = renderSitemap(createUserDetails(['payments-refund']));

        expect(destinations).toContain('/refunds');
      });

      it('should show My work for a case-manager with a supported role assignment', () => {
        const destinations = renderSitemap(createUserDetails(['case-manager'], [supportedCaseManagerAssignment]));

        expect(destinations).toContain('/work/my-work/list');
      });

      it('should show Available tasks for a case-manager with a supported role assignment', () => {
        const destinations = renderSitemap(createUserDetails(['case-manager'], [supportedCaseManagerAssignment]));

        expect(destinations).toContain('/work/my-work/available');
      });

      it('should show My cases for a case-manager with a supported role assignment', () => {
        const destinations = renderSitemap(createUserDetails(['case-manager'], [supportedCaseManagerAssignment]));

        expect(destinations).toContain('/work/my-work/my-cases');
      });

      it('should show My access for a case-manager with a supported role assignment', () => {
        const destinations = renderSitemap(createUserDetails(['case-manager'], [supportedCaseManagerAssignment]));

        expect(destinations).toContain('/work/my-work/my-access');
      });

      it('should show All work for a task-supervisor user', () => {
        const destinations = renderSitemap(createUserDetails(['task-supervisor']));

        expect(destinations).toContain('/work/all-work/tasks');
      });

      it('should show All work cases for a task-supervisor user', () => {
        const destinations = renderSitemap(createUserDetails(['task-supervisor']));

        expect(destinations).toContain('/work/all-work/cases');
      });

      it('should show Work access for a fee-paid-judge user', () => {
        const destinations = renderSitemap(createUserDetails(['fee-paid-judge']));

        expect(destinations).toContain('/booking');
      });

      it('should show Staff for a staff-admin user', () => {
        const destinations = renderSitemap(createUserDetails(['staff-admin']));

        expect(destinations).toContain('/staff');
      });
    });

    describe('negative scenarios', () => {
      it('should hide Case list when caseworker-civil is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/cases');
      });

      it('should hide Find case when caseworker-civil is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/cases/case-search');
      });

      it('should hide Search cases when case-manager is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/search');
      });

      it('should hide Notice of change when caseworker-divorce-solicitor is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/noc');
      });

      it('should hide Refunds when payments-refund is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/refunds');
      });

      it('should hide My work when case-manager is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/work/my-work/list');
      });

      it('should hide Available tasks when case-manager is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/work/my-work/available');
      });

      it('should hide My cases when case-manager is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/work/my-work/my-cases');
      });

      it('should hide My access when case-manager is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/work/my-work/my-access');
      });

      it('should hide All work when task-supervisor is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/work/all-work/tasks');
      });

      it('should hide All work cases when task-supervisor is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/work/all-work/cases');
      });

      it('should hide Work access when fee-paid-judge is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/booking');
      });

      it('should hide Staff when staff-admin is absent', () => {
        const destinations = renderSitemap(createUserDetails(['unrelated-role']));

        expect(destinations).not.toContain('/staff');
      });
    });
  });

  describe('unrestricted links', () => {
    it('should show footer help pages without user roles', () => {
      const destinations = renderSitemap(createUserDetails([]));

      expect(destinations).toEqual([
        '/cases/case-filter',
        '/accessibility',
        '/terms-and-conditions',
        '/cookies',
        '/privacy-policy',
        '/get-help',
      ]);
    });
  });

  describe('role assignment visibility', () => {
    it('should show case-manager routes for a supported LEGAL_OPERATIONS organisation assignment in IA', () => {
      const destinations = renderSitemap(createUserDetails(['case-manager'], [supportedCaseManagerAssignment]));

      expect(destinations).toContain('/search');
      expect(destinations).toContain('/work/my-work/list');
      expect(destinations).toContain('/work/my-work/available');
      expect(destinations).toContain('/work/my-work/my-cases');
      expect(destinations).toContain('/work/my-work/my-access');
    });

    it('should hide case-manager routes when the role category is not supported', () => {
      const destinations = renderSitemap(
        createUserDetails(
          ['case-manager'],
          [
            {
              ...supportedCaseManagerAssignment,
              roleCategory: 'JUDICIAL',
            },
          ]
        )
      );

      expect(destinations).not.toContain('/search');
      expect(destinations).not.toContain('/work/my-work/list');
      expect(destinations).not.toContain('/work/my-work/available');
      expect(destinations).not.toContain('/work/my-work/my-cases');
      expect(destinations).not.toContain('/work/my-work/my-access');
      expect(destinations).toContain('/cases/case-filter');
    });

    it('should hide case-manager routes when the role assignment type is not supported', () => {
      const destinations = renderSitemap(
        createUserDetails(
          ['case-manager'],
          [
            {
              ...supportedCaseManagerAssignment,
              roleType: 'CASE',
            },
          ]
        )
      );

      expect(destinations).not.toContain('/search');
      expect(destinations).not.toContain('/work/my-work/list');
      expect(destinations).not.toContain('/work/my-work/available');
      expect(destinations).not.toContain('/work/my-work/my-cases');
      expect(destinations).not.toContain('/work/my-work/my-access');
    });

    it('should hide case-manager routes when the role assignment jurisdiction is not supported', () => {
      const destinations = renderSitemap(
        createUserDetails(
          ['case-manager'],
          [
            {
              ...supportedCaseManagerAssignment,
              jurisdiction: 'CIVIL',
            },
          ]
        )
      );

      expect(destinations).not.toContain('/search');
      expect(destinations).not.toContain('/work/my-work/list');
      expect(destinations).not.toContain('/work/my-work/available');
      expect(destinations).not.toContain('/work/my-work/my-cases');
      expect(destinations).not.toContain('/work/my-work/my-access');
    });
  });
});
