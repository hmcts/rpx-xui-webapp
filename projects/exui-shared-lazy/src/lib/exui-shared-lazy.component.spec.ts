import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExuiSharedLazyComponent } from './exui-shared-lazy.component';

describe('ExuiSharedLazyComponent', () => {
  let component: ExuiSharedLazyComponent;
  let fixture: ComponentFixture<ExuiSharedLazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExuiSharedLazyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExuiSharedLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
