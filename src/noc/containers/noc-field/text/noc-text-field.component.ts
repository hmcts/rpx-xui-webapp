import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  standalone: false,
  selector: 'exui-noc-text-field',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './noc-text-field.component.html',
})
export class NocTextFieldComponent extends AbstractFieldWriteComponent implements OnInit {
  public textControl: FormControl;

  public ngOnInit() {
    this.setAnswer();
    this.textControl = this.registerControl(new FormControl(this.answerValue));
  }
}
