import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExuiCaseSearchComponent } from './exui-case-search.component';

describe('ExuiCaseSearchComponent', () => {
  let component: ExuiCaseSearchComponent;
  let fixture: ComponentFixture<ExuiCaseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExuiCaseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExuiCaseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
