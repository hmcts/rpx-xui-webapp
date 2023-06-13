import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { HmctsGlobalHeaderComponent } from '..';
import { PhaseBannerComponent } from '../../components/phase-banner/phase-banner.component';
import { HeaderComponent } from './header.component';

describe('Header Component', () => {
  let mockStore: any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let mockService: any;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, HmctsGlobalHeaderComponent, PhaseBannerComponent],
      imports: [HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Store, useValue: mockStore }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    mockStore = jasmine.createSpyObj('store', ['pipe']);
    mockService = jasmine.createSpyObj('service', ['get']);
    component = new HeaderComponent(mockStore);
  });

  it('should render the skip to content link', () => {
    const element = fixture.debugElement.query(By.css('.govuk-skip-link')).nativeElement;
    expect(element.innerHTML).toEqual('Skip to main content');
  });

  it('should call emitNavigate with event and this.navigate', () => {
    const event = {};
    spyOn(component, 'emitNavigate');

    component.onNavigate(event);
    expect(component.emitNavigate).toHaveBeenCalled();
  });

  it('should call emitNavigate with event and this.navigate', () => {
    const event = {};
    spyOn(component, 'emitNavigate');

    component.onNavigate(event);
    expect(component.emitNavigate).toHaveBeenCalled();
  });

  it('should emitNavigate', () => {
    const event = {};
    const emitter = jasmine.createSpyObj('emitter', ['emit']);
    component.emitNavigate(event, emitter);
    expect(emitter.emit).toHaveBeenCalled();
  });
});
