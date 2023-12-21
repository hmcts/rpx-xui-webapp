import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarningAndErrorSectionComponent } from './warning-and-error-section.component';

describe('WarningAndErrorSectionComponent', () => {
  let component: WarningAndErrorSectionComponent;
  let fixture: ComponentFixture<WarningAndErrorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarningAndErrorSectionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningAndErrorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
