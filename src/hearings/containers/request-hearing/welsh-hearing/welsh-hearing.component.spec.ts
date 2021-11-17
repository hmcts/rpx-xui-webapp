import { Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ErrorMessage } from "src/app/models";

import { WelshHearingComponent } from "./welsh-hearing.component";

describe("WelshHearingComponent", () => {
  let component: WelshHearingComponent;
  let fixture: ComponentFixture<WelshHearingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [WelshHearingComponent, MockTestComponent, MockHearingPartiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelshHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should check hearingInWelshFlag", (): void => {
    fixture.detectChanges();
    let errors = null;
    const hearingInWelshFlag = component.welshForm.controls.hearingInWelshFlag;

    hearingInWelshFlag.setValue(true);
    errors = hearingInWelshFlag.errors;
    expect(errors).toBeNull();

    hearingInWelshFlag.setValue(null);
    errors = hearingInWelshFlag.errors;
    expect(errors).toBeTruthy();
  });

  it("should check hearingInWelshFlag", (): void => {
    const NAME_ERROR: ErrorMessage = {
      title: "There is a problem",
      description: "You must select Yes or No",
      fieldId: "welsh-hint",
    };
    fixture.detectChanges();
    let errors = null;
    const hearingInWelshFlag = component.welshForm.controls.hearingInWelshFlag;

    hearingInWelshFlag.setValue(null);
    component.onSubmit();
    errors = hearingInWelshFlag.errors;
    expect(component.error).toBe(NAME_ERROR);
  });
});

@Component({
  selector: "exui-error-message",
  template: "",
})
class MockTestComponent {
  @Input() public error: ErrorMessage;
}
@Component({
  selector: "exui-hearing-parties-title",
  template: "",
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}
