export declare class EventStatusService {
    static readonly CALLBACK_STATUS_INCOMPLETE = "INCOMPLETE_CALLBACK";
    static readonly DELETE_DRAFT_STATUS_INCOMPLETE = "INCOMPLETE_DELETE_DRAFT";
    static readonly CALLBACK_STATUS_COMPLETE = "CALLBACK_COMPLETED";
    static readonly DELETE_DRAFT_STATUS_COMPLETE = "DELETE_DRAFT_COMPLETED";
    static isIncomplete(eventStatus: string): boolean;
}
