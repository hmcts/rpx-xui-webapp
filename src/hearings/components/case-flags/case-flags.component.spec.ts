import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CaseFlagsComponent } from './case-flags.component';

describe('CaseFlagsComponent', () => {
  let component: CaseFlagsComponent;
  let fixture: ComponentFixture<CaseFlagsComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [CaseFlagsComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CaseFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
