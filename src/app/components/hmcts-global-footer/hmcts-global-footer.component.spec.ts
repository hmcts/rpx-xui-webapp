import { Component, DebugElement, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConstants } from '../../app.constants';
import { Helper, Navigation } from '../../containers/footer/footer.model';
import { HmctsGlobalFooterComponent } from './hmcts-global-footer.component';

describe('HmctsGlobalFooterComponent', () => {
    @Component({
        selector: `exui-app-host-dummy-component`,
        template: `<exui-app-hmcts-global-footer
                    [reference]="iconFallbackText"
                    [title]="type"
                    [items]="text"></exui-app-hmcts-global-footer>`
    })
    class TestDummyHostComponent {
        @Input() public help: Helper;
        @Input() public navigation: Navigation;
        @ViewChild(HmctsGlobalFooterComponent, {static: false})
        public hmctsGlobalFooterComponent: HmctsGlobalFooterComponent;
    }
    const testHostComponent = TestDummyHostComponent;
    // eslint-disable-next-line
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    // eslint-disable-next-line
    let el: DebugElement;
    // eslint-disable-next-line
    let de: any;
    let component: HmctsGlobalFooterComponent;
    let fixture: ComponentFixture<HmctsGlobalFooterComponent>;


    const helpData: Helper = AppConstants.FOOTER_DATA;
    const navigationData: Navigation = AppConstants.FOOTER_DATA_NAVIGATION;

    beforeEach(waitForAsync(() => {
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
