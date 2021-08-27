import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskAlertBannerComponent } from '..';

fdescribe('TaskAlertBannerComponent', () => {
  let component: TaskAlertBannerComponent;
  let fixture: ComponentFixture<TaskAlertBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAlertBannerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAlertBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the relevant text', () => {
    const titleElement = document.getElementById(`alertTitle`) as HTMLElement;
    expect(titleElement.innerText).toBe(component.alertTitle);
    const messageElement = document.getElementById(`alertMessage`) as HTMLElement;
    expect(messageElement.textContent).toBe(`Warning ${component.alertMessage} `)
  });

});
