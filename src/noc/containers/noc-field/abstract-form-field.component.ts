import { Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { NocQuestion } from '../../models';

export abstract class AbstractFormFieldComponent {

  @Input()
  public questionField: NocQuestion;

  @Input()
  public answerValue$?: Observable<string>;

  @Input()
  public formGroup?: FormGroup;

  @Input()
  public registerControl?: <T extends AbstractControl> (control: T) => T;

  public answerValue: string = '';

  protected defaultControlRegister(): (control: FormControl) => AbstractControl {
    return control => {
      if (!this.formGroup) {
        return null;
      }
      if (this.formGroup.controls[this.questionField.question_id]) {
        return this.formGroup.get(this.questionField.question_id);
      }
      this.addValidators(this.questionField, control);
      this.formGroup.addControl(this.questionField.question_id, control);
      return control;
    };
  }

  protected addValidators(questionField: NocQuestion, control: FormControl): void {
    // No validators by default, override this method to add validators to the form control
  }

  protected setAnswer(): void {
    this.answerValue$.subscribe(answer => this.answerValue = answer);
  }
}
