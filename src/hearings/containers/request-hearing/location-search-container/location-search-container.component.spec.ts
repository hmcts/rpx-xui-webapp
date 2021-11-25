import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { LocationSearchContainerComponent } from './location-search-container.component';

describe('LocationSearchContainerComponent', () => {
  let component: LocationSearchContainerComponent;
  let fixture: ComponentFixture<LocationSearchContainerComponent>;
  let mockStore: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LocationSearchContainerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore(),
      ]
    })
      .compileComponents();
    mockStore = TestBed.get(Store);
    mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    fixture = TestBed.createComponent(LocationSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
