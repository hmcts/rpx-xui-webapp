import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmendmentLabelComponent } from './amendment-label.component';

describe('AmendmentLabelComponent', () => {
  let component: AmendmentLabelComponent;
  let fixture: ComponentFixture<AmendmentLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmendmentLabelComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmendmentLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
