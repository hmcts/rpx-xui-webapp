import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageRequirementsSectionComponent } from './language-requirements-section.component';

describe('LanguageRequirementsSectionComponent', () => {
  let component: LanguageRequirementsSectionComponent;
  let fixture: ComponentFixture<LanguageRequirementsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [LanguageRequirementsSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageRequirementsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
