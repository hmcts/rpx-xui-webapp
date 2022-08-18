import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PhaseBannerComponent } from './phase-banner.component';

describe('PhaseBannerComponent', () => {
  let component: PhaseBannerComponent;
  let fixture: ComponentFixture<PhaseBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhaseBannerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the feedback link', () => {
    const feedbackLinkClass = '.govuk-phase-banner .govuk-link';
    const feedbackLinkElement = fixture.debugElement.query(By.css(feedbackLinkClass)).nativeElement;
    const feedbackLinkSpanElement = fixture.debugElement.query(By.css(`${feedbackLinkClass} span.visuallyhidden`)).nativeElement;

    expect(feedbackLinkElement.getAttribute('target')).toBe('_blank');
    expect(feedbackLinkElement.innerHTML).toContain('feedback');
    expect(feedbackLinkSpanElement.innerHTML).toEqual('(Opens in a new window)');
  });

});
