import { AfterViewInit, Component, Injector, ViewChild, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { plainToClassFromExist } from 'class-transformer';
import { NocQuestion } from '../../models';
import { AbstractFieldWriteComponent } from './abstract-field-write.component';
import { FormValidatorsService } from './form-validators.service';
import { PaletteService } from './palette.service';

@Component({
  standalone: false,
  selector: 'exui-noc-field',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div>
      <ng-container #fieldContainer></ng-container>
    </div>
  `,
})
export class NocFieldComponent extends AbstractFieldWriteComponent implements AfterViewInit {
  @ViewChild('fieldContainer', { static: true, read: ViewContainerRef })
  public fieldContainer: ViewContainerRef;

  constructor(
    private readonly paletteService: PaletteService,
    private readonly formValidatorsService: FormValidatorsService
  ) {
    super();
  }

  protected addValidators(nocQuestion: NocQuestion, control: FormControl): void {
    this.formValidatorsService.addValidators(nocQuestion, control);
  }

  public ngAfterViewInit(): void {
    const componentClass = this.paletteService.getFieldComponentClass(this.questionField);

    const injector = Injector.create({
      providers: [],
      parent: this.fieldContainer.parentInjector,
    });
    const component = this.fieldContainer.createComponent(componentClass, { injector });

    // Provide component @Inputs

    component.instance['questionField'] = plainToClassFromExist(new NocQuestion(), this.questionField);

    component.instance['answerValue$'] = this.answerValue$;

    component.instance['formGroup'] = this.formGroup;

    component.instance['registerControl'] = this.registerControl || this.defaultControlRegister();

    component.instance['idPrefix'] = this.idPrefix;
  }
}
