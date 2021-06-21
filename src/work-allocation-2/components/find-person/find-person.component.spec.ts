import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindPersonComponent } from './find-person.component';
import { FindAPersonService } from '../../services/find-person.service';
import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { of } from 'rxjs';

describe('FindPersonComponent', () => {
    let component: FindPersonComponent;
    let fixture: ComponentFixture<FindPersonComponent>;
    let mockFindAPersonService: any;

    beforeEach(() => {
        mockFindAPersonService = jasmine.createSpyObj('FindAPersonService', ['find']);
        TestBed.configureTestingModule({
            imports: [
                WorkAllocationComponentsModule
            ],
            providers: [
                { provide: FindAPersonService, useValue: mockFindAPersonService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(FindPersonComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
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
