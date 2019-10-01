import { Router, ActivatedRoute, Routes } from '@angular/router';
import { TestBed, inject, fakeAsync, getTestBed } from '@angular/core/testing';
import { ExUITitleService } from './exui-title.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NgModule } from '@angular/core';

@Component({ template: '<router-outlet></router-outlet>' })
class TestBootstrapComponent {
  constructor(private titleService: ExUITitleService) {}
}

@Component({ template: '' })
class TestComponent {}

@NgModule({
  declarations: [TestComponent, TestBootstrapComponent],
  imports: [RouterTestingModule],
  providers: [
    ExUITitleService
  ]
})
class TestSharedModule { }

const testRoutes: Routes = [
  {
    path: 'home',
    component: TestComponent,
    data: {
      title: 'test title'
    }
  }
];

describe('ExUITitleService', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
        .configureTestingModule({
          imports: [
            TestSharedModule,
            RouterTestingModule.withRoutes(testRoutes),
          ]
        });
  });

  it('should be able to return title from observable',
      () => {
          const injector = getTestBed();
          const router = injector.get(Router);
          const titleService = injector.get(ExUITitleService);
          const fixture = TestBed.createComponent(TestBootstrapComponent);
          fixture.detectChanges();
          const component = fixture.componentRef.instance;
          titleService.title$.subscribe( title  => {
            expect(title).toEqual('test title');
          });
          // initial navigation
          router.navigate(['home']);
        });
});
