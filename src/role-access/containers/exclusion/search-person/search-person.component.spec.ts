import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { SearchPersonComponent } from './search-person.component';

describe('FindPersonComponent', () => {
  let component: SearchPersonComponent;
  let fixture: ComponentFixture<SearchPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPersonComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
