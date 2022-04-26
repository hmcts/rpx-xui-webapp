import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HmctsGlobalFooterComponent } from './hmcts-global-footer.component';
import {Component, DebugElement, Input, ViewChild} from '@angular/core';
import {Helper, Navigation} from '../../containers/footer/footer.model';
import { AppConstants } from '../../app.constants';
import { RouterTestingModule } from '@angular/router/testing';

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
        @ViewChild(HmctsGlobalFooterComponent, /* TODO: add static flag */ {})
        public hmctsGlobalFooterComponent: HmctsGlobalFooterComponent;
    }
    const testHostComponent = TestDummyHostComponent;
    // tslint:disable-next-line
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    // tslint:disable-next-line
    let el: DebugElement;
    // tslint:disable-next-line
    let de: any;
    let component: HmctsGlobalFooterComponent;
    let fixture: ComponentFixture<HmctsGlobalFooterComponent>;


    const helpData: Helper = AppConstants.FOOTER_DATA;
    const navigationData: Navigation = AppConstants.FOOTER_DATA_NAVIGATION;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ HmctsGlobalFooterComponent ],
        imports: [
            RouterTestingModule
        ]
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
