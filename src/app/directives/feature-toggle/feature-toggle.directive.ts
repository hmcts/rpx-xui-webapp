import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import {ConfigurationModel} from '../../models/configuration.model';
import {AppConfigService} from '../../services/config/configuration.services';

@Directive({
  selector: '[exuiFeatureToggle]'
})
export class FeatureToggleDirective implements OnInit {
  @Input() public exuiFeatureToggle: string;
  public config: ConfigurationModel;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly appConfigService: AppConfigService
  ) {}

  public ngOnInit() {
    this.config = this.appConfigService.getFeatureToggle() || {};
    if (this.isEnabled()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  public isEnabled() {
    if (!this.config[this.exuiFeatureToggle]) {
      return true;
    }
    return this.config[this.exuiFeatureToggle].isEnabled;
  }
}
