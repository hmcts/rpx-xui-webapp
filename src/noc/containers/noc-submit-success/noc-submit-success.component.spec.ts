import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocSubmitSuccessComponent } from './noc-submit-success.component';

describe('NocSubmitSuccessComponent', () => {
  let component: NocSubmitSuccessComponent;
  let fixture: ComponentFixture<NocSubmitSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocSubmitSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocSubmitSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
