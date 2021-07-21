import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAllocationComponent } from './remove-allocation.component';

describe('RemoveAllocationComponent', () => {
  let component: RemoveAllocationComponent;
  let fixture: ComponentFixture<RemoveAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
