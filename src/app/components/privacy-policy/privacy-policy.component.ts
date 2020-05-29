import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent {

  constructor(private route: ActivatedRoute) { }

  private subscription: Subscription;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.route.fragment.subscribe(fragment => {
      try {
        document.querySelector('#' + fragment).scrollIntoView();
      } catch (e) { }
    });
  }
}
