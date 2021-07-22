import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { FindPersonModule } from '../../../work-allocation-2/find-person.module';
import { FindAPersonService } from '../../services/find-person.service';
import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { FindPersonComponent } from './find-person.component';

describe('FindPersonComponent', () => {
    let component: FindPersonComponent;
    let fixture: ComponentFixture<FindPersonComponent>;
    let mockFindAPersonService: any;

    beforeEach(() => {
        mockFindAPersonService = jasmine.createSpyObj('FindAPersonService', ['find']);
        TestBed.configureTestingModule({
            imports: [
                WorkAllocationComponentsModule,
                FindPersonModule
            ],
            providers: [
                { provide: FindAPersonService, useValue: mockFindAPersonService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(FindPersonComponent);

        component = fixture.componentInstance;
        component.findPersonGroup = new FormGroup({});
        component.findPersonGroup.addControl('findPersonControl', new FormControl());
        fixture.detectChanges();
    });
    it('is Truthy', () => {
        expect(component).toBeTruthy();
    });
    it('input element changes triggers search', () => {
        mockFindAPersonService.find.and.returnValue(of([]));
        component.findPersonControl.setValue('test');
        fixture.detectChanges();
        expect(mockFindAPersonService.find).toHaveBeenCalled();
    });
});
