import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Caseworker, Location } from '../../models/dtos';
import { CaseworkerDataService, LocationDataService } from '../../services';
import { SessionStorageService } from '../../../app/services';
import { TaskAssignmentComponent } from './task-assignment.component';

// Locations.
const LOCATION_A: Location = { location_id: 'a', location: 'Location A', is_primary: true, services: ['a'] };
const LOCATION_B: Location = { location_id: 'b', location: 'Location B', is_primary: true, services: ['a', 'b'] };
const LOCATION_B_NONP: Location = { location_id: 'b', location: 'Location B', is_primary: false, services: ['a', 'b'] };
const LOCATION_C: Location = { location_id: 'c', location: 'Location C', is_primary: true, services: ['c'] };

// Caseworkers.
const JS = { first_name: 'John',   last_name: 'Smith',  id: '1', email_id: 'j.s@cw.gov.uk', base_location: [LOCATION_A] };
// Note: Two primary locations (for Jane Doe) should not happen in real cases but need to ensure this does not break anything
const JD = { first_name: 'Jane',   last_name: 'Doe',    id: '2', email_id: 'j.d@cw.gov.uk', base_location: [LOCATION_C, LOCATION_A] };
const JB = { first_name: 'Joseph', last_name: 'Bloggs', id: '3', email_id: 'j.b@cw.gov.uk', base_location: [LOCATION_B, LOCATION_B_NONP] };
const NB = { first_name: 'Noah',   last_name: 'Body',   id: '4', email_id: 'n.b@cw.gov.uk', base_location: [LOCATION_B] };

class MockLocationDataService {
  public getLocation(locationId: string): Observable<Location> {
    switch (locationId) {
      case LOCATION_A.location_id:
        return Observable.of(LOCATION_A);
      case LOCATION_B.location_id:
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
      expect(select.options[0].label).toEqual(component.ALL_LOCATIONS.location);
      expect(select.options[1].textContent).toEqual(LOCATION_A.location);
      expect(select.options[2].textContent).toEqual(LOCATION_B.location);
      expect(select.options[3].textContent).toEqual(LOCATION_C.location);
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
      expect(component.caseworkerLocation).toEqual(JD.base_location[1]);
    });

    it('should set the selected location', () => {
      // initial setting is with assigned caseworker JD, location a
      expect(component.location.location_id).toEqual('a');
    });
  });

});
