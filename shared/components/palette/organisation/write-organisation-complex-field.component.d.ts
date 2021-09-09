import { AbstractFormFieldComponent } from '../base-field/abstract-form-field.component';
import { SimpleOrganisationModel } from '../../../domain/organisation';
import { Observable } from 'rxjs';
export declare class WriteOrganisationComplexFieldComponent extends AbstractFormFieldComponent {
    selectedOrg$: Observable<SimpleOrganisationModel>;
    constructor();
}
