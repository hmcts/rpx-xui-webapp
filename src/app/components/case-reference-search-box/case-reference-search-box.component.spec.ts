import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseReferenceSearchBoxComponent } from './case-reference-search-box.component';

describe('ExuiCaseReferenceSearchBoxComponent', () => {
  let component: CaseReferenceSearchBoxComponent;
  let fixture: ComponentFixture<CaseReferenceSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseReferenceSearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseReferenceSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
