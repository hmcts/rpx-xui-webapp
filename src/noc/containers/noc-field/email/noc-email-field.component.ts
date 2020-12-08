import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-email-field',
  templateUrl: 'noc-email-field.html'
})
export class NocEmailFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  public emailControl: FormControl;

  public ngOnInit() {
    this.setAnswer();
    this.emailControl = this.registerControl(new FormControl(this.answerValue));
  }
}
