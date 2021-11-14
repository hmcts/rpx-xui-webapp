import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LocationModel } from '../../models/location.model';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'exui-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})

export class SearchLocationComponent implements OnInit {
  @Input() public caseId ='testCaseId';
  @Input() public disabled?: boolean = null;
  @Input() public selectedLocations$: Observable<LocationModel[]>;
  @Input() public submitted?: boolean = true;
  @Input() public findLocationForm: FormGroup;
  
  public locations$: Observable<LocationModel[]>;
  public selectedLocation: LocationModel;
  public showAutocomplete = false;
  private readonly minSearchCharacters = 2;

  constructor(private readonly locationService: LocationService, fb: FormBuilder) {
    this.findLocationForm =  fb.group({
      findLocationControl: [null],
    });

    this.selectedLocations$ = of([]);
  }

  public ngOnInit(): void {   
    this.locations$ = this.getLocations();
  }

  public filter(term: string): any {
    const a$ = combineLatest([
      this.getLocations(),
      this.selectedLocations$,
    ]);

    this.locations$ = a$.pipe(
      map(results => {
        const filteredResult = term ? results[0].filter(x => x.court_address.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        x.postcode.toLowerCase().indexOf(term.toLowerCase()) > -1): results[0];
        return results[1].length ?  filteredResult.filter(location => results[1].filter(selectedLocation => selectedLocation.court_venue_id !== location.court_venue_id).length): filteredResult;
      }), take(10)
    );
  }

  public updatedVal(currentValue: string) {
    this.showAutocomplete = !!currentValue && (currentValue.length > this.minSearchCharacters);
    this.filter(currentValue);
  }

  public onSelectionChange(selection?: LocationModel) {
    this.selectedLocation = selection;
  }

  public getLocations(): Observable<LocationModel[]> {
    return this.locationService.getAllLocations();
  }

  public addSelection() {
    if (this.selectedLocation) {
      this.selectedLocations$.subscribe(x => {
          x.push(this.selectedLocation);
          this.selectedLocation = null;
      });
    }

    this.selectedLocation = undefined;
  }

  public removeSelection(location: LocationModel) {
    this.selectedLocations$.subscribe(x => {
      let index = x.findIndex(d => d.court_venue_id === location.court_venue_id);
      x.splice(index, 1);
    });
  }

  public getDisplayName(selectedLocation: LocationModel): string {
    return selectedLocation.site_name;
  }
}
