import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocFillFormOfflineComponent } from './noc-fill-form-offline.component';

describe('NocFillFormOfflineComponent', () => {
  let component: NocFillFormOfflineComponent;
  let fixture: ComponentFixture<NocFillFormOfflineComponent>;

  beforeEach(async(() => {
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
