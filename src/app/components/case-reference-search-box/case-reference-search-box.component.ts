import { Component, Input } from '@angular/core';
import { NavItemsModel } from 'src/app/models';

@Component({
  selector: 'exui-case-reference-search-box',
  templateUrl: './case-reference-search-box.component.html',
  styleUrls: ['./case-reference-search-box.component.scss']
})
export class CaseReferenceSearchBoxComponent {
  @Input() public item: NavItemsModel;
}
