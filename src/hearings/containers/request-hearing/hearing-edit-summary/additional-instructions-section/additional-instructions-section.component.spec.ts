import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalInstructionsSectionComponent } from './additional-instructions-section.component';

describe('AdditionalInstructionsSectionComponent', () => {
  let component: AdditionalInstructionsSectionComponent;
  let fixture: ComponentFixture<AdditionalInstructionsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AdditionalInstructionsSectionComponent
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalInstructionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set additional instructions', () => {
    component.listingComments = 'This is a test comment.';
    component.ngOnInit();
    expect(component.additionalInstructions).toEqual('This is a test comment.');
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('additionalInstruction');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'additionalInstruction', changeLink: '/hearings/request/hearing-additional-instructions#additionalInstructionsTextarea'
    });
  });
});
