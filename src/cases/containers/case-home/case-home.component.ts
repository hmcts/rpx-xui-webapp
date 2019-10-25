import { ExUITitleService } from 'src/app/shared/services/exui-title.service';
import { Component } from '@angular/core';

@Component({
  selector: 'exui-case-home',
  templateUrl: 'case-home.component.html'
})
export class CaseHomeComponent {
  constructor(private titleService: ExUITitleService) {}
}
