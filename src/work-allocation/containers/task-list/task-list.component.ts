import {DataSource} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

const columnNames = [
  'name',
  'types',
  'attack',
  'defence',
  'speed',
  'healing',
  'recovery',
  'health',
  'levelUp',
];

const heros = {
  'Hammerer Maccabeus': {
    name: 'Hammerer Maccabeus',
    types: 'Holy/ Fire',
    attack: 1,
    defence: 1,
    speed: 1,
    healing: 1,
    recovery: 1,
    health: 5,
  }
};

const nums = of(1, 2, 3);

@Component({
    selector: 'exui-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['task-list.component.scss']
  })
  export class TaskListComponent implements OnInit {

    // So this should be a component that uses the CDK Table Module
    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    // dataSource = new ExampleDataSource()

    // You can use this as a single source of truth that gets mapped to other obserables.
    private heros$ = new BehaviorSubject(heros);

    // public Obserable for table
    dataSource$: Observable<any[]>;

    // array of column names
    columns = columnNames;

    constructor() {
      console.log('hello');
    }

    ngOnInit() {
      console.log('at ng on init');
      this.dataSource$ = this.heros$.pipe(map(v => Object.values(v)));

      const squareValues = map((val: number) => val * val);
      const squaredNums = squareValues(nums);

      squaredNums.subscribe(x => console.log(x));
    }

    levelUp(heroName: string) {
      const updatedHero = this.heros$.value[heroName];

      updatedHero.attack++;
      updatedHero.defence++;
      updatedHero.speed++;
      updatedHero.healing++;
      updatedHero.recovery++;
      updatedHero.health++;

      const newHeroData = { ...this.heros$.value, [heroName]: updatedHero };

      this.heros$.next(newHeroData);
    }
  }

  /**
   * Data source to provide what data should be rendered in the table. Note that the data source
   * can retrieve its data in any way. In this case, the data source is provided a reference
   * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
   * the underlying data. Instead, it only needs to take the data and send the table exactly what
   * should be rendered.
   *
   * - Yes
   */
  // export class ExampleDataSource extends DataSource<PeriodicElement> {
  //   /** Stream of data that is provided to the table. */
  //   data = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);
  //
  //   /** Connect function called by the table to retrieve one stream containing the data to render. */
  //   connect(): Observable<PeriodicElement[]> {
  //     return this.data;
  //   }
  //
  //   disconnect() {}
  // }
