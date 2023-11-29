import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingRequirementsSectionComponent } from './hearing-requirements-section.component';

describe('HearingRequirementsSectionComponent', () => {
  let component: HearingRequirementsSectionComponent;
  let fixture: ComponentFixture<HearingRequirementsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HearingRequirementsSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(HearingRequirementsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
