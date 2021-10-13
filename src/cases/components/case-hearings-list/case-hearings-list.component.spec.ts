import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '../../../hearings/models/hearings.enum';
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
    component.actions = [Actions.Cancel];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
