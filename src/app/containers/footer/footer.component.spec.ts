import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {FooterComponent} from './footer.component';

describe('FooterComponent', () => {
    @Component({
        selector: `exui-app-host-dummy-component`,
        template: `<app-footer></app-footer>`
    })
    class TestDummyHostComponent {
        @ViewChild(FooterComponent)
        public footerComponent: FooterComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [ FooterComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });
});
