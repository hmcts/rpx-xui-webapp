import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HmctsGlobalFooterComponent } from './hmcts-global-footer.component';
import {Component, DebugElement, Input, ViewChild} from '@angular/core';
import {Helper, Navigation} from '../../containers/footer/footer.model';


describe('HmctsGlobalFooterComponent', () => {
    @Component({
        selector: `exui-app-host-dummy-component`,
        template: `<exui-app-hmcts-global-footer
                    [reference]="iconFallbackText"
                    [title]="type"
                    [items]="text"></exui-app-hmcts-global-footer>`
    })
    class TestDummyHostComponent {
        @Input() help: Helper;
        @Input() navigation: Navigation;
        @ViewChild(HmctsGlobalFooterComponent)
        public hmctsGlobalFooterComponent: HmctsGlobalFooterComponent;
    }
    const testHostComponent = TestDummyHostComponent;
    const testHostFixture = ComponentFixture<TestDummyHostComponent>;
    const el: DebugElement;
    const de: any;
    let component: HmctsGlobalFooterComponent;
    let fixture: ComponentFixture<HmctsGlobalFooterComponent>;


    const helpData: Helper = {
      heading: 'Help',
      email: {
        address: 'service-desk@hmcts.gov.uk',
        text: 'service-desk@hmcts.gov.uk'
      },
      phone: {
        text: '0207 633 4140'
      },
      opening: {
        text: 'Monday to Friday, 8am to 6pm (excluding public holidays)'
      }
    };
    const navigationData: Navigation = {
    items: [
      { text: 'Terms and conditions', href: 'terms-and-conditions'},
      { text: 'Cookies', href: 'cookies' },
      { text: 'Privacy policy', href: 'privacy-policy'}
    ]
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ HmctsGlobalFooterComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HmctsGlobalFooterComponent);
        component = fixture.componentInstance;
        component.help = helpData;
        component.navigation = navigationData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });
});
