import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import {ConfigurationModel} from '../../models/configuration.model';
import {AppConfigService} from '../../services/configuration.services';

@Directive({
  selector: '[featureToggle]'
})
export class FeatureToggleDirective implements OnInit {
  @Input() featureToggle: string;
  config: ConfigurationModel;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private appConfigService: AppConfigService
  ) {}

  ngOnInit() {
    this.config = this.appConfigService.getFeatureToggle();
    if (this.isEnabled()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  isEnabled() {
    if (!this.config[this.featureToggle]) {
      return true;
    }
    return this.config[this.featureToggle].isEnabled;
  }
}
