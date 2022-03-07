import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HearingActualsCaseTitleComponent } from "./hearing-actuals-case-title.component";

describe('HearingActualsCaseTitleComponent', () => {
  let component: HearingActualsCaseTitleComponent;
  let fixture: ComponentFixture<HearingActualsCaseTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsCaseTitleComponent],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingActualsCaseTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
