import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReallocateComponent } from './reallocate.component';

describe('ReallocateComponent', () => {
  let component: ReallocateComponent;
  let fixture: ComponentFixture<ReallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
