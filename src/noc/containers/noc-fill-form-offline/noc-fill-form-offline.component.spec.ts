import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NocFillFormOfflineComponent } from './noc-fill-form-offline.component';


describe('NocFillFormOfflineComponent', () => {
  let component: NocFillFormOfflineComponent;
  let fixture: ComponentFixture<NocFillFormOfflineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NocFillFormOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocFillFormOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
