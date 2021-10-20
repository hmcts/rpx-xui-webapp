import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContactDetailsComponent } from '@hmcts/rpx-xui-common-lib';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { GetHelpComponent } from '..';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('GetHelpComponent', () => {
  let component: GetHelpComponent;
  let fixture: ComponentFixture<GetHelpComponent>;
  let mockStore: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [GetHelpComponent, ContactDetailsComponent],
      providers: [
      {
        provide: Store,
        useValue: mockStore
      }
    ]
    })
      .compileComponents();
  }));

  describe('Testing using store of component', () => {

    beforeEach(() => {
      mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
      component = new GetHelpComponent(mockStore);
    });

    it('should have a defined component', () => {
      expect(component).toBeDefined();
    });

    describe('ngOnInit()', () => {

      it('should initially set caseManager to be true, if there is a pui-case-manager user role.', () => {
        const userDetails = {
          sessionTimeout: {
            idleModalDisplayTime: 10,
            totalIdleTime: 1,
          },
          canShareCases: true,
          userInfo: {
            id: 'someId',
            forename: 'foreName',
            surname: 'surName',
            email: 'email@email.com',
            active: true,
            roles: ['pui-case-manager']
          }
        };
        mockStore.pipe.and.returnValue(of(userDetails));
        component.ngOnInit();
        expect(component.caseManager).toBeTruthy();
      });

      it('should initially set caseManager to be false, if there is no pui-case-manager user role.', () => {
        const userDetails = {
          sessionTimeout: {
            idleModalDisplayTime: 10,
            totalIdleTime: 1,
          },
          canShareCases: true,
          userInfo: {
            id: 'someId',
            forename: 'foreName',
            surname: 'surName',
            email: 'email@email.com',
            active: true,
            roles: ['somerole']
          }
        };
        mockStore.pipe.and.returnValue(of(userDetails));
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

  describe('Testing HTML', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(GetHelpComponent);
      component = fixture.componentInstance;
      /* component.caseManager = true;
      component.userDetails$ = jasmine.createSpyObj('userDetails$', ['subscribe']);
      fixture.detectChanges(); */
    });

    describe('Verify HTML content on Get help page', () => {

      it('header title should be "Get help"', () => {
        const getHelpDe: DebugElement = fixture.debugElement;
        const headerElementDe: DebugElement = getHelpDe.query(By.css('h1'));
        const headerElementNative: HTMLElement = headerElementDe.nativeElement;
        expect(headerElementNative.textContent).toEqual('Get help');
      });

      /* it('should show a minor header if caseManager is true', () => {

        const getHelpDe: DebugElement = fixture.debugElement;
        const headerElementDe: DebugElement = getHelpDe.query(By.css('h3'));
        const headerElementNative: HTMLElement = headerElementDe.nativeElement;
        expect(headerElementNative.textContent).toEqual('MyHMCTS services');
      }); */
    });
  });
});
