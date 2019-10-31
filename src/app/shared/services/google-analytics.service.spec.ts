import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { GoogleAnalyticsService } from './google-analytics.service';
import { Title } from '@angular/platform-browser';
import { environment as config} from '../../../environments/environment';

class MockTitle {
  getTitle(): string {
    return 'mockTitle';
  }
}

const MockConfig = {
    googleAnalyticsKey: 'GoogleKeyID',
};

declare let gtag: Function;

describe('GoogleAnalyticsService', () => {
  let titleTestBed: Title;
  let configTestBed: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        GoogleAnalyticsService,
        {
          provide: Title,
          useClass: MockTitle,
        },
        {
          provide: Router,
          useValue: {
            events: new BehaviorSubject<Event>(null)
          }
        },
        {
          provide: config,
          useValue: MockConfig
        },
      ]
    });

    titleTestBed = TestBed.get(Title);
    configTestBed = TestBed.get(config);

  });

  it('should be created', inject([GoogleAnalyticsService], (service: GoogleAnalyticsService) => {
    expect(service).toBeTruthy();
  }));

  it('init should call router navigation end', inject([GoogleAnalyticsService], (service: GoogleAnalyticsService) => {
    config.googleAnalyticsKey = 'testId';
    const event = new NavigationEnd(42, '/url', '/redirect-url');
    TestBed.get(Router).events.next(event);
    spyOn(titleTestBed, 'getTitle').and.returnValue('testTitle');
    // const gtagSpy = jasmine.createSpy('gtag');
    // service.init();
    // expect(gtagSpy).toHaveBeenCalled();
    spyOn(window as any, 'gtag').and.callThrough();
    service.init();
    expect(gtag).toHaveBeenCalled();
  }));

});
