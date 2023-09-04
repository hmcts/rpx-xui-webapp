import { ChangeDetectorRef } from '@angular/core';
import { PaymentLibComponent } from '../../payment-lib.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IRefundList } from '../../interfaces/IRefundList';
import { OrderslistService } from '../../services/orderslist.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class TableComponent {
    private paymentLibComponent;
    private cdRef;
    private OrderslistService;
    private router;
    private activeRoute;
    DATASOURCE: any[];
    STATUS: string;
    errorMessage: string;
    isApprovalFlow: boolean;
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    userLst: any;
    serviceLst: any;
    actualcount: number;
    count: number;
    refundList: IRefundList[];
    paginator: MatPaginator;
    sort: MatSort;
    constructor(paymentLibComponent: PaymentLibComponent, cdRef: ChangeDetectorRef, OrderslistService: OrderslistService, router: Router, activeRoute: ActivatedRoute);
    ngOnInit(): void;
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    ngAfterViewInit(): void;
    applyFilter(filterValue: string): void;
    selectchange(args: any): void;
    goToRefundProcessComponent(refundReference: string, refundData: IRefundList): void;
    goToRefundViewComponent(refundReference: string, refundData: IRefundList): void;
    goToCaseReview(ccdCaseNumber: string, refundData: IRefundList): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableComponent, "ccpay-table", never, { "DATASOURCE": { "alias": "DATASOURCE"; "required": false; }; "STATUS": { "alias": "STATUS"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=table.component.d.ts.map