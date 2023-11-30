import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingTimingSectionComponent } from './hearing-timing-section.component';

describe('HearingTimingSectionComponent', () => {
  let component: HearingTimingSectionComponent;
  let fixture: ComponentFixture<HearingTimingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HearingTimingSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(HearingTimingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
