import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CaseDetailsComponent } from './case-details.component';

describe('CaseDetailsComponent', () => {
  let component: CaseDetailsComponent;
  let fixture: ComponentFixture<CaseDetailsComponent>;
  const storeMock = jasmine.createSpyObj('mockStore', ['pipe']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CaseDetailsComponent],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDetailsComponent);
    component = fixture.componentInstance;
    storeMock.pipe.and.returnValue(of('dummy'));
    fixture.detectChanges();
  });

  it('should assign case id', () => {
    expect(component.caseId).toEqual('dummy');
  });

  it('should add a new-tab warning to event links and their accessible names', () => {
    const host = fixture.nativeElement as HTMLElement;
    host.innerHTML = `
      <a href="/event/1" target="_blank" aria-label="Open event example">Create an exception record</a>
      <a href="/event/2" target="_blank">Another event</a>
      <a href="/event/3">Same-tab event</a>
    `;

    component['addNewWindowHints'](host);

    const [labelledLink, unlabelledLink, sameTabLink] = Array.from(host.querySelectorAll('a'));
    expect(labelledLink.textContent).toContain('(opens in a new tab)');
    expect(labelledLink.getAttribute('aria-label')).toBe('Open event example (opens in a new tab)');
    expect(unlabelledLink.textContent).toContain('(opens in a new tab)');
    expect(sameTabLink.textContent).toBe('Same-tab event');

    component['addNewWindowHints'](host);
    expect(labelledLink.querySelectorAll('[data-new-window-hint]').length).toBe(1);
  });

  it('should add a warning to event links rendered after the view initializes', async () => {
    const host = fixture.nativeElement as HTMLElement;
    const link = document.createElement('a');
    link.href = '/event/late';
    link.target = '_blank';
    link.textContent = 'Late event';
    host.appendChild(link);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(link.textContent).toContain('(opens in a new tab)');
  });

  it('should unsubscribe', () => {
    spyOn(component.$caseIdSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.$caseIdSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should unsubscribe ', () => {
    const subscription = jasmine.createSpyObj('myObject', ['unsubscribe']);

    component.unSubscribe(subscription);
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should not call unsubscribe when no subscription', () => {
    const subscription = jasmine.createSpyObj('myObject', ['unsubscribe']);

    component.unSubscribe(null);
    expect(subscription.unsubscribe).not.toHaveBeenCalled();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
