import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
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
export class NocFieldComponent extends AbstractFieldWriteComponent implements AfterViewInit {
  @ViewChild('fieldContainer', { static: true, read: ViewContainerRef })
  public fieldContainer: ViewContainerRef;

  constructor(private readonly resolver: ComponentFactoryResolver,
              private readonly paletteService: PaletteService,
              private readonly formValidatorsService: FormValidatorsService) {
    super();
  }

  protected addValidators(nocQuestion: NocQuestion, control: FormControl): void {
    this.formValidatorsService.addValidators(nocQuestion, control);
  }

  public ngAfterViewInit(): void {
    const componentClass = this.paletteService.getFieldComponentClass(this.questionField);

    const injector = Injector.create({
      providers: [],
      parent: this.fieldContainer.parentInjector
    });
    const component = this.resolver.resolveComponentFactory(componentClass).create(injector);

    // Provide component @Inputs
    // eslint-disable-next-line dot-notation
    component.instance['questionField'] = plainToClassFromExist(new NocQuestion(), this.questionField);
    // eslint-disable-next-line dot-notation
    component.instance['answerValue$'] = this.answerValue$;
    // eslint-disable-next-line dot-notation
    component.instance['formGroup'] = this.formGroup;
    // eslint-disable-next-line dot-notation
    component.instance['registerControl'] = this.registerControl || this.defaultControlRegister();
    // eslint-disable-next-line dot-notation
    component.instance['idPrefix'] = this.idPrefix;
    this.fieldContainer.insert(component.hostView);
  }
}
