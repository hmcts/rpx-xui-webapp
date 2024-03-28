import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RpxTranslationService } from 'rpx-xui-translation';
import { SessionStorageService } from './../../../app/services';
import { PhaseBannerComponent } from './phase-banner.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromOrgStore from '../../../organisation/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Organisation } from 'src/organisation/models';
import { AppConstants } from 'src/app/app.constants';

const mockSessionStorageService = {
  getItem: jasmine.createSpy('getItem').and.returnValue(JSON.parse('false')),
  setItem: jasmine.createSpy('setItem').and.returnValue(JSON.stringify('false'))
};

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('PhaseBannerComponent', () => {
  let component: PhaseBannerComponent;
  let fixture: ComponentFixture<PhaseBannerComponent>;
  let mockOrganisationStore: MockStore<fromOrgStore.OrganisationState>;
  let actions$: Observable<any>;
  let defaultOrganisationState: Organisation;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$)
      ],
      declarations: [PhaseBannerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    defaultOrganisationState = {
      name: 'a@b.com',
      addressLine1: '10  oxford street',
      townCity: 'London',
      postcode: 'W1',
      addressLine2: '',
      country: 'UK',
      contactInformation: [],
      paymentAccount: [],
      organisationProfileIds: [AppConstants.OGD_PROFILE_TYPES.SOLICITOR_PROFILE]
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const rpxTranslationServiceStub = () => ({ language: 'en', translate: () => { }, getTranslation: (phrase: string) => phrase });
    TestBed.configureTestingModule({
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PhaseBannerComponent, RpxTranslateMockPipe],
      providers: [
        {
          provide: RpxTranslationService,
          useFactory: rpxTranslationServiceStub
        },
        { provide: SessionStorageService, useValue: mockSessionStorageService }
      ]
    });
    fixture = TestBed.createComponent(PhaseBannerComponent);

    mockOrganisationStore = TestBed.inject(MockStore);
    mockOrganisationStore.overrideSelector(
      fromOrgStore.getOrganisationSel,
      defaultOrganisationState
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the feedback link', () => {
    const feedbackLinkClass = '.govuk-phase-banner .govuk-link';
    const feedbackLinkElement = fixture.debugElement.query(By.css(feedbackLinkClass)).nativeElement;
    const feedbackLinkSpanElement = fixture.debugElement.query(By.css(`${feedbackLinkClass} span.visuallyhidden`)).nativeElement;

    expect(feedbackLinkElement.getAttribute('target')).toBe('_blank');
    expect(feedbackLinkSpanElement.innerHTML).toEqual('(Opens in a new window)');
  });

  it('should change the language', () => {
    component.toggleLanguage('en');
    expect(component.currentLang).toBe('en');
  });

  it('should close banner', () => {
    component.closeBanner();
    expect(component.noBanner).toEqual(false);
    expect(mockSessionStorageService.setItem).toHaveBeenCalled();
  });
});
