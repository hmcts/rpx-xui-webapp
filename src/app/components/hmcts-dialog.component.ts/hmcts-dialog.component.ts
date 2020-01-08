import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {DOCUMENT} from '@angular/common';
// TODO move this comon lib
/*
* Gov UK Dialog Component
* Responsible for displaying dialog layout
* using ng-content to display content from parent
* */
@Component({
  selector: 'exui-dialog',
  templateUrl: './hmcts-dialog.component.html',
  styleUrls: ['./hmcts-dialog.component.scss']
})
export class HmctsDialogComponent  implements OnInit {

  @Input() positionTop: string;
  @Output() close = new EventEmitter();
  constructor(@Inject(DOCUMENT) private document) {}

  ngOnInit(): void {
    const dialogEl = this.document.querySelector(`.gem-c-modal-dialogue__box`);
    dialogEl.focus();
  }

  onClose(): void {
    this.close.emit();
  }

}
