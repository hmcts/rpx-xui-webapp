import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'exui-privacy-policy',
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.route.fragment.subscribe(fragment => {
      try {
        document.querySelector('#' + fragment).scrollIntoView();
      } catch (e) { }
    });
  }

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
