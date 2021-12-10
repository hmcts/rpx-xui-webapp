import { BadgeColour, ContactDetailsDataModel } from '@hmcts/rpx-xui-common-lib';
import { ApplicationThemeLogo } from './enums';
import { ApplicationTheme, NavigationItem } from './models/theming.model';

const FeatureNames = {
  currentWAFeature: 'mc-work-allocation-active-feature',
  workAllocation: 'MC_Work_Allocation',
  noticeOfChange: 'MC_Notice_of_Change',
  waMvpPaginationFeature: 'mc-mvp-wa-pagination',
  userTypeRoles: 'mc-user-type-roles'
};

const FooterDataNavigation = {
  items: [
    {text: 'Accessibility', href: '/accessibility', target: '_blank'},
    {text: 'Terms and conditions', href: '/terms-and-conditions', target: '_blank'},
    {text: 'Cookies', href: '/cookies', target: '_blank'},
    {text: 'Privacy policy', href: '/privacy-policy', target: '_blank'},
    {text: 'Get help', href: '/get-help', target: '_blank'}
  ]
};

const defaultUserTheme: ApplicationTheme = {
  appTitle: {
    name: 'Manage Cases',
    url: '/'
  },
  backgroundColor: '#202020',
  logo: ApplicationThemeLogo.NONE
};

const defaultMenuItems: NavigationItem[] = [
  {
    active: false,
    href: '/cases',
    text: 'Case list'
  },
  {
    active: false,
    href: '/cases/case-filter',
    text: 'Create case'
  },
  {
    active: false,
    align: 'right',
    href: '/cases/case-search',
    ngClass: 'hmcts-search-toggle__button',
    text: 'Find case'
  }
];

const helpContactDetails: ContactDetailsDataModel[] = [
  {
    title: 'Probate',
    badgeColour: BadgeColour.BADGE_BLUE,
    email: 'contactprobate@justice.gov.uk',
    phone: '0300 303 0648',
    openingTimes: 'Monday to Friday, 9:30am to 5pm (excluding public holidays)'
  },
  {
    title: 'Divorce',
    badgeColour: BadgeColour.BADGE_BLUE,
    email: 'divorcecase@justice.gov.uk',
    phone: '0300 303 0642',
    openingTimes: 'Monday to Friday, 9:30am to 5pm (excluding public holidays)'
  },
  {
    title: 'Financial Remedy',
    badgeColour: BadgeColour.BADGE_RED,
    email: 'contactfinancialremedy@justice.gov.uk',
    phone: '0300 303 0642',
    openingTimes: 'Monday to Friday, 9:30am to 5pm (excluding public holidays)'
  },
  {
    title: 'Immigration and Asylum',
    badgeColour: BadgeColour.BADGE_RED,
    email: 'customer.service@justice.gov.uk',
    phone: '0300 123 1711',
    openingTimes: 'Monday to Friday, 9am to 5pm (excluding public holidays)'
  },
  {
    title: 'Family Public Law and Adoption',
    badgeColour: BadgeColour.BADGE_RED,
    email: 'contactfpl@justice.gov.uk',
    phone: '0330 808 4424',
    openingTimes: 'Monday to Friday, 9am to 5pm (excluding public holidays)'
  }
];

const environmentNames = {
  aat: 'aat',
  localhost: 'localhost',
  pr: 'pr-',
  demo: 'demo',
  ithc: 'ithc',
  perftest: 'perftest',
  prod: 'prod'
};

const redirectUrl = {
  aat: 'https://idam-web-public.aat.platform.hmcts.net',
  demo: 'https://idam-web-public.demo.platform.hmcts.net',
  ithc: 'https://idam-web-public-aks.ithc.platform.hmcts.net',
  prod: 'https://hmcts-access.service.gov.uk',
  perftest: 'https://idam-web-public.perftest.platform.hmcts.net',
  localhost: 'https://idam-web-public.aat.platform.hmcts.net'
};

const appHeaderTitle = {name: 'Manage cases', url: '/'};

// Making the base URL for case details a constant.
const caseDetailsUrl: string = '/cases/case-details/';

const serviceMessagesFeatureToggleKey: string = 'mc-service-messages';
const serviceMessageCookie: string = 'service_messages';

const caseAllocatorRole: string = 'case-allocator-role';

export class AppConstants {
  static FOOTER_DATA = null;
  static FOOTER_DATA_NAVIGATION = FooterDataNavigation;
  static APP_HEADER_TITLE = appHeaderTitle;
  static ENVIRONMENT_NAMES = environmentNames;
  static REDIRECT_URL = redirectUrl;
  static HELP_CONTACT_DETAILS = helpContactDetails;
  static DEFAULT_USER_THEME = defaultUserTheme;
  static FEATURE_NAMES = FeatureNames;
  static CASE_DETAILS_URL = caseDetailsUrl;
  static SERVICE_MESSAGES_FEATURE_TOGGLE_KEY = serviceMessagesFeatureToggleKey;
  static SERVICE_MESSAGE_COOKIE = serviceMessageCookie;
  static DEFAULT_MENU_ITEMS = defaultMenuItems;
}

export const LD_FLAG_REMOVE_USER_FROM_CASE_MC: string = 'remove-user-from-case-mc';
export const LD_FLAG_MC_APPLICATION_THEMES: string = 'mc-application-themes';
export const LEGAL_OPS_ROLE_LIST: string[] = ['caseworker-ia-caseofficer', 'caseworker-ia', 'caseworker-ia-admofficer', 'task-supervisor'];
export const JUDICIAL_ROLE_LIST: string[] = ['caseworker-ia-iacjudge'];
export const SERVICE_OPTIONS_LIST = [{key: 'IA', label: 'Immigration and Asylum'}];
