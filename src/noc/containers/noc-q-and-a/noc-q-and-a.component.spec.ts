import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocQAndAComponent } from './noc-q-and-a.component';

describe('NocQAndAComponent', () => {
  let component: NocQAndAComponent;
  let fixture: ComponentFixture<NocQAndAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocQAndAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocQAndAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
