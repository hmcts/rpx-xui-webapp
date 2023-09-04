import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JudicialUserModel } from '../../../domain/jurisdiction/judicial-user.model';
import { JurisdictionService } from '../../../services/jurisdiction/jurisdiction.service';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
export declare class ReadJudicialUserFieldComponent extends AbstractFieldReadComponent implements OnInit, OnDestroy {
    private readonly jurisdictionService;
    judicialUser: JudicialUserModel;
    sub: Subscription;
    constructor(jurisdictionService: JurisdictionService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadJudicialUserFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadJudicialUserFieldComponent, "ccd-read-judicial-user-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-judicial-user-field.component.d.ts.map