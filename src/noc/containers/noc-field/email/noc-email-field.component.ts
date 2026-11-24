import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  standalone: false,
  selector: 'exui-noc-email-field',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: 'noc-email-field.component.html',
})
export class NocEmailFieldComponent extends AbstractFieldWriteComponent implements OnInit {
  public emailControl: FormControl;

  public ngOnInit() {
    this.setAnswer();
    this.emailControl = this.registerControl(new FormControl(this.answerValue));
  }
}
