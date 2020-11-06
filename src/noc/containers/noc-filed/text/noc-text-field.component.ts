import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-text-field',
  templateUrl: './noc-text-field.html'
})
export class NocTextFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  textControl: FormControl;

  ngOnInit() {
    this.textControl = this.registerControl(new FormControl(this.questionField.answer_field));
  }
}
