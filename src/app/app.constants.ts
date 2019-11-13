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

const redirectUrl = {
  aat: 'https://idam-web-public.aat.platform.hmcts.net',
  demo: 'https://idam-web-public.demo.platform.hmcts.net',
  ithc: 'https://idam-web-public.ithc.platform.hmcts.net',
  prod: 'https://hmcts-access.service.gov.uk',
  perftest: 'https://idam-web-public.perftest.platform.hmcts.net',
  localhost: 'https://idam-web-public.aat.platform.hmcts.net'
};



const appHeaderTitle = {name: 'Manage Cases', url: '/'};


export class AppConstants {
  static FOOTER_DATA = FooterData;
  static FOOTER_DATA_NAVIGATION = FooterDataNavigation;
  static NAV_ITEMS = navItems;
  static USER_NAV = userNav;
  static APP_HEADER_TITLE = appHeaderTitle;
  static ENVIRONMENT_NAMES = environmentNames;
  static REDIRECT_URL = redirectUrl;
}
