import { ComponentFixture, TestBed } from '@angular/core/testing';
import { hearingStageRefData, initialState } from '../../../../hearing.test.data';
import { HearingStageSectionComponent } from './hearing-stage-section.component';

describe('HearingStageSectionComponent', () => {
  let component: HearingStageSectionComponent;
  let fixture: ComponentFixture<HearingStageSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        HearingStageSectionComponent
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(HearingStageSectionComponent);
    component = fixture.componentInstance;
    component.hearingStageOptionsRefData = hearingStageRefData;
    component.hearingRequestMainModel = initialState.hearings.hearingRequest.hearingRequestMainModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud set hearing stage', () => {
    component.ngOnInit();
    expect(component.hearingStage).toEqual('Final');
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('stage');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'stage', changeLink: '/hearings/request/hearing-stage#initial'
    });
  });
});
