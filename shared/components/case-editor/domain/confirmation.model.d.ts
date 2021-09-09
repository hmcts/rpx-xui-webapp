export declare class Confirmation {
    private caseId;
    private status;
    private header;
    private body;
    constructor(caseId: string, status: string, header: string, body: string);
    getCaseId(): string;
    getStatus(): string;
    getHeader(): string;
    getBody(): string;
}
