import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions, HearingsSectionStatusEnum } from '../../../hearings/models/hearings.enum';
import { HearingsPipesModule } from '../../../hearings/pipes/hearings.pipes.module';
import { CaseHearingsListComponent } from './case-hearings-list.component';

describe('CaseHearingsListComponent', () => {
  let component: CaseHearingsListComponent;
  let fixture: ComponentFixture<CaseHearingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([
        ]),
        HearingsPipesModule
      ],
      declarations: [ CaseHearingsListComponent ],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHearingsListComponent);
    component = fixture.componentInstance;
    component.actions = [Actions.Delete];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hasReadOnlyAction if status is past and cancelled', () => {
    component.status = HearingsSectionStatusEnum.PAST_AND_CANCELLED;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasReadOnlyAction).toBeTruthy();
  });

  it('should hasUpdateAction if status upcoming', () => {
    component.status = HearingsSectionStatusEnum.UPCOMING;
    component.actions = [Actions.Update, Actions.Delete];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasUpdateAction).toBeTruthy();
  });

  it('should hasUpdateAction if status upcoming', () => {
    component.status = HearingsSectionStatusEnum.UPCOMING;
    component.actions = [Actions.Update, Actions.Delete];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasDeleteAction).toBeTruthy();
  });

  it('should hasReadOnlyAction if status upcoming', () => {
    component.status = HearingsSectionStatusEnum.UPCOMING;
    component.actions = [Actions.Read];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasReadOnlyAction).toBeTruthy();
  });
});
