import * as i0 from "@angular/core";
export declare enum AlertMessageType {
    WARNING = "warning",
    SUCCESS = "success",
    ERROR = "error",
    INFORMATION = "information"
}
export declare class AlertComponent {
    static readonly TYPE_WARNING = "warning";
    static readonly TYPE_SUCCESS = "success";
    static readonly TYPE_ERROR = "error";
    static readonly TYPE_INFORMATION = "information";
    type: AlertMessageType;
    showIcon: boolean;
    alertMessageType: typeof AlertMessageType;
    static ɵfac: i0.ɵɵFactoryDeclaration<AlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AlertComponent, "cut-alert", never, { "type": "type"; "showIcon": "showIcon"; }, {}, never, ["*"], false, never>;
}
//# sourceMappingURL=alert.component.d.ts.map