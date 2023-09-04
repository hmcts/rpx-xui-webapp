export declare class HRef {
    href: string;
}
export declare class DocumentLinks {
    self: HRef;
    binary: HRef;
}
export declare class Document {
    _links: DocumentLinks;
    originalDocumentName: string;
    hashToken?: string;
}
export declare class Embedded {
    documents: Document[];
}
export declare class DocumentData {
    _embedded: Embedded;
    documents: Document[];
}
export declare class FormDocument {
    document_url: string;
    document_binary_url: string;
    document_filename: string;
    document_hash?: string;
}
//# sourceMappingURL=document-data.model.d.ts.map