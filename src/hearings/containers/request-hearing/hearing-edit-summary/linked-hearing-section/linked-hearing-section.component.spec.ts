import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkedHearingSectionComponent } from './linked-hearing-section.component';

describe('LinkedHearingSectionComponent', () => {
  let component: LinkedHearingSectionComponent;
  let fixture: ComponentFixture<LinkedHearingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        LinkedHearingSectionComponent
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(LinkedHearingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('linkedHearings');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'linkedHearings', changeLink: '/hearings/request/hearing-link#yes'
    });
  });
});
