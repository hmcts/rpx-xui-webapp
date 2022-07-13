import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SessionStorageService } from 'src/app/services';
import { HmctsGlobalHeaderComponent } from './hmcts-global-header.component';
import createSpyObj = jasmine.createSpyObj;

describe('HmctsGlobalHeaderComponent', () => {
  let nocStoreSpy: jasmine.Spy;
  let component: HmctsGlobalHeaderComponent;
  let fixture: ComponentFixture<HmctsGlobalHeaderComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  const changesMock = {
    items: {
      currentValue: 'a',
      previousValue: 'b',
      firstChange: false,
      isFirstChange: () => false
    }
  };
  const flags = {
    enabledFlag: true,
    disabledFlag: false
  };

  beforeEach(async(() => {
    const USERDETAILS = {
      sub: 'Caseworker.ed@mailinator.com',
      uid: '36314153-06c2-400a-8dc3-7d3790660918',
      roles: [
        'roleA',
        'roleB',
        'roleC',
      ],
      name: 'Caseworker Ed',
      given_name: 'Caseworker',
      family_name: 'Ed test',
      roleCategory: 'LEGAL_OPERATIONS',
      token: 'Bearer eyJ0eXAiOiJKV1QiLCJ6aXAiOiJOT05FIiwia2lkIjoiMWVyMFdSd2dJT1RBRm9qRTRyQy9mYmVLdTNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJDYXNld29ya2VyLmVkQG1haWxpbmF0b3IuY29tIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6ImY3ZjVmNjM4LTBmMDQtNGQxNC1hZmZlLWFjZWVjNzkyYjBjMy04MTI4NTA0NSIsImlzcyI6Imh0dHBzOi8vZm9yZ2Vyb2NrLWFtLnNlcnZpY2UuY29yZS1jb21wdXRlLWlkYW0tYWF0Mi5pbnRlcm5hbDo4NDQzL29wZW5hbS9vYXV0aDIvcmVhbG1zL3Jvb3QvcmVhbG1zL2htY3RzIiwidG9rZW5OYW1lIjoiYWNjZXNzX3Rva2VuIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImF1dGhHcmFudElkIjoia1lNdkJlaUFmbWpYLUlJRW83bXBXVzBHMjU0Iiwibm9uY2UiOiI1SUFIb3FCUUppcXY3amY0a3Rfd0JEYWdrWUZ3SDMwbHBnWnZ5UkdXUWxJIiwiYXVkIjoieHVpd2ViYXBwIiwibmJmIjoxNjQ5Njk4MDk3LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiY3JlYXRlLXVzZXIiLCJtYW5hZ2UtdXNlciIsInNlYXJjaC11c2VyIl0sImF1dGhfdGltZSI6MTY0OTY5ODA5NiwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NDk3MjY4OTcsImlhdCI6MTY0OTY5ODA5NywiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6Il9oNktSTVJmbE5USXVVaWhZNk5OR2tHY2h0cyJ9.PrVZlLToFaOI-sGorD_yVQaXYGqaKIjZ0JOGAFyFfkGkjaqInixhvXJMu7G3QK1cRl5i1MmM3C9_AGL2N4Xh8YLBjqVnIIFfgYom2wBAoON2YcqhUbE3gVtqCPxhhZSNfxXZzspEwYP2oKKFF4M8s6QaflHZZ6eEY1eTnciaYFAHvkgQbNB5lnZHCAeSZC8bbtgHbGKbbgtE0Cpvi6CxvJVMXYk2vo376V-mVxtZrimXhAve8v48EIVDiYxXHgwHdvgUPD6wYZzsnZmdWe5sKMg0NeNdOM8XgLdwbsL-HZcAp7TvtISQ7u8gjM0eTFcLRL1TGYmMxZqUI3jsBsdwOQ'
    };

    const mockSessionStorageService = {
      getItem: jasmine.createSpy('getItem').and.returnValue(JSON.stringify(USERDETAILS))
    };

    TestBed.configureTestingModule({
      declarations: [HmctsGlobalHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore(),
        {
          provide: FeatureToggleService,
          useValue: {
            isEnabled: (flag) => of(flags[flag])
          }
        },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockRouter = TestBed.get(Router);
    spyOnProperty(mockRouter, 'url').and.returnValues('/cases', '/tasks/list', '/tasks/task-manager');
    fixture = TestBed.createComponent(HmctsGlobalHeaderComponent);
    component = fixture.componentInstance;
    component.headerTitle = {
      name: 'Service name',
      url: '#'
    };
    component.showItems = true;
    component.navigation = {
      label: 'Account navigation',
      items: [
        { text: 'Nav item 1', emit: '#1' },
        { text: 'Nav item 2', emit: '#1' }
      ]
    };
    component.items = [{
      align: 'right',
      text: '1',
      href: '',
      active: false
    },
    {
      align: null,
      text: '2',
      href: '',
      active: false
    },
    {
      align: 'right',
      text: '3',
      href: '',
      active: false
    }];
    nocStoreSpy = spyOn(component.nocStore, 'dispatch');
    fixture.detectChanges();
  });

  // 3
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onEmitSubMenu', () => {
    const menuItem = { href: '/noc', text: null };
    component.onEmitSubMenu(menuItem);
    expect(nocStoreSpy).toHaveBeenCalled();
  });

  // 1
  it('should onEmitEvent', () => {
    spyOn(component.navigate, 'emit');
    component.onEmitEvent(1);
    expect(component.navigate.emit).toHaveBeenCalled();
  });

  // 2
  it('splitNavItems', async () => {
    const USERDETAILS = {
      sub: 'Caseworker.ed@mailinator.com',
      uid: '36314153-06c2-400a-8dc3-7d3790660918',
      roles: [
        'roleA',
        'roleB',
        'roleC',
      ],
      name: 'Caseworker Ed',
      given_name: 'Caseworker',
      family_name: 'Ed test',
      roleCategory: 'LEGAL_OPERATIONS',
      token: 'Bearer eyJ0eXAiOiJKV1QiLCJ6aXAiOiJOT05FIiwia2lkIjoiMWVyMFdSd2dJT1RBRm9qRTRyQy9mYmVLdTNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJDYXNld29ya2VyLmVkQG1haWxpbmF0b3IuY29tIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6ImY3ZjVmNjM4LTBmMDQtNGQxNC1hZmZlLWFjZWVjNzkyYjBjMy04MTI4NTA0NSIsImlzcyI6Imh0dHBzOi8vZm9yZ2Vyb2NrLWFtLnNlcnZpY2UuY29yZS1jb21wdXRlLWlkYW0tYWF0Mi5pbnRlcm5hbDo4NDQzL29wZW5hbS9vYXV0aDIvcmVhbG1zL3Jvb3QvcmVhbG1zL2htY3RzIiwidG9rZW5OYW1lIjoiYWNjZXNzX3Rva2VuIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImF1dGhHcmFudElkIjoia1lNdkJlaUFmbWpYLUlJRW83bXBXVzBHMjU0Iiwibm9uY2UiOiI1SUFIb3FCUUppcXY3amY0a3Rfd0JEYWdrWUZ3SDMwbHBnWnZ5UkdXUWxJIiwiYXVkIjoieHVpd2ViYXBwIiwibmJmIjoxNjQ5Njk4MDk3LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiY3JlYXRlLXVzZXIiLCJtYW5hZ2UtdXNlciIsInNlYXJjaC11c2VyIl0sImF1dGhfdGltZSI6MTY0OTY5ODA5NiwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NDk3MjY4OTcsImlhdCI6MTY0OTY5ODA5NywiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6Il9oNktSTVJmbE5USXVVaWhZNk5OR2tHY2h0cyJ9.PrVZlLToFaOI-sGorD_yVQaXYGqaKIjZ0JOGAFyFfkGkjaqInixhvXJMu7G3QK1cRl5i1MmM3C9_AGL2N4Xh8YLBjqVnIIFfgYom2wBAoON2YcqhUbE3gVtqCPxhhZSNfxXZzspEwYP2oKKFF4M8s6QaflHZZ6eEY1eTnciaYFAHvkgQbNB5lnZHCAeSZC8bbtgHbGKbbgtE0Cpvi6CxvJVMXYk2vo376V-mVxtZrimXhAve8v48EIVDiYxXHgwHdvgUPD6wYZzsnZmdWe5sKMg0NeNdOM8XgLdwbsL-HZcAp7TvtISQ7u8gjM0eTFcLRL1TGYmMxZqUI3jsBsdwOQ'
    };
    fixture.detectChanges();
    component.items = [{
      align: 'right',
      text: '1',
      href: '',
      active: false
    },
    {
      align: null,
      text: '2',
      href: '',
      active: false
    },
    {
      align: 'right',
      text: '3',
      href: '',
      active: false
    }];
    component.ngOnChanges(changesMock);
    const leftItems = component.leftItems;
    const rightItems = component.rightItems;


    leftItems.pipe(
      switchMap(items => {
        expect(items).toEqual([{
          align: null,
          text: '2',
          href: '',
          active: false
        }]);
        return rightItems;
      })
    ).subscribe(items => {
      fixture.detectChanges();
      expect(items).toEqual([{
        align: 'right',
        text: '1',
        href: '',
        active: false
      },
      {
        align: 'right',
        text: '3',
        href: '',
        active: false
      }]);
    });
  });

  //   it('filters out menu items for which the user does not hold the correct role', (done) => {
  //   const userDetails = {
  //     sub: 'Caseworker.ed@mailinator.com',
  //     uid: '36314153-06c2-400a-8dc3-7d3790660918',
  //     roles: [
  //         'roleA',
  //         'roleB',
  //         'roleC',
  //     ],
  //     name: 'Caseworker Ed',
  //     given_name: 'Caseworker',
  //     family_name: 'Ed test',
  //     roleCategory: 'LEGAL_OPERATIONS',
  //     token: 'Bearer eyJ0eXAiOiJKV1QiLCJ6aXAiOiJOT05FIiwia2lkIjoiMWVyMFdSd2dJT1RBRm9qRTRyQy9mYmVLdTNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJDYXNld29ya2VyLmVkQG1haWxpbmF0b3IuY29tIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6ImY3ZjVmNjM4LTBmMDQtNGQxNC1hZmZlLWFjZWVjNzkyYjBjMy04MTI4NTA0NSIsImlzcyI6Imh0dHBzOi8vZm9yZ2Vyb2NrLWFtLnNlcnZpY2UuY29yZS1jb21wdXRlLWlkYW0tYWF0Mi5pbnRlcm5hbDo4NDQzL29wZW5hbS9vYXV0aDIvcmVhbG1zL3Jvb3QvcmVhbG1zL2htY3RzIiwidG9rZW5OYW1lIjoiYWNjZXNzX3Rva2VuIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImF1dGhHcmFudElkIjoia1lNdkJlaUFmbWpYLUlJRW83bXBXVzBHMjU0Iiwibm9uY2UiOiI1SUFIb3FCUUppcXY3amY0a3Rfd0JEYWdrWUZ3SDMwbHBnWnZ5UkdXUWxJIiwiYXVkIjoieHVpd2ViYXBwIiwibmJmIjoxNjQ5Njk4MDk3LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiY3JlYXRlLXVzZXIiLCJtYW5hZ2UtdXNlciIsInNlYXJjaC11c2VyIl0sImF1dGhfdGltZSI6MTY0OTY5ODA5NiwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NDk3MjY4OTcsImlhdCI6MTY0OTY5ODA5NywiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6Il9oNktSTVJmbE5USXVVaWhZNk5OR2tHY2h0cyJ9.PrVZlLToFaOI-sGorD_yVQaXYGqaKIjZ0JOGAFyFfkGkjaqInixhvXJMu7G3QK1cRl5i1MmM3C9_AGL2N4Xh8YLBjqVnIIFfgYom2wBAoON2YcqhUbE3gVtqCPxhhZSNfxXZzspEwYP2oKKFF4M8s6QaflHZZ6eEY1eTnciaYFAHvkgQbNB5lnZHCAeSZC8bbtgHbGKbbgtE0Cpvi6CxvJVMXYk2vo376V-mVxtZrimXhAve8v48EIVDiYxXHgwHdvgUPD6wYZzsnZmdWe5sKMg0NeNdOM8XgLdwbsL-HZcAp7TvtISQ7u8gjM0eTFcLRL1TGYmMxZqUI3jsBsdwOQ'
  //   };
  //   // windowService.getLocalStorage.and.returnValues(JSON.stringify(USERDETAILS));
  //   sessionStorageService.getItem.and.returnValues(JSON.stringify(userDetails));
  //   fixture.detectChanges();
  //   component.items = [{
  //     align: 'right',
  //     text: '1',
  //     href: '',
  //     active: false,
  //     roles: ['roleA']
  //   },
  //   {
  //     align: null,
  //     text: '2',
  //     href: '',
  //     active: false,
  //     roles: ['roleB']
  //   },
  //   {
  //     align: 'right',
  //     text: '3',
  //     href: '',
  //     active: false,
  //     roles: ['roleC']
  //   }];
  //   component.ngOnChanges(changesMock);
  //   const leftItems = component.leftItems;
  //   const rightItems = component.rightItems;
  //   leftItems.pipe(switchMap(items => {
  //       expect(items).toEqual([component.items[1]]);
  //       done();
  //       return items;
  //   }));
  // });

});
