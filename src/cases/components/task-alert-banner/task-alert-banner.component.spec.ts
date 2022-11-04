import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskAlertBannerComponent } from '..';

describe('TaskAlertBannerComponent', () => {
  let component: TaskAlertBannerComponent;
  let fixture: ComponentFixture<TaskAlertBannerComponent>;

  beforeEach(waitForAsync(() => {
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
    component.alertTitle = 'This is the title';
    component.alertMessage = 'This is the message';
    fixture.detectChanges();
    const titleElement = document.getElementById(`alertTitle`) as HTMLElement;
    expect(titleElement.innerText).toBe(component.alertTitle);
    const messageElement = document.getElementById(`alertMessage`) as HTMLElement;
    expect(messageElement.textContent).toBe(`Warning ${component.alertMessage} `)
  });

});
