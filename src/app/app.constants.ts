const footerData =  {
  heading: 'Help',
  email: {
    address: 'service-desk@hmcts.gov.uk',
    text: 'service-desk@hmcts.gov.uk'
  },
  phone: {
    text: '0207 633 4140'
  },
  opening: {
    text: 'Monday to Friday, 8am to 6pm (excluding public holidays)'
  }
};

const footerDataNavigation = {
  items: [
    { text: 'Accessibility', href: 'accessibility', target: '_blank' },
    { text: 'Terms and conditions', href: 'terms-and-conditions', target: '_blank' },
    { text: 'Cookies', href: 'cookies', target: '_blank' },
    { text: 'Privacy policy', href: 'privacy-policy', target: '_blank' }
  ]
};

const navItems = [{
    text: 'Case list',
    href: '/cases',
    active: false
  }, {
    text: 'Create case',
    href: '/cases/case-filter',
    active: false
}];

const userNav = {
  label: 'Account navigation',
  items: [{
    text: 'Sign out',
    emit: 'sign-out'
  }]
};

const environmentNames = {
  aat: 'aat',
  localhost: 'localhost',
  pr: 'pr-',
  demo: 'demo',
  ithc: 'ithc',
  perftest: 'perftest',
  prod: 'prod'
};

const redirectUrl: { [key: string]: string } = {
  aat: 'https://idam-web-public.aat.platform.hmcts.net',
  demo: 'https://idam-web-public.demo.platform.hmcts.net',
  ithc: 'https://idam-web-public.ithc.platform.hmcts.net',
  prod: 'https://hmcts-access.service.gov.uk',
  perftest: 'https://idam-web-public.perftest.platform.hmcts.net',
  localhost: 'https://idam-web-public.aat.platform.hmcts.net'
};



const appHeaderTitle = {name: 'Manage Cases', url: '/'};


export class AppConstants {
  public static FOOTER_DATA = footerData;
  public static FOOTER_DATA_NAVIGATION = footerDataNavigation;
  public static NAV_ITEMS = navItems;
  public static USER_NAV = userNav;
  public static APP_HEADER_TITLE = appHeaderTitle;
  public static ENVIRONMENT_NAMES = environmentNames;
  public static REDIRECT_URL = redirectUrl;
}
