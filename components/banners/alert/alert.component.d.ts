declare enum AlertMessageType {
    WARNING = "warning",
    SUCCESS = "success",
    ERROR = "error"
}
export declare class AlertComponent {
    static readonly TYPE_WARNING = "warning";
    static readonly TYPE_SUCCESS = "success";
    static readonly TYPE_ERROR = "error";
    type: AlertMessageType;
    alertMessageType: typeof AlertMessageType;
    showIcon: boolean;
}
export {};
