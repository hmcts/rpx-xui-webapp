import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-legacy-terms-and-conditions',
  templateUrl: './legacy-terms-and-conditions.component.html',
})
export class LegacyTermsAndConditionsComponent {
  public readonly accessingServiceIntroKey =
    'By accessing this service (‘the Service’), you’re agreeing to the following terms of use. This includes the';
  public readonly serviceIncludesKey =
    'The use of the Service includes the Manage Organisation and Manage Cases applications (sometimes known as ‘MyHMCTS’) and Judicial Case Manager (JCM).';
  public readonly userDefinitionKey =
    'The term ‘you’ includes yourself and all users of the Service in your organisation. The terms ‘we’ and ‘us’ refer to His Majesty’s Courts and Tribunals Service.';
  public readonly legitimacyNeedKey = 'You also agree that you have a legitimate need to use the Service.';
  public readonly whoWeAreTextKey = 'This Service is managed by His Majesty’s Courts and Tribunals service.';
  public readonly termsUpdateNoticeKey =
    'You should check these terms and conditions regularly. We may update them at any time without notice. If you continue to use this service after the terms and conditions have changed, you are deemed to have agreed to the changes.';
  public readonly dataProtectionComplianceKey =
    'You will comply with Data Protection Law, including (without limitation and to the extent applicable) the Data Protection Act 2018 and General Data Protection Regulations, relevant privacy regulations and all professional codes of conduct which apply to the Service. You acknowledge that any breach of these provisions may result in access to the Service being suspended or terminated, and that we may pursue suspected offences under the Computer Misuse Act or Data Protection Act 2018. This includes destroying or falsifying information and documents or breach of any other applicable law in England and Wales.';
  public readonly preventDisclosureKey =
    'You will seek to prevent inadvertent disclosure of information, for example by not forwarding information to unauthorised contacts, and by taking care when working on or printing information related to the Service.';
  public readonly credentialResponsibilityKey =
    'You will be individually responsible for the secure use of unique credentials issued to you by the Service (for example, user ID and passwords). You must:';
  public readonly secureDevicesOnlyKey =
    'You will ensure that devices (including computers and mobile devices) connected to the Service will be kept secure, for example by being locked when not in use, and the data secured through encryption and/or protected access (using a password or similar).';
  public readonly protectAndNotShareCredentialsKey = 'protect and not share your EUI credentials for access to the Service';
  public readonly reportDisclosureKey =
    'report actual or suspected disclosure of this information immediately to MyHMCTS Business Support Help';
  public readonly notUseAnotherPersonsCredentialsKey = 'not use another person’s credentials to access HMCTS Services';
  public readonly falseClaimsKey =
    'You will not make false claims or denials relating to the use of the Service (for example, falsely denying any access, editing, reproduction or viewing of digital case material).';
  public readonly recipientChecksKey =
    'You will always check that recipients of material available through the Service are authorised to do so and that information is not accidentally or deliberately released to any unauthorised third party.';
  public readonly bypassAccessControlsKey =
    'You will only access the Service from devices that have appropriate security controls installed, enabled and up to date (including, as appropriate, firewalls, anti-virus and spyware software, encryption of data and operating system security patches).';
  public readonly notBypassAccessControlsKey = 'You will not attempt to bypass or subvert systems access controls.';
  public readonly wifiSecurityKey =
    'When using WiFi, you will only access the Service through secure internet access. You will not ‘trust’ or ‘accept’ invalid security certificates for web sites.';
  public readonly locationRestrictionKey =
    'You will only connect to the Service from within the UK or European Economic Area (EEA) and will not attempt to access the Service from a location that is outside the UK or EEA. You accept that we have the right to audit usage and investigate security incidents and you confirm that, should such an investigation be necessary, you and other users will provide all necessary support.';
  public readonly organisationAdministratorResponsibilitiesKey =
    'Your organisation’s administrator will maintain an up to date record of all users associated with the organisation and amend or remove access to the Service as appropriate. This includes (but is not limited to) a user leaving the organisation or changing to a role for which certain levels of access are no longer appropriate. Administrators are required to make changes on the day they become effective, or as soon as reasonably possible thereafter. In particular, there should be no time when the organisation is without at least one administrator.';
  public readonly organisationAccountabilityKey =
    'The organisation is accountable for all agents working on behalf of the organisation and will treat them as “users” for the organisation.';
  public readonly organisationCeaseOperationKey =
    'Should the organisation cease to operate, or merges with another organisation, you should inform us as soon as possible.';
  public readonly breachSanctionsKey =
    'In the event of a suspected breach of this agreement, we reserve the right to investigate and, if a breach has occurred, to impose appropriate sanctions. This can range from a warning and instructions to improve internal processes, to temporary suspension or reduction in service availability, to the potential complete withdrawal of service, should the breach adversely affect other users of the Service and the integrity of the trust framework within which the Service operates.';
  public readonly serviceProvidedFreeOfChargeKey =
    'You acknowledge and accept that the Service is provided free of charge and we are not responsible and accept no liability for any defect, failure or fault in the Service.';
  public readonly proceduresComplianceKey =
    'You hereby represent and undertake that you have all procedures in the place to ensure compliance with these terms.';
  public readonly organisationResponsibilitiesAcknowledgementKey =
    'You acknowledge and accept that you are fully aware of your responsibilities for this organisation, in relation to the use of the Service as set out in the above terms and conditions. You are authorised to accept the terms on behalf of your organisation including other users.';
}
