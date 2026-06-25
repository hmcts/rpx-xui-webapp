import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ChallengedAccessWrapperComponent } from './challenged-access-wrapper.component';

@Component({ standalone: false, selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}

describe('ChallengedAccessWrapperComponent', () => {
  let component: ChallengedAccessWrapperComponent;
  let fixture: ComponentFixture<ChallengedAccessWrapperComponent>;
  let titleService: jasmine.SpyObj<Title>;

  beforeEach(async () => {
    titleService = jasmine.createSpyObj<Title>('Title', ['getTitle', 'setTitle']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ChallengedAccessWrapperComponent],
      providers: [{ provide: Title, useValue: titleService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengedAccessWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create a MutationObserver on init and disconnect it on destroy', () => {
    const observeSpy = spyOn(MutationObserver.prototype, 'observe').and.callThrough();
    const disconnectSpy = spyOn(MutationObserver.prototype, 'disconnect').and.callThrough();

    fixture.detectChanges();
    expect(observeSpy).toHaveBeenCalledWith(fixture.nativeElement, { childList: true, subtree: true });

    component.ngOnDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should prepend "Error: " to the page title when an error summary appears', () => {
    titleService.getTitle.and.returnValue('Case details');
    fixture.detectChanges();

    const errorSummary = document.createElement('div');
    errorSummary.className = 'govuk-error-summary';
    fixture.nativeElement.appendChild(errorSummary);

    // Allow the MutationObserver callback to fire
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(titleService.setTitle).toHaveBeenCalledWith('Error: Case details');
        fixture.nativeElement.removeChild(errorSummary);
        resolve();
      });
    });
  });

  it('should not modify the title if it already starts with "Error:"', () => {
    titleService.getTitle.and.returnValue('Error: Case details');
    fixture.detectChanges();

    const errorSummary = document.createElement('div');
    errorSummary.className = 'govuk-error-summary';
    fixture.nativeElement.appendChild(errorSummary);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(titleService.setTitle).not.toHaveBeenCalled();
        fixture.nativeElement.removeChild(errorSummary);
        resolve();
      });
    });
  });

  it('should not modify the title when no error summary is present', () => {
    titleService.getTitle.and.returnValue('Case details');
    fixture.detectChanges();

    const div = document.createElement('div');
    fixture.nativeElement.appendChild(div);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(titleService.setTitle).not.toHaveBeenCalled();
        fixture.nativeElement.removeChild(div);
        resolve();
      });
    });
  });

  it('should not throw if ngOnDestroy is called before ngOnInit', () => {
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
