import { Subscription, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OnDestroy, Injectable, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class ExUITitleService implements OnInit, OnDestroy {
  titleSubscription: Subscription;
  title$: Observable<string>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
  }

  ngOnInit() {
    this.title$ =  this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        let title = '';
        if (child.snapshot.data.title) {
          title = child.snapshot.data.title;
        }
        while (child.firstChild) {
          child = child.firstChild;
          if (child.snapshot.data.title) {
            title = child.snapshot.data.title;
          }
        }
        return title;
      })
    );

    this.titleSubscription = this.title$.subscribe((ttl: string) => {
      this.titleService.setTitle(ttl);
    });
  }
  ngOnDestroy() {
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
  }
}
