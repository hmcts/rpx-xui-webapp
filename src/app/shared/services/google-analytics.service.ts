import { Injectable, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WindowToken } from './window';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class GoogleAnalyticsService {

  public googleAnalyticsKey: string;
  constructor(
    private readonly router: Router,
    private readonly title: Title,
    @Inject(WindowToken) private readonly window: Window,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  public init(googleAnalyticsKey: string) {
    this.googleAnalyticsKey = googleAnalyticsKey;
    try {
      const script1 = this.document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.googleAnalyticsKey;
      this.document.head.appendChild(script1);

      const script2 = this.document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);
          console.log('calling gtag');
          console.log(arguments);
        }
        gtag('js', new Date());
        gtag('config', '` + this.googleAnalyticsKey + `', {'send_page_view': false});
      `;
      this.document.head.appendChild(script2);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
    this.listenForRouteChanges();
  }

  private listenForRouteChanges() {
    if (this.googleAnalyticsKey) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (this.window as any).gtag('config', this.googleAnalyticsKey, {
            page_path: event.urlAfterRedirects,
            page_title: this.title.getTitle(),
          });
        }
      });
    }
  }

  public event(eventName: string, params: {}) {
    (this.window as any).gtag('event', eventName, params);
  }

}
