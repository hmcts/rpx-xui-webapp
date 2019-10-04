import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessibilityComponent } from '..';

describe('AccessibilityComponent', () => {
  let component: AccessibilityComponent;
  let fixture: ComponentFixture<AccessibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('date should be contained inside the html', () => {
   component.date = 'Any date time';
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.textContent).toContain(component.date);
  });
});
