import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppConstants } from '../../app.constants';
import { FooterComponent } from './footer.component';
import { NavigationItems } from './footer.model';

describe('FooterComponent', () => {
  @Component({
    standalone: false,

    selector: 'exui-app-host-dummy-component',
    template: '<exui-app-footer></exui-app-footer>'
  })
  class TestDummyHostComponent {
    @ViewChild(FooterComponent, { static: false })
    public footerComponent: FooterComponent;
  }

  let testHostFixture: ComponentFixture<TestDummyHostComponent>;
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;

  const mockNavigationData = {
    items: [
      { text: 'Terms and conditions', href: '/terms-and-conditions' },
      { text: 'Privacy policy', href: '/privacy-policy' },
      { text: 'Cookies', href: '/cookies' }
    ]
  };

  beforeEach(waitForAsync(() => {
    mockStore = jasmine.createSpyObj('Store', ['pipe']);
    mockStore.pipe.and.returnValue(of(true));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [FooterComponent, TestDummyHostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{
        provide: Store,
        useValue: mockStore
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestDummyHostComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created by angular', () => {
    expect(fixture).not.toBeNull();
  });

  it('should initialize with footer data from AppConstants', () => {
    expect(component.helpData).toBe(AppConstants.FOOTER_DATA);
    expect(component.navigationData).toBe(AppConstants.FOOTER_DATA_NAVIGATION);
  });

  describe('ngOnInit', () => {
    it('should update terms and conditions link when feature is enabled', () => {
      component.navigationData = mockNavigationData;
      mockStore.pipe.and.returnValue(of(true));

      component.ngOnInit();

      const tAndCItem = component.navigationData.items.find((item) => item.text === 'Terms and conditions');
      expect(tAndCItem.href).toBe('/terms-and-conditions');
      expect(mockStore.pipe).toHaveBeenCalled();
    });

    it('should update terms and conditions link when feature is disabled', () => {
      component.navigationData = mockNavigationData;
      mockStore.pipe.and.returnValue(of(false));

      component.ngOnInit();

      const tAndCItem = component.navigationData.items.find((item) => item.text === 'Terms and conditions');
      expect(tAndCItem.href).toBe('/legacy-terms-and-conditions');
      expect(mockStore.pipe).toHaveBeenCalled();
    });

    it('should handle case when terms and conditions item is not found', () => {
      component.navigationData = {
        items: [
          { text: 'Privacy policy', href: '/privacy-policy' },
          { text: 'Cookies', href: '/cookies' }
        ]
      };

      expect(() => component.ngOnInit()).not.toThrow();
      expect(mockStore.pipe).not.toHaveBeenCalled();
    });

    it('should handle undefined navigation data', () => {
      component.navigationData = { items: undefined };
      spyOn(component, 'getNavigationItemForTandC').and.returnValue(null);

      component.ngOnInit();

      expect(component.getNavigationItemForTandC).toHaveBeenCalledWith(undefined);
      expect(mockStore.pipe).not.toHaveBeenCalled();
    });

    it('should handle null navigation data', () => {
      component.navigationData = { items: null };
      spyOn(component, 'getNavigationItemForTandC').and.returnValue(null);

      component.ngOnInit();

      expect(component.getNavigationItemForTandC).toHaveBeenCalledWith(null);
      expect(mockStore.pipe).not.toHaveBeenCalled();
    });
  });

  describe('getNavigationItemForTandC', () => {
    it('should return Terms and conditions navigation item when it exists', () => {
      const navigationItems: NavigationItems[] = [
        { text: 'Privacy policy', href: '/privacy' },
        { text: 'Terms and conditions', href: '/terms' },
        { text: 'Cookies', href: '/cookies' }
      ];

      const result = component.getNavigationItemForTandC(navigationItems);

      expect(result).toEqual({ text: 'Terms and conditions', href: '/terms' });
    });

    it('should return null when Terms and conditions item does not exist', () => {
      const navigationItems: NavigationItems[] = [
        { text: 'Privacy policy', href: '/privacy' },
        { text: 'Cookies', href: '/cookies' }
      ];

      const result = component.getNavigationItemForTandC(navigationItems);

      expect(result).toBeNull();
    });

    it('should return null when navigation items array is empty', () => {
      const navigationItems: NavigationItems[] = [];

      const result = component.getNavigationItemForTandC(navigationItems);

      expect(result).toBeNull();
    });

    it('should handle undefined navigation items', () => {
      expect(() => component.getNavigationItemForTandC(undefined)).toThrow();
    });

    it('should handle null navigation items', () => {
      expect(() => component.getNavigationItemForTandC(null)).toThrow();
    });

    it('should return the last Terms and conditions item when multiple exist', () => {
      const navigationItems: NavigationItems[] = [
        { text: 'Terms and conditions', href: '/terms1' },
        { text: 'Terms and conditions', href: '/terms2' }
      ];

      const result = component.getNavigationItemForTandC(navigationItems);

      expect(result).toEqual({ text: 'Terms and conditions', href: '/terms2' });
    });
  });

  describe('store subscription', () => {
    it('should subscribe to store on component initialization', () => {
      const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
      const mockObservable = jasmine.createSpyObj('Observable', ['subscribe']);
      mockObservable.subscribe.and.returnValue(mockSubscription);
      mockStore.pipe.and.returnValue(mockObservable);

      component.navigationData = mockNavigationData;
      component.ngOnInit();

      expect(mockObservable.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('should update navigation item href in subscription callback', () => {
      component.navigationData = mockNavigationData;
      let subscriptionCallback: (value: boolean) => void;

      const mockObservable = jasmine.createSpyObj('Observable', ['subscribe']);
      mockObservable.subscribe.and.callFake((callback: (value: boolean) => void) => {
        subscriptionCallback = callback;
        return jasmine.createSpyObj('Subscription', ['unsubscribe']);
      });
      mockStore.pipe.and.returnValue(mockObservable);

      component.ngOnInit();

      subscriptionCallback(true);
      const tAndCItem = component.navigationData.items.find((item) => item.text === 'Terms and conditions');
      expect(tAndCItem.href).toBe('/terms-and-conditions');

      subscriptionCallback(false);
      expect(tAndCItem.href).toBe('/legacy-terms-and-conditions');
    });
  });
});
