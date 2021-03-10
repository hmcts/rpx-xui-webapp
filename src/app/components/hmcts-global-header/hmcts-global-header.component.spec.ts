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

  it('should show the Case search button as inactive when the currentUrl does not match', () => {
    const searchButton = fixture.debugElement.nativeElement.querySelector('.hmcts-search-toggle__button');
    expect(searchButton).toBeDefined();
    expect(searchButton.textContent).toBe('Find case');
    expect(searchButton.getAttribute('aria-current')).not.toEqual('true');
  });

  it('should show the Case search button as active when the currentUrl matches', () => {
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
});
