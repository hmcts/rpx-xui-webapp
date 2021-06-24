import { Component } from '@angular/core';
import { SubNavigation } from '@hmcts/rpx-xui-common-lib';

@Component({
selector: 'exui-all-tasks',
templateUrl: 'all-work-home.component.html',
styleUrls: ['all-work-home.component.scss']
})
export class AllWorkHomeComponent {
    public subNavigationItems: SubNavigation[] = [
        {text: 'Tasks', href: '/work/all-work/tasks', active: true},
        {text: 'Cases', href: '/work/all-work/cases', active: false}
      ];
}
