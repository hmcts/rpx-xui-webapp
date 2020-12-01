import { BadgeColour, ContactDetailsDataModel } from '@hmcts/rpx-xui-common-lib';
import {Theme} from './containers/app-header/app-header.component';

const FeatureNames = {
  workAllocation: 'MC_Work_Allocation',
  noticeOfChange: 'MC_Notice_of_Change'
};

const FooterData =  {
  heading: 'Help',
  email: {
    address: 'contactprobate@justice.gov.uk',
    text: 'contactprobate@justice.gov.uk'
  },
  phone: {
    text: '0300 303 0648'
  },
  opening: {
    text: 'Monday to Friday, 9.30am to 5pm (excluding public holidays)'
  },
  probate: {
    text: 'For Probate you can contact:'
  },
  otherContact: {
    text: 'For all other services: contact your service representative for further help and information.'
  }
};

const FooterDataNavigation = {
  items: [
    { text: 'Accessibility', href: '/accessibility', target: '_blank' },
    { text: 'Terms and conditions', href: '/terms-and-conditions', target: '_blank' },
    { text: 'Cookies', href: '/cookies', target: '_blank' },
    { text: 'Privacy policy', href: '/privacy-policy', target: '_blank' },
    { text: 'Get help', href: '/get-help', target: '_blank' }
  ]
};

const applicationUserThemes: Theme[] =  [
  {
    roles: [
      'caseworker-sscs-judge',
      'caseworker-sscs-panelmember',
      'caseworker-cmc-judge',
      'caseworker-divorce-judge',
      'caseworker-divorce-financialremedy-judiciary',
      'caseworker-probate-judge',
      'caseworker-ia-iacjudge',
      'caseworker-publiclaw-judiciary',
    ],
    appTitle: {name: 'Judicial Case Manager', url: '/'},
    navigationItems: [
      {
        text: 'Case list',
        href: '/cases',
        active: false
      },
    ],
    accountNavigationItems: {
      label: 'Account navigation',
      items: [{
        text: 'Sign out',
        emit: 'sign-out'
      }]
    },
    showFindCase: false,
    backgroundColor: '#8d0f0e',
    logoIsUsed: true,
    logoType: 'judicial',
  },
  {
    roles: ['pui-case-manager'],
    appTitle: {name: 'Manage Cases', url: '/'},
    navigationItems: [
      {
        text: 'Case list',
        href: '/cases',
        active: false
      },
      {
        text: 'Create case',
        href: '/cases/case-filter',
        active: false
      }
    ],
    accountNavigationItems: {
      label: 'Account navigation',
      items: [{
        text: 'Sign out',
        emit: 'sign-out'
      }]
    },
    showFindCase: true,
    backgroundColor: '#202020',
    logoIsUsed: true,
    logoType: 'myhmcts',
  },
];

const defaultUserTheme: Theme = {
  roles: ['default'],
  appTitle: {name: 'Manage Cases', url: '/'},
  navigationItems: [
    {
      text: 'Case list',
      href: '/cases',
      active: false
    },
    {
      text: 'Create case',
      href: '/cases/case-filter',
      active: false
    }
  ],
  accountNavigationItems: {
    label: 'Account navigation',
    items: [
      {
        text: 'Sign out',
        emit: 'sign-out'
      }
    ]
  },
  showFindCase: true,
  backgroundColor: '#202020',
  logoIsUsed: false,
  logoType: 'default',
};

const signedOutTheme: Theme = {
  roles: [],
  appTitle: {name: '', url: '/'},
  navigationItems: [],
  accountNavigationItems: {
    label: 'Account navigation',
    items: []
  },
  showFindCase: true,
  backgroundColor: '#202020',
  logoIsUsed: false,
  logoType: 'default',
};

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
    email: 'fpla@justice.gov.uk',
    phone: '0330 808 4424',
    openingTimes: 'Monday to Friday, 8:30am to 5pm (excluding public holidays)'
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



const appHeaderTitle = {name: 'Manage Cases', url: '/'};


export class AppConstants {
  static FOOTER_DATA = null;
  static FOOTER_DATA_NAVIGATION = FooterDataNavigation;
  static APP_HEADER_TITLE = appHeaderTitle;
  static ENVIRONMENT_NAMES = environmentNames;
  static REDIRECT_URL = redirectUrl;
  static HELP_CONTACT_DETAILS = helpContactDetails;
  static DEFAULT_USER_THEME = defaultUserTheme;
  static APPLICATION_USER_THEMES = applicationUserThemes;
  static SIGNED_OUT_THEME = signedOutTheme;
  static FEATURE_NAMES = FeatureNames;
}
