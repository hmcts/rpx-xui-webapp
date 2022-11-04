import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';

import { HeaderComponent } from './header.component';
import { HmctsGlobalHeaderComponent } from '../hmcts-global-header/hmcts-global-header.component';
import { PhaseBannerComponent } from '../../components/phase-banner/phase-banner.component';

fdescribe('Header Component', () => {
    let mockStore: any;
    let mockService: any;
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent, HmctsGlobalHeaderComponent, PhaseBannerComponent],
        imports: [HttpClientModule, RouterTestingModule],
        providers: [{ provide: Store, useValue: mockStore }]
      }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        mockStore = jasmine.createSpyObj('store', ['pipe']);
        mockService = jasmine.createSpyObj('service', ['get']);
        component = new HeaderComponent(mockStore);
    });

    it('should create', () => {

        expect(component).toBeTruthy();
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

    it('should emitNavigate', () => {

        const event = {};
        const emitter = jasmine.createSpyObj('emitter', ['emit']);
        component.emitNavigate(event, emitter);
        expect(emitter.emit).toHaveBeenCalled();
    });
});
