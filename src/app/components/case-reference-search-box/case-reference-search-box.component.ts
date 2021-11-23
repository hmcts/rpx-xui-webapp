import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavItemsModel } from 'src/app/models/nav-item.model';

@Component({
  selector: 'exui-case-reference-search-box',
  templateUrl: './case-reference-search-box.component.html',
  styleUrls: ['./case-reference-search-box.component.scss']
})
export class CaseReferenceSearchBoxComponent implements OnInit {

  @Input() item: NavItemsModel;

  public formGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  public ngOnInit() {
    this.formGroup = this.fb.group({
      caseReference: ''
    });
  }

  public onSubmit(): void {
    const abc = this.formGroup.get('caseReference').value;
    console.log('abc', abc);
  }
}
