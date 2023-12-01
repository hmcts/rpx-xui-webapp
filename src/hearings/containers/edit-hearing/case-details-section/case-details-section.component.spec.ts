import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseDetailsSectionComponent } from './case-details-section.component';

describe('CaseDetailsSectionComponent', () => {
  let component: CaseDetailsSectionComponent;
  let fixture: ComponentFixture<CaseDetailsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [CaseDetailsSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(CaseDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
