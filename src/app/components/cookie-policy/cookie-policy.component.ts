import { Component } from '@angular/core';
import { RpxTranslationService } from 'rpx-xui-translation';

interface CookieDetails{
  name: string;
  cat: string;
  catAlias?: string;
  purpose: string;
  expires: string;
}

@Component({
  selector: 'exui-cookie-policy',
  templateUrl: './cookie-policy.component.html'
})
export class CookiePolicyComponent {
  public readonly googlePurpose =
    'This helps us count how many people visit the service by tracking if you\'ve visited before';

  // Ideally this would be an enum but angular can't seem to cope with enums in templates
  public readonly USAGE = 'Usage';
  public readonly USAGE_WELSH = 'Defnydd';
  public readonly INTRO = 'Intro';
  public readonly SESSION = 'Session';
  public readonly IDENTIFY = 'Identify';
  public readonly SECURITY = 'Security';
  public readonly GOOGLE = 'Google';

  public readonly cookieDetails: CookieDetails[] = [
    {
      name: 'xui-mo-webapp',
      cat: this.SECURITY,
      purpose: 'Used to secure communications with HMCTS data services',
      expires: '8 hours'
    },
    {
      name: 'rxVisitor',
      cat: this.USAGE,
      purpose: 'Generated user ID for usage tracking (Dynatrace)',
      expires: '2 years'
    },
    {
      name: 'ai_user',
      cat: this.USAGE,
      purpose: 'Generated user ID for usage tracking (Application Insights)',
      expires: '6 months'
    },
    {
      name: 'ai_session',
      cat: this.USAGE,
      purpose: 'Generated session ID for usage tracking (Application Insights)',
      expires: '6 months'
    },
    {
      name: '_oauth2_proxy',
      cat: this.SECURITY,
      purpose: 'Used to protect your login session',
      expires: '4 hours'
    },
    {
      name: '_gid',
      cat: this.GOOGLE,
      purpose: this.googlePurpose,
      expires: '1 day'
    },
    {
      name: '_ga',
      cat: this.GOOGLE,
      purpose: 'This stores information about your session',
      expires: '2 years'
    },
    {
      name: '_ga_XXXXXXXXXX',
      cat: this.GOOGLE,
      purpose: 'This stores information about your session',
      expires: '2 years'
    },
    {
      name: '_gat_XXXXXXXXXX',
      cat: this.GOOGLE,
      purpose:
        'This is used to control the rate at which requests to the analytics software are made',
      expires: '1 day'
    },
    {
      name: '__userid__',
      cat: this.IDENTIFY,
      purpose: 'Your user ID',
      expires: 'When you close your browser'
    },
    {
      name: '__auth__',
      cat: this.SECURITY,
      purpose: 'Information about your current system authorisations',
      expires: 'When you close your browser'
    },
    {
      name: 'XSRF-TOKEN',
      cat: this.SECURITY,
      purpose:
        'Used to protect your session against cross site scripting attacks',
      expires: 'When you close your browser'
    }
  ];

  public readonly cookieDetailsWelsh: CookieDetails[] = [
    {
      name: 'xui-mo-webapp',
      cat: this.SECURITY,
      purpose: 'Defnyddir i ddiogelu cyfathrebu gyda gwasanaethau data GLlTEF.',
      expires: '8 awr'
    },
    {
      name: 'rxVisitor',
      catAlias: this.USAGE_WELSH,
      cat: this.USAGE,
      purpose: 'ID defnyddiwr a gynhyrchwyd ar gyfer tracio defnydd (Dynatrace)',
      expires: '2 years'
    },
    {
      name: 'ai_defnyddiwr',
      catAlias: this.USAGE_WELSH,
      cat: this.USAGE,
      purpose: 'ID defnyddiwr a gynhyrchwyd ar gyfer tracio defnydd (Application Insights)',
      expires: '6 months'
    },
    {
      name: 'ai_sesiwn',
      catAlias: this.USAGE_WELSH,
      cat: this.USAGE,
      purpose: 'ID defnyddiwr a gynhyrchwyd ar gyfer tracio defnydd (Application Insights)',
      expires: '6 months'
    },
    {
      purpose: 'Defnyddir i ddiogelu eich sesiwn mewngofnodi',
      name: '_oauth2_proxy',
      cat: this.SECURITY,
      expires: '4 awr'
    },
    {
      name: '_gid',
      cat: this.GOOGLE,
      purpose: this.googlePurpose,
      expires: '1 day'
    },
    {
      purpose: 'This stores information about your session',
      name: '_ga',
      cat: this.GOOGLE,
      expires: '2 years'
    },
    {
      name: '_ga_XXXXXXXXXX',
      cat: this.GOOGLE,
      purpose: 'This stores information about your session',
      expires: '2 years'
    },
    {
      name: '_gat_XXXXXXXXXX',
      cat: this.GOOGLE,
      purpose: 'This is used to control the rate at which requests to the analytics software are made',
      expires: '1 day'
    },
    {
      name: '__id defnyddiwr__',
      cat: this.IDENTIFY,
      purpose: 'Eich ID defnyddiwr',
      expires: 'Pan fyddwch yn cau eich porwr'
    },
    {
      name: '__auth__',
      cat: this.SECURITY,
      purpose: 'Gwybodaeth am eich awdurdodiadau system cyfredol',
      expires: 'Pan fyddwch yn cau eich porwr'
    },
    {
      name: 'XSRF-TOKEN',
      cat: this.SECURITY,
      purpose: 'Defnyddir i ddiogelu eich sesiwn rhag ymosodiadau sgriptio ar draws safleoedd',
      expires: 'Pan fyddwch yn cau eich porwr'
    }
  ];

  constructor(private readonly langService: RpxTranslationService) {}

  public get showWelshTranslation(): boolean {
    return this.langService.language === 'cy';
  }

  public countCookies(category: string): number {
    return this.cookiesByCat(category).length;
  }

  public cookiesByCat(
    category: string
  ): CookieDetails[] {
    const details = this.showWelshTranslation ? this.cookieDetailsWelsh : this.cookieDetails;
    return (
      details &&
      details
        .filter((c) => c.cat === category)
        .map((c) => ({ ...c, cat: c.catAlias || c.cat }))
    );
  }
}
