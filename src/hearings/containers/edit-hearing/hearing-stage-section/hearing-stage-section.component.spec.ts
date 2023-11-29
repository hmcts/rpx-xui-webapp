import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingStageSectionComponent } from './hearing-stage-section.component';

describe('HearingStageSectionComponent', () => {
  let component: HearingStageSectionComponent;
  let fixture: ComponentFixture<HearingStageSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HearingStageSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(HearingStageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
