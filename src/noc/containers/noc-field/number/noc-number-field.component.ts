import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-number-field',
  templateUrl: './noc-number-field.component.html'
})
export class NocNumberFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  public numberControl: FormControl;

  public ngOnInit() {
    this.setAnswer();
    this.numberControl = this.registerControl(new FormControl(this.answerValue));
  }
}
