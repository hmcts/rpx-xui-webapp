import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExuiCoreComponent } from './exui-core.component';

describe('ExuiCoreComponent', () => {
  let component: ExuiCoreComponent;
  let fixture: ComponentFixture<ExuiCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExuiCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExuiCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
