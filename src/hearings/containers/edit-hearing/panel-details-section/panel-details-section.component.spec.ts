import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelDetailsSectionComponent } from './panel-details-section.component';

describe('PanelDetailsSectionComponent', () => {
  let component: PanelDetailsSectionComponent;
  let fixture: ComponentFixture<PanelDetailsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [PanelDetailsSectionComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(PanelDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
