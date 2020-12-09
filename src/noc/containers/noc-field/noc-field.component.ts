import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { plainToClassFromExist } from 'class-transformer';
import { NocQuestion } from '../../models';
import { AbstractFieldWriteComponent } from './abstract-field-write.component';
import { FormValidatorsService } from './form-validators.service';
import { PaletteService } from './palette.service';

@Component({
  selector: 'exui-noc-field',
  template: `
    <div>
      <ng-container #fieldContainer></ng-container>
    </div>
  `
})
export class NocFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  @ViewChild('fieldContainer', {read: ViewContainerRef})
  public fieldContainer: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver,
              private paletteService: PaletteService,
              private formValidatorsService: FormValidatorsService) {
    super();
  }

  protected addValidators(nocQuestion: NocQuestion, control: FormControl): void {
    this.formValidatorsService.addValidators(nocQuestion, control);
  }

  public ngOnInit(): void {
    const componentClass = this.paletteService.getFieldComponentClass(this.questionField);

    const injector = Injector.create([], this.fieldContainer.parentInjector);
    const component = this.resolver.resolveComponentFactory(componentClass).create(injector);

    // Provide component @Inputs
    component.instance['questionField'] = plainToClassFromExist(new NocQuestion(), this.questionField);
    component.instance['answerValue$'] = this.answerValue$;
    component.instance['formGroup'] = this.formGroup;
    component.instance['registerControl'] = this.registerControl || this.defaultControlRegister();
    component.instance['idPrefix'] = this.idPrefix;
    this.fieldContainer.insert(component.hostView);
  }
}
