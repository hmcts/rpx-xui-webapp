import { FormGroup } from '@angular/forms';
export declare class FormErrorService {
    mapFieldErrors(errors: {
        id: string;
        message: string;
    }[], form: FormGroup, errorKey: string): void;
    private getFormControl;
}
