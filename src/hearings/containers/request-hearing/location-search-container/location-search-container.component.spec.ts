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

  it('should include page elements', () => {
    const hearingHeader = fixture.debugElement.nativeElement.querySelector('.govuk-heading-l');
    expect(hearingHeader.textContent).toContain('What are the hearing venue details?');
    const hint = fixture.debugElement.nativeElement.querySelector('.govuk-hint');
    expect(hint.textContent).toContain('If this is a fully remote hearing you must still select the court or tribunal which will be managing the case.');
    const findCourtLink = fixture.debugElement.nativeElement.querySelector('.govuk-inset-text');
    expect(findCourtLink.textContent).toContain('You can check the venue has the required facilities or reasonable adjustments using');
    expect(findCourtLink.innerHTML).toContain('https://www.find-court-tribunal.service.gov.uk/search-by-name');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
