import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { LocationSearchContainerComponent } from './location-search-container.component';

fdescribe('LocationSearchContainerComponent', () => {
  let component: LocationSearchContainerComponent;
  let fixture: ComponentFixture<LocationSearchContainerComponent>;

  const initialState = {
    hearings: {
      hearingsList: {
        caseHearingsMainModel: [
          {
            hmctsServiceID: 'SSCS'
          }
        ]
      },
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSearchContainerComponent ],
      providers: [
        provideMockStore({initialState})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
