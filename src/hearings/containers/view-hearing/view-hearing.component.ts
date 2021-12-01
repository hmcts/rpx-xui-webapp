
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'exui-view-hearing',
  templateUrl: './view-hearing.component.html',
  styleUrls: ['./view-hearing.component.scss']
})
export class ViewHearingComponent implements OnInit {
  public findLocationFormGroup: FormGroup;
  dirty: boolean;
  constructor(fb: FormBuilder) { 
    this.findLocationFormGroup =  fb.group({
      locationSelectedFormControl: [null, Validators.required]
    });

    this.findLocationFormGroup.valueChanges.subscribe(() => this.dirty = true);
  }

  public ngOnInit(): void {
    console.log('form control venue',this.findLocationFormGroup.controls.locationSelectedFormControl);
  }

  public onSubmit() {
    console.log('success validation hearing view')
  }
}
