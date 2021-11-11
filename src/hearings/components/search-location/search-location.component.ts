import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, merge, Observable, of, OperatorFunction, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import * as fromAppStore from '../../../app/store';
import * as fromHearingStore from '../../../hearings/store';

class LocationModel {
  name: string;
  description: string;
  id: number;
}

@Component({
  selector: 'exui-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit {
  @Input() public disabled?: boolean = null;
  @Input() public selectedLocations$: Observable<LocationModel[]>;
  @Input() public submitted?: boolean = true;

  public locations$: Observable<LocationModel[]>;

  public selectedLocation: LocationModel;
  public text: string;
  public showAutocomplete: boolean = false;
  private readonly minSearchCharacters = 2;
  public findLocationGroup: FormGroup;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  public findLocationControl = new FormControl();
  public filteredOptions: Observable<unknown>;
  private _data: Observable<LocationModel[]>;

  constructor(private readonly appStore: Store<fromAppStore.State>,
              private readonly hearingStore: Store<fromHearingStore.State>,) { 
   // TODO: this.appStore.dispatch(new fromAppStore.LoadLocations(caseID));
   this.selectedLocations$ = of([]);
  }

  public ngOnInit(): void {
    this.locations$ = this.getLocations();

      this.findLocationGroup = new FormGroup({});
      this.findLocationGroup.addControl('findLocationControl', this.findLocationControl);
      this.filteredOptions = this.findLocationControl.valueChanges.pipe(
        startWith(''),
        switchMap(searchTerm => {
          return this.filter(searchTerm || '');
        })
      );
      this.findLocationControl.setValue(this.selectedLocation);
  }

  public filter(term: string): any {
    this.locations$.subscribe(x =>
        x.filter(v => {
          if (!term) return true;
          return v.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }));
  }

  public get data(): Observable<LocationModel[]> {
    const a$ = combineLatest([
      this.locations$,
      this.selectedLocations$
    ]);

    return a$.pipe(
      map(results => results[1].length ?  results[0].filter(location => results[1].filter(selectedLocation => selectedLocation.id !== location.id).length): results[0])
    );
  }

  public updatedVal(currentValue: string) {
    this.showAutocomplete = !!currentValue && (currentValue.length > this.minSearchCharacters);
  }

  public onSelectionChange(selection?: LocationModel) {
    this.selectedLocation = selection;
    // this.personSelected.emit(selection);
  }

  public getLocations(): Observable<LocationModel[]> {
    return of([{
        name: 'Tim',
        id: 1,
        description: ''
      },
      {
        name: 'Jane',
        id: 2,
        description: ''
      }
    ]);
  }

  public addSelection() {
    this.selectedLocations$.subscribe(x => {
        x.push(this.selectedLocation);
        this.selectedLocation = null;
    });

    // TODO: REMOVE SELECTED LOCATION
  }

  public removeSelection(location: LocationModel) {
    this.selectedLocations$.subscribe(x => {
      let index = x.findIndex(d => d.id === location.id);
      x.splice(index, 1);
      console.log(x)
    });
  }

  public getDisplayName(selectedPerson: LocationModel): string {
    return selectedPerson.name;
  }

  // public searchLocation() {
  //   this.search(of(this.text));
  // }

  // search (text$: Observable<string>) : Observable<Subscription>  {
  //   const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
  //   //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.selectionBox.isPopupOpen()));
  //   const inputFocus$ = this.focus$;

  //   return merge(debouncedText$, inputFocus$).pipe(
  //     map(term => 
  //        this.locations$.subscribe(x => {
  //         x.filter(v => {
  //           if (!term) return true;
  //           return v.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
  //         })
  //        })       
  //     ));
  // }
}