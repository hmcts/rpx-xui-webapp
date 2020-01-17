import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SignedOutComponent} from '..';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContactDetailsComponent } from '@hmcts/rpx-xui-common-lib';

describe('SignedOutComponent', () => {
  let component: SignedOutComponent;
  let fixture: ComponentFixture<SignedOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ SignedOutComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInIt', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should have redirectUrl', () => {
    component.ngOnInit();
    expect(component.redirectUrl).toBe('./');
  });

});
