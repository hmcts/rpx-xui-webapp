import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
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
  const navItemsWithFindCaseRightAligned = [
    {
      align: 'right',
      text: 'Find case',
      href: '/cases/case-search',
      active: false,
      ngClass: 'hmcts-search-toggle__button'
    },
    {
      align: null,
      text: '2',
      href: '',
      active: false
    },
    {
      align: 'null',
      text: '3',
      href: '',
      active: false
    }
  ];
  const navItemsWithSearchBox = [
    {
      align: 'right',
      text: 'Find',
      href: '',
      class: 'hmcts-search-toggle__button',
      active: false
    },
    {
      align: null,
      text: '2',
      href: '',
      active: false
    },
    {
      align: 'null',
      text: '3',
      href: '',
      active: false
    }
  ];
  let origTimeout: number;

  beforeEach(async(() => {
    origTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      declarations: [ HmctsGlobalHeaderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
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

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = origTimeout;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should display 16 digit case reference search box', async () => {
    component.showItems = true;
    component.showCaseReferenceSearchBox = true;
    component.items = navItemsWithSearchBox;
    await component.ngOnChanges(changesMock);
    fixture.detectChanges();
    const caseReferenceSearchBox = fixture.debugElement.query(By.css('#caseReference'));
    expect(caseReferenceSearchBox).toBeTruthy();
  });

  it('should not display 16 digit case reference search box', async () => {
    component.showItems = true;
    component.showCaseReferenceSearchBox = false;
    component.items = navItemsWithSearchBox;
    await component.ngOnChanges(changesMock);
    fixture.detectChanges();
    const caseReferenceSearchBox = fixture.debugElement.query(By.css('#caseReference'));
    expect(caseReferenceSearchBox).toBeFalsy();
  });

  it('should display find case right aligned', async () => {
    component.showItems = true;
    component.showFindCase = true;
    component.items = navItemsWithFindCaseRightAligned;
    await component.ngOnChanges(changesMock);
    fixture.detectChanges();
    const findCase = fixture.debugElement.query(By.css('.hmcts-search-toggle__button'));
    expect(findCase).toBeTruthy();
  });

  it('should not display find case right aligned', async () => {
    component.showItems = true;
    component.showFindCase = false;
    component.items = navItemsWithFindCaseRightAligned;
    await component.ngOnChanges(changesMock);
    fixture.detectChanges();
    const findCase = fixture.debugElement.query(By.css('.hmcts-search-toggle__button'));
    expect(findCase).toBeFalsy();
  });

  it('splitNavItems', (done: DoneFn) => {
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
      done();
    });
  });

  it('filters out menu items for which the user does not hold the correct role', (done) => {
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
    component.ngOnChanges(changesMock);
    const leftItems = component.leftItems;
    const rightItems = component.rightItems;
    leftItems.pipe(
      switchMap(items => {
        expect(items).toEqual([component.items[1]]);
        return rightItems;
      })
    ).subscribe(items => {
      expect(items).toEqual([component.items[0]]);
      done();
    });
  });

  it('filters out menu items for which not all features are enabled', (done) => {
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
    component.ngOnChanges(changesMock);
    const leftItems = component.leftItems;
    const rightItems = component.rightItems;
    leftItems.pipe(
      switchMap(items => {
        expect(items).toEqual([component.items[1]]);
        return rightItems;
      })
    ).subscribe(items => {
      expect(items).toEqual([component.items[0]]);
      done();
    });
  });
});
