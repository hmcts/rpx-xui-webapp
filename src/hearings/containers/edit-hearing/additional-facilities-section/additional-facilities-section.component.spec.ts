import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalFacilitiesSectionComponent } from './additional-facilities-section.component';

describe('AdditionalFacilitiesSectionComponent', () => {
  let component: AdditionalFacilitiesSectionComponent;
  let fixture: ComponentFixture<AdditionalFacilitiesSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AdditionalFacilitiesSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalFacilitiesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
