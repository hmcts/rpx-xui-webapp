import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { WorkAllocationComponentsModule } from 'src/work-allocation/components/work-allocation.components.module';

import { Caseworker, Location } from './../../models/dtos/task';
import { CaseworkerDataService } from './../../services/case-worker-data.service';
import { LocationDataService } from './../../services/location-data.service';
import { TaskAssignmentComponent } from './task-assignment.component';

// Locations.
const LOCATION_A: Location = { id: 'a', locationName: 'Location A', services: ['a'] };
const LOCATION_B: Location = { id: 'b', locationName: 'Location B', services: ['a', 'b'] };

// Caseworkers.
const JS = { firstName: 'John',   lastName: 'Smith',  idamId: '1', location: LOCATION_A };
const JD = { firstName: 'Jane',   lastName: 'Doe',    idamId: '2', location: LOCATION_A };
const JB = { firstName: 'Joseph', lastName: 'Bloggs', idamId: '3', location: LOCATION_B };
const NB = { firstName: 'Noah',   lastName: 'Body',   idamId: '4', location: LOCATION_B };

class MockLocationDataService {
  public getLocation(locationId: string): Observable<Location> {
    if (locationId === LOCATION_A.id) {
      return Observable.of(LOCATION_A);
    }
    return Observable.of(LOCATION_B);
  }
  public getLocations(): Observable<Location[]> {
    return Observable.of([ LOCATION_A, LOCATION_B ]);
  }
}

class MockCaseworkerDataService {
  public getAll(): Observable<Caseworker[]> {
    return Observable.of([ JD, JS, JB, NB ]);
  }
  public getForLocation(locationId: string): Observable<Caseworker[]> {
    if (locationId === LOCATION_A.id) {
      return Observable.of([ JD, JS ]);
    }
    return Observable.of([ JB, NB ]);
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
    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [ WorkAllocationComponentsModule ],
        providers: [
          {
            provide: LocationDataService,
            useClass: MockLocationDataService
          },
          {
            provide: CaseworkerDataService,
            useClass: MockCaseworkerDataService
          }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
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
      expect(select.options.length).toEqual(3);
      expect(select.options[0].label).toEqual(component.ALL_LOCATIONS.locationName);
      expect(select.options[1].textContent).toEqual(LOCATION_A.locationName);
      expect(select.options[2].textContent).toEqual(LOCATION_B.locationName);
    });

    it('should have appropriate default options shown in the caseworker select', () => {
      expect(component.caseworkers).toBeDefined();
      expect(component.caseworkers.length).toBe(4); // For all locations.
      const select: HTMLSelectElement = getSelect('#task_assignment_caseworker');
      expect(select).toBeDefined();
      expect(select.options).toBeDefined();
      expect(select.options.length).toEqual(5); // For all locations + "Select name"
      expect(select.options[0].label).toEqual('Select name');
      expect(select.options[1].textContent).toEqual(`${JD.firstName} ${JD.lastName}`);
      expect(select.options[2].textContent).toEqual(`${JS.firstName} ${JS.lastName}`);
      expect(select.options[3].textContent).toEqual(`${JB.firstName} ${JB.lastName}`);
      expect(select.options[4].textContent).toEqual(`${NB.firstName} ${NB.lastName}`);
    });

    it('should appropriately filter any excluded caseworkers', () => {
      expect(component.caseworkers).toBeDefined();
      expect(component.caseworkers.length).toBe(4); // For all locations.
      let select: HTMLSelectElement = getSelect('#task_assignment_caseworker');
      expect(select).toBeDefined();
      expect(select.options).toBeDefined();
      expect(select.options.length).toEqual(5); // For all locations + "Select name"
      expect(select.options[0].label).toEqual('Select name');
      expect(select.options[1].textContent).toEqual(`${JD.firstName} ${JD.lastName}`);
      expect(select.options[2].textContent).toEqual(`${JS.firstName} ${JS.lastName}`);
      expect(select.options[3].textContent).toEqual(`${JB.firstName} ${JB.lastName}`);
      expect(select.options[4].textContent).toEqual(`${NB.firstName} ${NB.lastName}`);

      // Now exclude Jane Doe and Noah Body.
      component.excludeCaseworkers = [ JD, NB ];
      fixture.detectChanges();
      expect(component.caseworkers.length).toBe(2); // Shouldn't include excluded.
      select = getSelect('#task_assignment_caseworker');
      expect(select.options.length).toEqual(3); // Non-excluded + "Select name"
      expect(select.options[0].label).toEqual('Select name');
      expect(select.options[1].textContent).toEqual(`${JS.firstName} ${JS.lastName}`);
      expect(select.options[2].textContent).toEqual(`${JB.firstName} ${JB.lastName}`);

      // Now change it so only John Smith is excluded.
      component.excludeCaseworkers = [ JS ];
      fixture.detectChanges();
      expect(component.caseworkers.length).toBe(3); // Shouldn't include excluded.
      select = getSelect('#task_assignment_caseworker');
      expect(select.options.length).toEqual(4); // Non-excluded + "Select name"
      expect(select.options[0].label).toEqual('Select name');
      expect(select.options[1].textContent).toEqual(`${JD.firstName} ${JD.lastName}`);
      expect(select.options[2].textContent).toEqual(`${JB.firstName} ${JB.lastName}`);
      expect(select.options[3].textContent).toEqual(`${NB.firstName} ${NB.lastName}`);
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
        expect(caseworkersSelect.options[1].textContent).toEqual(`${JD.firstName} ${JD.lastName}`);
        expect(caseworkersSelect.options[2].textContent).toEqual(`${JS.firstName} ${JS.lastName}`);
      });
    });

    it('should handle the selection of a caseworker', () => {
      const select: HTMLSelectElement = getSelect('#task_assignment_caseworker');

      // No caseworker should be selected...
      expect(component.caseworker).toBeNull();
      // ... and shouldn't have had any change events fired yet.
      expect(wrapper.emittedEvents.length).toBe(0);

      // Now let's select a caseworker (Joseph Bloggs).
      select.value = select.options[3].value; // Joseph Bloggs.
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.caseworker).toBe(JB); // Joseph Bloggs selected.
        expect(wrapper.emittedEvents.length).toBe(1);
        expect(wrapper.emittedEvents.includes(JB)).toBeTruthy();

        // And now let's choose "Select name" again.
        select.value = select.options[0].value; // 
        select.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.caseworker).toBeNull(); // Joseph Bloggs selected.
          expect(wrapper.emittedEvents.length).toBe(2);
          expect(wrapper.emittedEvents[1]).toBeNull();
        });
      });
    });

  });

});
