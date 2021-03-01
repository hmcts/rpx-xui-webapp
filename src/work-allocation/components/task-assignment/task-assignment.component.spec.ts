import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Caseworker, Location } from '../../models/dtos';
import { CaseworkerDataService, LocationDataService } from '../../services';
import { SessionStorageService } from '../../../app/services';
import { TaskAssignmentComponent } from './task-assignment.component';
import { sortArray } from '@hmcts/rpx-xui-node-lib';

// Locations.
const LOCATION_A: Location = { id: 'a', locationName: 'Location A', services: ['a'] };
const LOCATION_B: Location = { id: 'b', locationName: 'Location B', services: ['a', 'b'] };
const LOCATION_C: Location = { id: 'c', locationName: 'Location C', services: ['c'] };

// Caseworkers.
const JS = { firstName: 'John',   lastName: 'Smith',  idamId: '1', email: 'j.s@cw.gov.uk', location: LOCATION_A };
const JD = { firstName: 'Jane',   lastName: 'Doe',    idamId: '2', email: 'j.d@cw.gov.uk', location: LOCATION_A };
const JB = { firstName: 'Joseph', lastName: 'Bloggs', idamId: '3', email: 'j.b@cw.gov.uk', location: LOCATION_B };
const NB = { firstName: 'Noah',   lastName: 'Body',   idamId: '4', email: 'n.b@cw.gov.uk', location: LOCATION_B };

class MockLocationDataService {
  public getLocation(locationId: string): Observable<Location> {
    switch (locationId) {
      case LOCATION_A.id:
        return Observable.of(LOCATION_A);
      case LOCATION_B.id:
        return Observable.of(LOCATION_B);
      default:
        return Observable.of(LOCATION_C);
    }
  }
  public getLocations(): Observable<Location[]> {
    return Observable.of([ LOCATION_A, LOCATION_B, LOCATION_C ]);
  }
}

class MockCaseworkerDataService {
  public getAll(): Observable<Caseworker[]> {
    return Observable.of([ JD, JS, JB, NB ]);
  }
}

class MockSessionStorageService {
  public getItem(): string {
    return '{"id":"2","forename":"Mr.","surname":"Test","email":"mrtest@mailinator.com","active":true,"roles":["caseworker"]}';
  }
}

@Component({
  template: `<exui-task-assignment [excludeCaseworkers]="excludeCaseworkers" [location]="location"
    (caseworkerChanged)="onCaseworkerChanged($event)"></exui-task-assignment>`
})
class WrapperComponent {
  @ViewChild(TaskAssignmentComponent) public ref: TaskAssignmentComponent;
  @Input() public excludeCaseworkers: Caseworker[];
  @Input() public location: Location;

  public emittedEvents: Caseworker[] = [];
  public onCaseworkerChanged(caseworker: Caseworker): void {
    this.emittedEvents.push(caseworker);
  }
}

describe('WorkAllocation', () => {

  describe('TaskAssignmentComponent', () => {
    let component: TaskAssignmentComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    const getSelect = (id: string): HTMLSelectElement => {
      return fixture.debugElement.nativeElement.querySelector(id);
    };
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [ WorkAllocationComponentsModule ],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: LocationDataService, useClass: MockLocationDataService },
          { provide: CaseworkerDataService, useClass: MockCaseworkerDataService },
          { provide: SessionStorageService, useClass: MockSessionStorageService }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.ref;
      fixture.detectChanges();
    });

    it('should be defined', () => {
      expect(component).toBeDefined();
    });

    it('should have appropriate options shown in the location select', () => {
      expect(component.locations).toBeDefined();
      const select: HTMLSelectElement = getSelect('#task_assignment_location');
      expect(select).toBeDefined();
      expect(select.options).toBeDefined();
      expect(select.options.length).toEqual(4);
      expect(select.options[0].label).toEqual(component.ALL_LOCATIONS.locationName);
      expect(select.options[1].textContent).toEqual(LOCATION_A.locationName);
      expect(select.options[2].textContent).toEqual(LOCATION_B.locationName);
      expect(select.options[3].textContent).toEqual(LOCATION_C.locationName);
    });

    it('should have appropriate default options shown in the caseworker select', () => {
      expect(component.caseworkers).toBeDefined();
      expect(component.caseworkers.length).toBe(2); // For all locations.
      const select: HTMLSelectElement = getSelect('#task_assignment_caseworker');
      expect(select).toBeDefined();
      expect(select.options).toBeDefined();
      expect(select.options.length).toEqual(3); // For all locations + "Select name"
      expect(select.options[0].label).toEqual('Select name');
      expect(select.options[1].textContent).toEqual('Jane Doe - j.d@cw.gov.uk');
      expect(select.options[2].textContent).toEqual('John Smith - j.s@cw.gov.uk');
    });

    it('should appropriately filter any excluded caseworkers', () => {
      expect(component.caseworkers).toBeDefined();
      expect(component.caseworkers.length).toBe(2); // For all locations.
      let select: HTMLSelectElement = getSelect('#task_assignment_caseworker');
      expect(select).toBeDefined();
      expect(select.options).toBeDefined();
      expect(select.options.length).toEqual(3); // For all locations + "Select name"
      expect(select.options[0].label).toEqual('Select name');
      expect(select.options[1].textContent).toEqual('Jane Doe - j.d@cw.gov.uk');
      expect(select.options[2].textContent).toEqual('John Smith - j.s@cw.gov.uk');

      // Now exclude Jane Doe and Noah Body.
      wrapper.excludeCaseworkers = [ JD ];
      fixture.detectChanges();
      expect(component.caseworkers.length).toBe(1); // Shouldn't include excluded.
      select = getSelect('#task_assignment_caseworker');
      expect(select.options.length).toEqual(2); // Non-excluded + "Select name"
      expect(select.options[0].label).toEqual('Select name');
      expect(select.options[1].textContent).toEqual('John Smith - j.s@cw.gov.uk');

      // Now change it so only John Smith is excluded.
      wrapper.excludeCaseworkers = [ JS ];
      fixture.detectChanges();
      expect(component.caseworkers.length).toBe(1); // Shouldn't include excluded.
      select = getSelect('#task_assignment_caseworker');
      expect(select.options.length).toEqual(2); // Non-excluded + "Select name"
      expect(select.options[0].label).toEqual('Select name');
      expect(select.options[1].textContent).toEqual('Jane Doe - j.d@cw.gov.uk');
    });

    it('should handle the location being changed and refresh list of caseworkers', () => {
      const locationsSelect: HTMLSelectElement = getSelect('#task_assignment_location');

      // Now let's select a new location (Location A).
      locationsSelect.value = locationsSelect.options[1].value; // Location A.
      locationsSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.caseworkers.length).toBe(2); // Only Location A people (JD + JS)
        const caseworkersSelect: HTMLSelectElement = getSelect('#task_assignment_caseworker');
        expect(caseworkersSelect.options.length).toEqual(3);  // Location A people + "Select name"
        expect(caseworkersSelect.options[0].label).toEqual('Select name');
        expect(caseworkersSelect.options[1].textContent).toEqual('Jane Doe - j.d@cw.gov.uk');
        expect(caseworkersSelect.options[2].textContent).toEqual('John Smith - j.s@cw.gov.uk');
      });
    });

    it('should handle the selection of a caseworker', () => {
      const select: HTMLSelectElement = getSelect('#task_assignment_caseworker');

      // No caseworker should be selected...
      expect(component.caseworker).toBeNull();
      // ... and shouldn't have had any change events fired yet.
      expect(wrapper.emittedEvents.length).toBe(0);

      // Now let's select a caseworker.
      select.value = select.options[2].value; // John Smith.
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.caseworker).toBe(JS); // John Smith selected.
        expect(wrapper.emittedEvents.length).toBe(1);
        expect(wrapper.emittedEvents.includes(JS)).toBeTruthy();

        // And now let's choose "Select name" again.
        select.value = select.options[0].value;
        select.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.caseworker).toBeNull(); // John Smith selected.
          expect(wrapper.emittedEvents.length).toBe(2);
          expect(wrapper.emittedEvents[1]).toBeNull();
        });
      });
    });

    it('should handle an undefined caseworker', () => {
      const locationsSelect: HTMLSelectElement = getSelect('#task_assignment_location');

      // Now let's select a new location (Location A).
      locationsSelect.value = locationsSelect.options[3].value; // Location C.
      locationsSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.caseworkers.length).toBe(0); // Only Location C people (undefined)
        const caseworkersSelect: HTMLSelectElement = getSelect('#task_assignment_caseworker');
        expect(caseworkersSelect.options.length).toEqual(1);  // Location C people + "Select name"
        expect(caseworkersSelect.options[0].label).toEqual('Select name');
      });
    });

    it('should set the user ID correctly', () => {
      // currently set to JD
      expect(component.userId).toEqual('2');
    });

    it('should set the caseworkers location', () => {
      expect(component.caseworkerLocation).toEqual(JD.location);
    });

    it('should set the selected location', () => {
      // initial setting is with assigned caseworker JD, location a
      expect(component.location.id).toEqual('a');
    });
  });

});
