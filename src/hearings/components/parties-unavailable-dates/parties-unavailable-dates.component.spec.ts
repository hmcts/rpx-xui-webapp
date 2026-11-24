import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockRpxTranslatePipe } from '../../../app/shared/test/mock-rpx-translate.pipe';
import { PartiesUnavailableDatesComponent } from './parties-unavailable-dates.component';

describe('PartiesUnavailableDatesComponent', () => {
  let component: PartiesUnavailableDatesComponent;
  let fixture: ComponentFixture<PartiesUnavailableDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesUnavailableDatesComponent, MockRpxTranslatePipe],
    }).compileComponents();
    fixture = TestBed.createComponent(PartiesUnavailableDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps long date lists in the page scroll flow instead of creating a nested scroll area', () => {
    component.unAvailableDates = Array.from({ length: 11 }, (_, index) => `Date ${index + 1}`);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.scroll-view')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.govuk-details__text span').length).toBe(11);
  });
});
