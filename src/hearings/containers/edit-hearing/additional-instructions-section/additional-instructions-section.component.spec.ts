import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalInstructionsSectionComponent } from './additional-instructions-section.component';

describe('AdditionalInstructionsSectionComponent', () => {
  let component: AdditionalInstructionsSectionComponent;
  let fixture: ComponentFixture<AdditionalInstructionsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AdditionalInstructionsSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalInstructionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
