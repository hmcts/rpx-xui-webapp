import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Answer } from '../../models';

@Component({
  selector: 'exui-answers',
  templateUrl: './answers.component.html'
})

export class AnswersComponent {

  @Input() public caption: string;
  @Input() public heading: string;
  @Input() public hint: string;
  @Input() public answers: Answer[] = [];

  @Output() public navigate = new EventEmitter<string>();

  constructor() {}

  public changeAction(action: string): void {
    this.navigate.emit(action);
  }
}
