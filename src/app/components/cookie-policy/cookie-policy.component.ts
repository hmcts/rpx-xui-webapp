import {Component} from '@angular/core';

@Component({
  selector: 'exui-cookie-policy',
  templateUrl: './cookie-policy.component.html'
})

export class CookiePolicyComponent {

  public readonly googlePurpose = 'This helps us count how many people visit the service by tracking if you\'ve visited before';
// Ideally this would be an enum but angular can't seem to cope with enums in templates
  public readonly USAGE = 'Usage';
  public readonly INTRO = 'Intro';
  public readonly SESSION = 'Session';
  public readonly IDENTIFY = 'Identify';
  public readonly SECURITY = 'Security';
  public readonly GOOGLE = 'Google';

  public cookieDetails =
    [
      {name: 'xui-webapp', cat: this.SECURITY, purpose: 'Used to secure communications with HMCTS data services', expires: '8 hours'},
      {name: 'rxVisitor', cat: this.USAGE, purpose: 'Generated user ID for usage tracking (Dynatrace)', expires: '2 years'},
      {name: 'ai_user', cat: this.USAGE, purpose: 'Generated user ID for usage tracking (Application Insights)', expires: '6 months'},
      {name: '_oauth2_proxy', cat: this.SECURITY, purpose: 'Used to protect your login session', expires: '4 hours'},
      {name: '_gid', cat: this.GOOGLE, purpose: this.googlePurpose, expires: '1 day'},
      {name: '_ga', cat: this.GOOGLE, purpose: 'This stores information about your session', expires: '2 years'},
      {name: '_ga_XXXXXXXXXX', cat: this.GOOGLE, purpose: 'This stores information about your session', expires: '2 years'},
      {name: '_gat_XXXXXXXXXX', cat: this.GOOGLE, purpose: 'This is used to control the rate at which requests to the analytics software are made', expires: '1 day'},
      {name: '__userid__', cat: this.IDENTIFY, purpose: 'Your user ID', expires: 'When you close your browser'},
      {name: '__auth__', cat: this.SECURITY, purpose: 'Information about your current system authorisations', expires: 'When you close your browser'},
      {name: 'XSRF-TOKEN', cat: this.SECURITY, purpose: 'Used to protect your session against cross site scripting attacks', expires: 'When you close your browser'}
    ];

  public countCookies(category: string) {
    return this.cookiesByCat(category).length;
  }

  public cookiesByCat(category: string) {
    return this.cookieDetails.filter(c => c.cat === category);
  }
}
