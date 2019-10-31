import { Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment as config } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(
    private router: Router,
    private title: Title,
  ) {}

  public init() {
    try {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + config.googleAnalyticsKey;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '` + config.googleAnalyticsKey + `', {'send_page_view': false});
      `;
      document.head.appendChild(script2);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
    this.listenForRouteChanges();
  }

  private listenForRouteChanges() {
    console.log('listen for route changes');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('calling gtag');
        console.log('config.googleAnalyticsKey', config.googleAnalyticsKey);
        console.log('event.urlAfterRedirects', event.urlAfterRedirects);
        console.log('title', this.title.getTitle());
        gtag('config', config.googleAnalyticsKey, {
          page_path: event.urlAfterRedirects,
          page_title: this.title.getTitle(),
        });
      }
    });
  }

  public event(eventName: string, params: {}) {
    gtag('event', eventName, params);
  }

}
