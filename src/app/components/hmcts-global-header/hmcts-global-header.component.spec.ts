import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UserService } from '../../../app/services/user/user.service';
import { HmctsGlobalHeaderComponent } from './hmcts-global-header.component';


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
    TestBed.configureTestingModule({
      declarations: [ HmctsGlobalHeaderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ RouterTestingModule ],
      providers: [
        provideMockStore(),
        {
          provide: UserService,
          useValue: {
            getUserDetails: () => of({
              userInfo: {
                roles: ['roleA', 'roleB']
              }
            })
          }
        },
        {
          provide: FeatureToggleService,
          useValue: {
            isEnabled: (flag) => of(flags[flag])
          }
        }
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
    nocStoreSpy = spyOn(component.nocStore, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should show the Case search button as inactive when the currentUrl does not match', () => {
    const searchButton = fixture.debugElement.nativeElement.querySelector('.hmcts-search-toggle__button');
    expect(searchButton).toBeDefined();
    expect(searchButton.textContent).toBe('Find case');
    expect(searchButton.getAttribute('aria-current')).not.toEqual('true');
  });

  xit('should show the Case search button as active when the currentUrl matches', () => {
    // Get hold of the search button.
    const searchButton = fixture.debugElement.nativeElement.querySelector('.hmcts-search-toggle__button');
    expect(searchButton.getAttribute('aria-current')).not.toEqual('true');

    // And get its href value.
    const href = searchButton.getAttribute('href');

    // Set the currentUrl to be the same as the search button's href.
    component.currentUrl = href;
    fixture.detectChanges();

    // And now it should show be "active", which gives a different rendering.
    expect(searchButton.getAttribute('aria-current')).toEqual('true');
  });

  it('should onEmitSubMenu', () => {
    const menuItem = {href: '/noc', text: null};
    component.onEmitSubMenu(menuItem);
    expect(nocStoreSpy).toHaveBeenCalled();
  });

  it('should onEmitEvent', () => {
    spyOn(component.navigate, 'emit');
    component.onEmitEvent(1);
    expect(component.navigate.emit).toHaveBeenCalled();
  });

  it('splitNavItems', async () => {
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
    await component.ngOnChanges(changesMock);
    expect(component.leftItems).toEqual([{
      align: null,
      text: '2',
      href: '',
      active: false
    }]);

    expect(component.rightItems).toEqual([{
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

  it('filters out menu items for which the user does not hold the correct role', async () => {
    component.items = [{
      align: 'right',
      text: '1',
      href: '',
      active: false,
      roles: ['roleA']
    },
    {
      align: null,
      text: '2',
      href: '',
      active: false,
      roles: ['roleB']
    },
    {
      align: 'right',
      text: '3',
      href: '',
      active: false,
      roles: ['roleC']
    }];
    await component.ngOnChanges(changesMock);
    expect(component.leftItems).toEqual([component.items[1]]);
    expect(component.rightItems).toEqual([component.items[0]]);
  });

  it('filters out menu items for which not all features are enabled', async () => {
    component.items = [{
      align: 'right',
      text: '1',
      href: '',
      active: false,
      flags: ['enabledFlag']
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
      active: false,
      flags: ['enabledFlag', 'disabledFlag']
    }];
    await component.ngOnChanges(changesMock);
    expect(component.leftItems).toEqual([component.items[1]]);
    expect(component.rightItems).toEqual([component.items[0]]);
  });
});
