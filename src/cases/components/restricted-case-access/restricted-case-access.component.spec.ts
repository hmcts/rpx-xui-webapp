import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestrictedCaseAccessComponent } from './restricted-case-access.component';

describe('RestrictedCaseAccessComponent', () => {
  let component: RestrictedCaseAccessComponent;
  let fixture: ComponentFixture<RestrictedCaseAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [RestrictedCaseAccessComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(RestrictedCaseAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});