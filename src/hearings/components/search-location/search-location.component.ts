import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { merge, Observable, of, OperatorFunction, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import * as fromAppStore from '../../../app/store';
import * as fromHearingStore from '../../../hearings/store';
import _ from loadda
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
  public locations$: Observable<LocationModel[]>;
  public selectedLocations$: Observable<LocationModel[]>;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  public text: string;

  public searchLocation() {
    this.search(of(this.text));
  }

  search (text$: Observable<string>) : Observable<Subscription>  {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.selectionBox.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => 
         this.locations$.subscribe(x => {
          x.filter(v => {
            if (!term) return true;
            return v.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
          })
         })       
      ));
  }

  constructor(private readonly appStore: Store<fromAppStore.State>,
              private readonly hearingStore: Store<fromHearingStore.State>,) { 
   // TODO: this.appStore.dispatch(new fromAppStore.LoadLocations(caseID));
  }

  public addSelection(location: LocationModel) {
    this.selectedLocations$.pipe(tap(usersList => {
      usersList.push(location);
    }));
  }

  public removeSelection(location: LocationModel) {
    this.selectedLocations$.pipe(tap(usersList => {
      usersList = usersList.filter(item => item.id === location.id);
    }));
  }

  public ngOnInit(): void {
    this.locations$ = this.getLocations();
  }

  public getLocations(): Observable<LocationModel[]> {
    return [
      new LocationModel {
        name: 'Tim',
        id: 1
      }
    ]
    /// TODO: get NGRX
    // return this.hearingStore.pipe(select(fromAppStore.getLocation('yes'))).pipe(
    //   map(hearingsStateData => {
    //       if (hearingsStateData && hearingsStateData.caseHearingsMainModel && hearingsStateData.caseHearingsMainModel.caseHearings) {
    //         return hearingsStateData.caseHearingsMainModel.caseHearings.filter(hearing =>
    //           hearing.exuiSectionStatus === status
    //         );
    //       } else {
    //         return [];
    //       }
    //     }
    //   )
    // );
  }
}