import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RpxTranslationService } from 'rpx-xui-translation';
import { of } from 'rxjs';
import { LegacyTermsAndConditionsComponent } from './legacy-terms-and-conditions.component';

@Pipe({ name: 'rpxTranslate', standalone: false, pure: false })
class MockRpxTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('LegacyTermsAndConditionsComponent', () => {
  @Component({
    standalone: false,
    selector: 'exui-app-host-dummy-component',
    template: '<exui-legacy-terms-and-conditions></exui-legacy-terms-and-conditions>',
  })
  class TestDummyHostComponent {
    @ViewChild(LegacyTermsAndConditionsComponent, { static: false })
    public legacyTermsComponent: LegacyTermsAndConditionsComponent;
  }

  let testHostComponent: TestDummyHostComponent;
  let testHostFixture: ComponentFixture<TestDummyHostComponent>;
  let component: LegacyTermsAndConditionsComponent;
  let fixture: ComponentFixture<LegacyTermsAndConditionsComponent>;
  let element: DebugElement;

  const rpxTranslationServiceStub = () => ({
    language: 'en',
    translate: (key: string) => key,
    getTranslation$: (phrase: string) => of(phrase),
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LegacyTermsAndConditionsComponent, TestDummyHostComponent, MockRpxTranslatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: RpxTranslationService,
          useFactory: rpxTranslationServiceStub,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestDummyHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyTermsAndConditionsComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created by angular', () => {
    expect(fixture).not.toBeNull();
  });

  it('should have introWithPrivacyPolicyText defined', () => {
    expect(component.introWithPrivacyPolicyText).toBeTruthy();
  });

  it('should have privacyPolicyLinkHtml defined', () => {
    expect(component.privacyPolicyLinkHtml).toBeTruthy();
  });

  it('should have accessingServiceIntroKey defined', () => {
    expect(component.accessingServiceIntroKey).toBeTruthy();
  });

  it('should have serviceIncludesKey defined', () => {
    expect(component.serviceIncludesKey).toBeTruthy();
  });

  it('should have userDefinitionKey defined', () => {
    expect(component.userDefinitionKey).toBeTruthy();
  });

  it('should have legitimacyNeedKey defined', () => {
    expect(component.legitimacyNeedKey).toBeTruthy();
  });

  it('should have whoWeAreTextKey defined', () => {
    expect(component.whoWeAreTextKey).toBeTruthy();
  });

  it('should have termsUpdateNoticeKey defined', () => {
    expect(component.termsUpdateNoticeKey).toBeTruthy();
  });

  it('should have dataProtectionComplianceKey defined', () => {
    expect(component.dataProtectionComplianceKey).toBeTruthy();
  });

  it('should have preventDisclosureKey defined', () => {
    expect(component.preventDisclosureKey).toBeTruthy();
  });

  it('should have credentialResponsibilityKey defined', () => {
    expect(component.credentialResponsibilityKey).toBeTruthy();
  });

  it('should have secureDevicesOnlyKey defined', () => {
    expect(component.secureDevicesOnlyKey).toBeTruthy();
  });

  it('should have protectAndNotShareCredentialsKey defined', () => {
    expect(component.protectAndNotShareCredentialsKey).toBeTruthy();
  });

  it('should have reportDisclosureKey defined', () => {
    expect(component.reportDisclosureKey).toBeTruthy();
  });

  it('should have notUseAnotherPersonsCredentialsKey defined', () => {
    expect(component.notUseAnotherPersonsCredentialsKey).toBeTruthy();
  });

  it('should have falseClaimsKey defined', () => {
    expect(component.falseClaimsKey).toBeTruthy();
  });

  it('should have recipientChecksKey defined', () => {
    expect(component.recipientChecksKey).toBeTruthy();
  });

  it('should have bypassAccessControlsKey defined', () => {
    expect(component.bypassAccessControlsKey).toBeTruthy();
  });

  it('should have notBypassAccessControlsKey defined', () => {
    expect(component.notBypassAccessControlsKey).toBeTruthy();
  });

  it('should have wifiSecurityKey defined', () => {
    expect(component.wifiSecurityKey).toBeTruthy();
  });

  it('should have locationRestrictionKey defined', () => {
    expect(component.locationRestrictionKey).toBeTruthy();
  });

  it('should have organisationAdministratorResponsibilitiesKey defined', () => {
    expect(component.organisationAdministratorResponsibilitiesKey).toBeTruthy();
  });

  it('should have organisationAccountabilityKey defined', () => {
    expect(component.organisationAccountabilityKey).toBeTruthy();
  });

  it('should have organisationCeaseOperationKey defined', () => {
    expect(component.organisationCeaseOperationKey).toBeTruthy();
  });

  it('should have breachSanctionsKey defined', () => {
    expect(component.breachSanctionsKey).toBeTruthy();
  });

  it('should have serviceProvidedFreeOfChargeKey defined', () => {
    expect(component.serviceProvidedFreeOfChargeKey).toBeTruthy();
  });

  it('should have proceduresComplianceKey defined', () => {
    expect(component.proceduresComplianceKey).toBeTruthy();
  });

  it('should have organisationResponsibilitiesAcknowledgementKey defined', () => {
    expect(component.organisationResponsibilitiesAcknowledgementKey).toBeTruthy();
  });
});
