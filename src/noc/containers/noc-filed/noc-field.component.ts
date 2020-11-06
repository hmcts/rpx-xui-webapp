import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractFieldWriteComponent } from './abstract-field-write.component';
import { FormControl } from '@angular/forms';
import { plainToClassFromExist } from 'class-transformer';
import { NocQuestion } from '../../models';
import { PaletteService } from './palette.service';
import { FormValidatorsService } from './form-validators.service';

@Component({
  selector: 'exui-noc-field',
  template: `
    <div>
      <ng-container #fieldContainer></ng-container>
    </div>
  `
})
export class NocFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  // @Input()
  // nocQuestions: NocQuestion[] = [];

  @ViewChild('fieldContainer', {read: ViewContainerRef})
  fieldContainer: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver,
              private paletteService: PaletteService,
              private formValidatorsService: FormValidatorsService) {
    super();
  }

  protected addValidators(nocQuestion: NocQuestion, control: FormControl): void {
    this.formValidatorsService.addValidators(nocQuestion, control);
  }

  ngOnInit(): void {
    const componentClass = this.paletteService.getFieldComponentClass(this.questionField, true);

    const injector = Injector.create([], this.fieldContainer.parentInjector);
    const component = this.resolver.resolveComponentFactory(componentClass).create(injector);

    // Provide component @Inputs
    component.instance['caseField'] = plainToClassFromExist(new NocQuestion(), this.questionField);
    // component.instance['caseFields'] = this.caseFields;
    component.instance['formGroup'] = this.formGroup;
    component.instance['registerControl'] = this.registerControl || this.defaultControlRegister();
    component.instance['idPrefix'] = this.idPrefix;
    this.fieldContainer.insert(component.hostView);
  }
}
