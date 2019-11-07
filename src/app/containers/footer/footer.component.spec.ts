import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
    @Component({
        selector: `exui-app-host-dummy-component`,
        template: `<exui-app-footer></exui-app-footer>`
    })
    class TestDummyHostComponent {
        @ViewChild(FooterComponent)
        public footerComponent: FooterComponent;
    }

    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

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
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });
});
