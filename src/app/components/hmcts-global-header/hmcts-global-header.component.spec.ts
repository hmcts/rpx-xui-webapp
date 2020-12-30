import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { metaReducers } from 'src/app/app.module';
import { reducers } from 'src/app/store';
import { HmctsGlobalHeaderComponent } from './hmcts-global-header.component';

describe('HmctsGlobalHeaderComponent', () => {
  let nocStoreSpy: jasmine.Spy;
  let component: HmctsGlobalHeaderComponent;
  let fixture: ComponentFixture<HmctsGlobalHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmctsGlobalHeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmctsGlobalHeaderComponent);
    component = fixture.componentInstance;
    component.headerTitle = {
        name: 'Service name',
        url: '#'
    };
    component.navigation = {
        label: 'Account navigation',
        items: [{
            text: 'Nav item 1',
            href: '#1'
        }, {
            text: 'Nav item 2',
            href: '#1'
        }]
    };
    nocStoreSpy = spyOn(component.nocStore, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onEmitSubMenu', () => {
    component.onEmitSubMenu({href: '/noc'});
    expect(nocStoreSpy).toHaveBeenCalled();
  });
});
