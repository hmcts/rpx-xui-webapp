import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GetHelpComponent } from '..';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContactDetailsComponent } from '@hmcts/rpx-xui-common-lib';

describe('GetHelpComponent', () => {
  let component: GetHelpComponent;
  let fixture: ComponentFixture<GetHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ GetHelpComponent, ContactDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
