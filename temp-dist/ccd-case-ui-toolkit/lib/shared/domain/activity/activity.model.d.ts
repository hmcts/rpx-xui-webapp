export declare class ActivityInfo {
    forename: string;
    surname: string;
}
export declare class Activity {
    caseId: string;
    viewers: ActivityInfo[];
    editors: ActivityInfo[];
    unknownViewers: number;
    unknownEditors: number;
}
export declare enum DisplayMode {
    BANNER = 0,
    ICON = 1
}
//# sourceMappingURL=activity.model.d.ts.map