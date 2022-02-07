import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';
import { YesNoService } from './yes-no.service';

@Component({
  selector: 'exui-noc-yes-no-field',
  templateUrl: './noc-yes-no-field.component.html'
})
export class NocYesNoFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  public yesNoValues = [ 'Yes', 'No' ];
  public yesNoControl: FormControl;

  public constructor(private readonly yesNoService: YesNoService) {
    super();
  }

  public ngOnInit() {
    this.setAnswer();
    this.yesNoControl = this.registerControl(new FormControl(this.yesNoService.format(this.answerValue)));
  }

}
