import {Component, EventEmitter, Input, Output} from '@angular/core';
/**
 * TMP
 */
@Component({
  selector: 'exui-ccd-dummy-component',
  template: `
    <div>Dummy component for testing</div>
    <button (click)="onSubmit()">Submit</button>
    <button (click)="onCancel()">Cancel</button>
  `
})
export class DummyComponentComponent  {

  @Input() jurisdiction: string;
  @Input() caseType: string;
  @Output() submitted = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<string>();

  constructor() { }

  onSubmit() {
    this.submitted.emit('submitted');
  }

  onCancel() {
    this.cancelled.emit('cancelled');
  }

}
