import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GetHelpComponent } from '..';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContactDetailsComponent } from '@hmcts/rpx-xui-common-lib';
import {CookieService} from 'ngx-cookie';

describe('GetHelpComponent', () => {
  let component: GetHelpComponent;
  let fixture: ComponentFixture<GetHelpComponent>;

  const mockCookieService = jasmine.createSpyObj('CookieService', [
    'get',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ GetHelpComponent, ContactDetailsComponent ],
      providers: [{
        provide: CookieService,
        useValue: mockCookieService,
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit()', () => {

    it('should initially set caseManager to be true, if there is a pui-case-manager user role.', () => {
      mockCookieService.get.and.returnValue('j:["caseworker", "pui-case-manager"]');
      component.ngOnInit();
      expect(component.caseManager).toBeTruthy();
    });

    it('should initially set caseManager to be false, if there is no pui-case-manager user role.', () => {
      mockCookieService.get.and.returnValue('j:["caseworker"]');
      component.ngOnInit();
      expect(component.caseManager).toBeFalsy();
    });
  });

  describe('isCaseManager()', () => {

    it('should return true if there is a pui-case-manager user role as part of the userRoles string, so that a pui-case-manager is' +
      'able to view the MyHMCTS contact details.', () => {
      const userRoles = 'j:["caseworker", "pui-case-manager"]';
      expect(component.isCaseManager(userRoles)).toBeTruthy();
    });

    it('should return false if there is not a pui-case-manager user role.', () => {
      const userRoles = 'j:["caseworker"]';
      expect(component.isCaseManager(userRoles)).toBeFalsy();
    });
  });
});
