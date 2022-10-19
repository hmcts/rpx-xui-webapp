import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificAccessDuplicateRecordComponent } from './specific-access-duplicate-record.component';

describe('SpecificAccessDuplicateRecordComponent', () => {
  let component: SpecificAccessDuplicateRecordComponent;
  let fixture: ComponentFixture<SpecificAccessDuplicateRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificAccessDuplicateRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificAccessDuplicateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
