import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AccessDeniedComponent } from './access-denied.component';

@Pipe({
  standalone: false,
  name: 'rpxTranslate',
})
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('AccessDeniedComponent', () => {
  let component: AccessDeniedComponent;
  let fixture: ComponentFixture<AccessDeniedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccessDeniedComponent, RpxTranslateMockPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDeniedComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the Manage Cases access denied message', () => {
    const translatePipeSpy = spyOn(RpxTranslateMockPipe.prototype, 'transform').and.callThrough();
    fixture.detectChanges();

    const headingElement = fixture.debugElement.query(By.css('.govuk-heading-xl')).nativeElement;
    expect(headingElement.textContent).toContain('You cannot use Manage Cases with this account');
    expect(translatePipeSpy).toHaveBeenCalledWith('You cannot use Manage Cases with this account');

    const bodyElements = fixture.debugElement.queryAll(By.css('.govuk-body'));
    expect(bodyElements[0].nativeElement.textContent).toContain(
      'You signed in successfully, but this account is not authorised to use Manage Cases.'
    );
    expect(bodyElements[1].nativeElement.textContent).toContain('Sign in with a different account');
    expect(bodyElements[1].nativeElement.textContent).toContain(
      'or contact your service/onboarding support team if you need access.'
    );
  });
});
