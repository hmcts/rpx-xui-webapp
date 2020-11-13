import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocCheckAndSubmitComponent } from './noc-check-and-submit.component';

describe('NocCheckAndSubmitComponent', () => {
  let component: NocCheckAndSubmitComponent;
  let fixture: ComponentFixture<NocCheckAndSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocCheckAndSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocCheckAndSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
