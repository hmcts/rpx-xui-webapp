import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingsPipesModule } from '../../pipes/hearings.pipes.module';
import { LinkedHearingsCaseTitleComponent } from './linked-hearings-case-title.component';

describe('LinkedHearingsCaseTitleComponent', () => {
  let component: LinkedHearingsCaseTitleComponent;
  let fixture: ComponentFixture<LinkedHearingsCaseTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HearingsPipesModule],
      declarations: [LinkedHearingsCaseTitleComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedHearingsCaseTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
