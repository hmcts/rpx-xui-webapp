import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JudgeDetailsSectionComponent } from './judge-details-section.component';

describe('JudgeDetailsSectionComponent', () => {
  let component: JudgeDetailsSectionComponent;
  let fixture: ComponentFixture<JudgeDetailsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [JudgeDetailsSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(JudgeDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
