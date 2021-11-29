
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'exui-view-hearing',
  templateUrl: './view-hearing.component.html',
  styleUrls: ['./view-hearing.component.scss']
})
export class ViewHearingComponent implements OnInit {
  public findLocationFormGroup: FormGroup;
  constructor( fb: FormBuilder) { 
    this.findLocationFormGroup =  fb.group({
      locationSelectedFormControl: [null]
    });
  }

  public ngOnInit(): void {    
  }

  public onSubmit() {
    console.log('success validation hearing view')
    // this.navigationHandler(NocNavigationEvent.CONTINUE);
  }
}
