import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-text-field',
  templateUrl: './noc-text-field.component.html'
})
export class NocTextFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  public textControl: FormControl;

  public ngOnInit() {
    this.setAnswer();
    this.textControl = this.registerControl(new FormControl(this.answerValue));
  }
}
