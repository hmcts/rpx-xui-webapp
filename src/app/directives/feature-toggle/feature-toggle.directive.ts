import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import {ConfigurationModel} from '../../models/configuration.model';
import {AppConfigService} from '../../services/config/configuration.services';

@Directive({
  selector: '[exuiFeatureToggle]'
})
export class FeatureToggleDirective implements OnInit {
  @Input() exuiFeatureToggle: string;
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
    if (!this.config[this.exuiFeatureToggle]) {
      return true;
    }
    return this.config[this.exuiFeatureToggle].isEnabled;
  }
}
