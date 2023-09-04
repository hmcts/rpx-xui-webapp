import { OnInit } from '@angular/core';
import { RefundsService } from '../../services/refunds/refunds.service';
import { IRefundList } from '../../interfaces/IRefundList';
import * as i0 from "@angular/core";
export declare class RefundListComponent implements OnInit {
    private refundService;
    USERID: string;
    LOGGEDINUSERROLES: any[];
    LOGGEDINUSEREMAIL: string;
    constructor(refundService: RefundsService);
    tableApprovalHeader: string;
    tableRejectedHeader: string;
    submittedRefundList: IRefundList[];
    rejectedRefundList: IRefundList[];
    approvalStatus: string;
    rejectStatus: string;
    errorMessage: any;
    isApproveTableVisible: boolean;
    isRejectTableVisible: boolean;
    dropdownvalue: string;
    isAuthorized: boolean;
    userLst: any;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RefundListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RefundListComponent, "ccpay-refund-list", never, { "USERID": { "alias": "USERID"; "required": false; }; "LOGGEDINUSERROLES": { "alias": "LOGGEDINUSERROLES"; "required": false; }; "LOGGEDINUSEREMAIL": { "alias": "LOGGEDINUSEREMAIL"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=refund-list.component.d.ts.map