import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDownComponent } from '..';


// mock the app header
@Component({
  selector: 'exui-app-header',
  template: ''
})
class MockAppHeaderComponent {

}

// mock the app footer
@Component({
  selector: 'exui-app-footer',
  template: ''
})
class MockFooterComponent {

}

describe('ServiceDownComponent', () => {
  let component: ServiceDownComponent;
  let fixture: ComponentFixture<ServiceDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDownComponent, MockAppHeaderComponent, MockFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
