const FooterData =  {
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

const appHeaderTitle = {name: 'Manage Cases', url: '/'};


export class AppConstants {
  static FOOTER_DATA = FooterData;
  static FOOTER_DATA_NAVIGATION = FooterDataNavigation;
  static NAV_ITEMS = navItems;
  static USER_NAV = userNav;
  static APP_HEADER_TITLE = appHeaderTitle;
}
