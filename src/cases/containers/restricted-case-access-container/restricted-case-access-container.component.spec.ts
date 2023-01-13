import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestrictedCaseAccessContainerComponent } from './restricted-case-access-container.component';

fdescribe('RestrictedCaseAccessContainerComponent', () => {
  let component: RestrictedCaseAccessContainerComponent;
  let fixture: ComponentFixture<RestrictedCaseAccessContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [RestrictedCaseAccessContainerComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedCaseAccessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
