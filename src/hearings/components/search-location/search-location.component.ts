import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, startWith, switchMap, take } from 'rxjs/operators';
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
  public backUpLocations$: Observable<LocationModel[]>;
  public selectedLocation: LocationModel;
  public text: string;
  public showAutocomplete: boolean = false;
  private readonly minSearchCharacters = 2;
  public filteredOptions: Observable<unknown>;
  public term: string;

  constructor(private readonly locationService: LocationService, private fb: FormBuilder) {
    this.findLocationForm =  fb.group({
      findLocationControl: [null],
  });
  }

  public ngOnInit(): void {   
    this.selectedLocations$ = of([]);
    this.locations$ = this.getLocations();

    if (this.findLocationForm.controls.findLocationControl) {
      this.findLocationForm.controls.findLocationControl.valueChanges.pipe(
        startWith(''),
        switchMap(searchTerm => {
          console.log('formtest', searchTerm)
          return this.filter(searchTerm || '');
        })
      );

      this.findLocationForm.controls.findLocationControl.setValue(this.selectedLocation);
    }
  }

  public filter(term: string): any {
    console.log('term', term);

    const a$ = combineLatest([
      this.getLocations(),
      this.selectedLocations$,
    ]);

    this.locations$ = a$.pipe(
      map(results => {
        const filteredResult = term ? results[0].filter(x => x.court_address.toLowerCase().indexOf(term.toLowerCase()) > -1): results[0];
        const res = results[1].length ?  filteredResult.filter(location => results[1].
        filter(selectedLocation => selectedLocation.court_venue_id !== location.court_venue_id).length): filteredResult;
        return res;
      }), take(10)
    );
  }

  public updatedVal(currentValue: string) {
    this.term = currentValue;
    this.showAutocomplete = !!currentValue && (currentValue.length > this.minSearchCharacters);
    this.filter(currentValue);
  }

  public onSelectionChange(selection?: LocationModel) {
    this.selectedLocation = selection;
  }

  public getLocations(): Observable<LocationModel[]> {
    return this.locationService.getAllLocations(this.caseId);
  }

  public addSelection() {
    this.selectedLocations$.subscribe(x => {
        x.push(this.selectedLocation);
        this.selectedLocation = null;
    });
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
