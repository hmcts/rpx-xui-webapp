import { OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { CaseField } from '../../../domain/definition';
import { OrganisationService, OrganisationVm } from '../../../services/organisation';
import { OrganisationConverter, SimpleOrganisationModel } from '../../../domain/organisation';
import { Observable } from 'rxjs';
export declare class ReadOrganisationFieldRawComponent extends AbstractFieldReadComponent implements OnInit {
    private organisationService;
    private organisationConverter;
    caseFields: CaseField[];
    organisations$: Observable<OrganisationVm[]>;
    selectedOrg$: Observable<SimpleOrganisationModel>;
    constructor(organisationService: OrganisationService, organisationConverter: OrganisationConverter);
    ngOnInit(): void;
}
