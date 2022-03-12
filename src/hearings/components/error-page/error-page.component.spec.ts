import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Observable } from "rxjs";
import { initialState } from "src/hearings/hearing.test.data";
import { ErrorPageComponent } from "./error-page.component";

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let store: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();	
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.sub = new Observable().subscribe();
    spyOn(component.sub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should set the case id', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const headingElement = nativeElement.querySelector('.govuk-heading-xl');
    expect(headingElement.textContent).toEqual('There was a system error and your request could not be processed.');
    const hrefElement = nativeElement.querySelector('.govuk-link');
    expect(hrefElement.getAttribute('href')).toEqual('/cases/case-details/1111222233334444/hearings');
    expect(component.caseId).toEqual('1111222233334444');
  });
});