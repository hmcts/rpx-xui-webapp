import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoleExclusion } from '../../../models/role-exclusion.model';
import { RoleExclusionsComponent } from './role-exclusions.component';

@Component({ template: `<exui-role-exclusions [allowDelete]="allowDelete" [exclusions]="exclusions"></exui-role-exclusions>` })

class WrapperComponent {
    @ViewChild(RoleExclusionsComponent) public appComponentRef: RoleExclusionsComponent;
    @Input() public allowDelete: boolean;
    @Input() public exclusions: RoleExclusion[];
}

describe('RoleExclusionsComponent', () => {
    let component: RoleExclusionsComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
            declarations: [WrapperComponent, RoleExclusionsComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(WrapperComponent);
        wrapper = fixture.componentInstance;
        component = wrapper.appComponentRef;
        fixture.detectChanges();
    }));

    it('Should always show the Add link display', () => {
        const element = fixture.debugElement.nativeElement;
        const rowElement = element.querySelector('.govuk-link');
        expect(rowElement.getAttribute('routerlink')).toEqual('/cases/addExclusion');
    });

    it('should show the no exclusions message', () => {
        const element = fixture.debugElement.nativeElement;
        const rowElement = element.querySelector('.govuk-summary-list__value');
        expect(rowElement).not.toBeNull();
        expect(rowElement.innerHTML).toContain('There are no exclusions for this case.')
    });
});
