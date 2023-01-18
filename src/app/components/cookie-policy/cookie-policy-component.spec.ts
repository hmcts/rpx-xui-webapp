import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookiePolicyComponent } from './cookie-policy.component';

describe('CookiePolicyComponentTest', () => {

  @Component({selector: 'exui-app-header', template: ''})
  class HeaderStubComponent {
  }

  @Component({selector: 'exui-app-footer', template: ''})
  class FooterStubComponent {
  }

  let component: CookiePolicyComponent;
  let fixture: ComponentFixture<CookiePolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderStubComponent, FooterStubComponent, CookiePolicyComponent ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CookiePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created by angular', () => {
    expect(fixture).not.toBeNull();
  });
  it('should include 4 security cookies', () => {
    expect(component.countCookies(component.SECURITY)).toBe(4);
  });
  it ('should return the __userid__ cookie as an identity cookie', () => {
    const cookieName = component.cookiesByCat(component.IDENTIFY)[0].name;
    expect (cookieName).toBe('__userid__');
  });
  it ('cookiesByCat should be consistent with countCookies', () => {
    const cookies = component.cookiesByCat(component.SECURITY);
    let cc = 0;
    for (const ccc of cookies) {
      expect(ccc.cat).toBe(component.SECURITY);
      cc = cc + 1;
    }
    expect (cc).toEqual(component.countCookies(component.SECURITY));
  });
});
