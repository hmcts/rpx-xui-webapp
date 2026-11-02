import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockRpxTranslatePipe } from '../../../app/shared/test/mock-rpx-translate.pipe';
import { HearingCancellationService } from '../../services/hearing-cancellation.service';
import { HearingCancellationDialogComponent } from './hearing-cancellation-dialog.component';

@Component({
  standalone: false,
  template: '<button (click)="cancel()">Cancel</button>',
})
class DialogHostComponent {
  public readonly onConfirmed = jasmine.createSpy('onConfirmed');

  constructor(private readonly cancellation: HearingCancellationService) {}

  public cancel(): void {
    this.cancellation.confirm(this.onConfirmed);
  }
}

describe('HearingCancellationDialogComponent', () => {
  let fixture: ComponentFixture<DialogHostComponent>;
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogHostComponent, HearingCancellationDialogComponent, MockRpxTranslatePipe],
      imports: [MatDialogModule, NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(DialogHostComponent);
    fixture.detectChanges();
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  afterEach(() => {
    TestBed.inject(MatDialog).closeAll();
    fixture.destroy();
    TestBed.inject(OverlayContainer).ngOnDestroy();
  });

  function openDialog(): void {
    const cancelButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    cancelButton.focus();
    cancelButton.click();
    fixture.detectChanges();
    flush();
  }

  it('should show the exact message and Yes and No buttons without leaving the page', fakeAsync(() => {
    openDialog();

    expect(overlay.querySelector('#hearing-cancellation-message').textContent.trim()).toBe(
      'You are about to return to the main hearings screen, any entries you have made will be lost. Do you still want to cancel?'
    );
    expect(Array.from(overlay.querySelectorAll('button')).map((button) => button.textContent.trim())).toEqual(['Yes', 'No']);
    expect(fixture.componentInstance.onConfirmed).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(overlay.querySelector('#hearing-cancellation-no'));
  }));

  it('should proceed only when Yes is selected', fakeAsync(() => {
    openDialog();
    overlay.querySelector<HTMLButtonElement>('button').click();
    flush();

    expect(fixture.componentInstance.onConfirmed).toHaveBeenCalledTimes(1);
    expect(overlay.querySelector('[role="dialog"]')).toBeNull();
  }));

  it('should keep editing and restore focus when No is selected', fakeAsync(() => {
    openDialog();
    overlay.querySelector<HTMLButtonElement>('#hearing-cancellation-no').click();
    flush();

    expect(fixture.componentInstance.onConfirmed).not.toHaveBeenCalled();
    expect(overlay.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('button'));
  }));

  it('should keep editing when Escape is pressed', fakeAsync(() => {
    openDialog();
    overlay
      .querySelector('[role="dialog"]')
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
    flush();

    expect(fixture.componentInstance.onConfirmed).not.toHaveBeenCalled();
    expect(overlay.querySelector('[role="dialog"]')).toBeNull();
  }));

  it('should show only one dialog when Cancel is clicked repeatedly', fakeAsync(() => {
    openDialog();
    fixture.componentInstance.cancel();
    fixture.detectChanges();
    flush();

    expect(overlay.querySelectorAll('[role="dialog"]').length).toBe(1);
  }));
});
