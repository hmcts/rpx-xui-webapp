import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHearingComponent } from './edit-hearing.component';

describe('EditHearingComponent', () => {
  let component: EditHearingComponent;
  let fixture: ComponentFixture<EditHearingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EditHearingComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(EditHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
