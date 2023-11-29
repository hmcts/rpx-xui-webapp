import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingVenueSectionComponent } from './hearing-venue-section.component';

describe('HearingVenueSectionComponent', () => {
  let component: HearingVenueSectionComponent;
  let fixture: ComponentFixture<HearingVenueSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HearingVenueSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(HearingVenueSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
