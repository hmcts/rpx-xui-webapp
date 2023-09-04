import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseField } from '../../../domain/definition/case-field.model';
import { OrganisationConverter } from '../../../domain/organisation/organisation-converter';
import { SimpleOrganisationModel } from '../../../domain/organisation/simple-organisation.model';
import { OrganisationService, OrganisationVm } from '../../../services/organisation/organisation.service';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
export declare class ReadOrganisationFieldTableComponent extends AbstractFieldReadComponent implements OnInit {
    private readonly organisationService;
    private readonly organisationConverter;
    caseFields: CaseField[];
    organisations$: Observable<OrganisationVm[]>;
    selectedOrg$: Observable<SimpleOrganisationModel>;
    constructor(organisationService: OrganisationService, organisationConverter: OrganisationConverter);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadOrganisationFieldTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadOrganisationFieldTableComponent, "ccd-read-organisation-field-table", never, { "caseFields": "caseFields"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=read-organisation-field-table.component.d.ts.map