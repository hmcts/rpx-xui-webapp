import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkedHearingSectionComponent } from './linked-hearing-section.component';

describe('LinkedHearingSectionComponent', () => {
  let component: LinkedHearingSectionComponent;
  let fixture: ComponentFixture<LinkedHearingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [LinkedHearingSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(LinkedHearingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
