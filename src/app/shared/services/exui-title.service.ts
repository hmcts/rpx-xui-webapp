import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ExUITitleService implements OnInit, OnDestroy {
  public titleSubscription: Subscription;
  public title$: Observable<string>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly titleService: Title
  ) { }

  public ngOnInit() {
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

  public ngOnDestroy() {
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
  }
}
