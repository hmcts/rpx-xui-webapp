import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { YesNoService } from './yes-no.service';
import { AbstractFieldWriteComponent } from '../abstract-field-write.component';

@Component({
  selector: 'exui-noc-yes-no-field',
  templateUrl: './noc-yes-no-field.html'
})
export class NocYesNoFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  public yesNoValues = [ 'Yes', 'No' ];
  public yesNoControl: FormControl;

  public constructor(private yesNoService: YesNoService) {
    super();
  }

  public ngOnInit() {
    this.yesNoControl = this.registerControl(new FormControl(this.yesNoService.format('')));
  }

}
