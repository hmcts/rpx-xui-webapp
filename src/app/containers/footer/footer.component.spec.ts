import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { Store } from '@ngrx/store';
import {FooterComponent} from './footer.component';

describe('FooterComponent', () => {
    @Component({
        selector: `exui-app-host-dummy-component`,
        template: `<exui-app-footer></exui-app-footer>`
    })
    class TestDummyHostComponent {
        @ViewChild(FooterComponent)
        public footerComponent: FooterComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    // tslint:disable-next-line
    let el: DebugElement;
    // tslint:disable-next-line
    let de: any;
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        const storeMock = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [ FooterComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{
                provide: Store,
                useValue: storeMock
            }]
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
