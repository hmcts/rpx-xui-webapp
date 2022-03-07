import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { hearingRequestMainModel } from "src/hearings/hearing.test.data";
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

  it('should display case title if case details object is not empty', () => {
    component.caseDetails = hearingRequestMainModel.caseDetails;
    fixture.detectChanges();
    const caseNameEl = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(caseNameEl.textContent).toContain('Jane Smith vs DWP');
  })
});
