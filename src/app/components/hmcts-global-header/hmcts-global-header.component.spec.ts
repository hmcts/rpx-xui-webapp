import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { HmctsGlobalHeaderComponent } from './hmcts-global-header.component';

describe('HmctsGlobalHeaderComponent', () => {
  let nocStoreSpy: jasmine.Spy;
  let component: HmctsGlobalHeaderComponent;
  let fixture: ComponentFixture<HmctsGlobalHeaderComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmctsGlobalHeaderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ RouterTestingModule ],
      providers: [
        provideMockStore()
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

  it('splitNavItems', () => {
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
    component.splitNavItems();
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
});
