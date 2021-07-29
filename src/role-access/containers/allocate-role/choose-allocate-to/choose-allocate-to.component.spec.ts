import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAllocateToComponent } from './choose-allocate-to.component';

describe('ChooseAllocateToComponent', () => {
  let component: ChooseAllocateToComponent;
  let fixture: ComponentFixture<ChooseAllocateToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAllocateToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAllocateToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
