import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-phone-uk-field',
  templateUrl: './noc-phone-uk-field.html'
})
export class NocPhoneUkFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  public phoneUkControl: FormControl;

  public ngOnInit() {
    this.setAnswer();
    this.phoneUkControl = this.registerControl(new FormControl(this.answerValue));
  }

}
