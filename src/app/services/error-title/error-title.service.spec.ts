import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ErrorTitleService } from './error-title.service';

describe('ErrorTitleService', () => {
  let service: ErrorTitleService;
  let title: Title;
  let summary: HTMLElement;
  let originalTitle: string;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorTitleService);
    title = TestBed.inject(Title);
    originalTitle = title.getTitle();
    title.setTitle('Work access - HM Courts & Tribunals Service - GOV.UK');
  });

  afterEach(() => {
    summary?.remove();
    summary = undefined;
    service.ngOnDestroy();
    title.setTitle(originalTitle);
  });

  function addErrorSummary(): HTMLElement {
    summary = document.createElement('div');
    summary.className = 'govuk-error-summary';
    summary.textContent = 'There is a problem';
    document.body.appendChild(summary);
    return summary;
  }

  it('prefixes the title while a visible error summary is on the page', () => {
    addErrorSummary();
    service.sync();
    expect(title.getTitle()).toBe('Error: Work access - HM Courts & Tribunals Service - GOV.UK');
  });

  it('adds the prefix only once', () => {
    addErrorSummary();
    service.sync();
    service.sync();
    expect(title.getTitle()).toBe('Error: Work access - HM Courts & Tribunals Service - GOV.UK');
  });

  it('removes the prefix once the error summary is gone', () => {
    addErrorSummary();
    service.sync();
    summary.remove();
    service.sync();
    expect(title.getTitle()).toBe('Work access - HM Courts & Tribunals Service - GOV.UK');
  });

  it('ignores hidden error summaries', () => {
    addErrorSummary().style.display = 'none';
    service.sync();
    expect(title.getTitle()).toBe('Work access - HM Courts & Tribunals Service - GOV.UK');
  });

  it('reacts to error summaries added after start', (done) => {
    service.start();
    addErrorSummary();
    setTimeout(() => {
      expect(title.getTitle()).toBe('Error: Work access - HM Courts & Tribunals Service - GOV.UK');
      done();
    }, 100);
  });
});
