import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'accept-tc-component',
  templateUrl: './accept-tc.component.html'
})
export class AcceptTcComponent {
  @Input() uId: string;
  @Output() acceptTC = new EventEmitter<string>();

  onAcceptTandC() {
    this.acceptTC.emit(this.uId);
  }
}
