import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageRequirementsSectionComponent } from './language-requirements-section.component';

describe('LanguageRequirementsSectionComponent', () => {
  let component: LanguageRequirementsSectionComponent;
  let fixture: ComponentFixture<LanguageRequirementsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        LanguageRequirementsSectionComponent
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageRequirementsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('needWelsh');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'needWelsh', changeLink: '/hearings/request/hearing-welsh#welsh_hearing_yes'
    });
  });
});
