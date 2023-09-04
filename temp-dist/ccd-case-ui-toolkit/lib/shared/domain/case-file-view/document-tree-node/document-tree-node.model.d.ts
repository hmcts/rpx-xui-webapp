import { DocumentTreeNodeType } from './document-tree-node-type.model';
export declare class DocumentTreeNode {
    name: string;
    type: DocumentTreeNodeType;
    children?: DocumentTreeNode[];
    document_filename?: string;
    document_binary_url?: string;
    attribute_path?: string;
    get childDocumentCount(): number;
    sortChildrenAscending(): void;
    sortChildrenDescending(): void;
    get flattenedAll(): DocumentTreeNode[];
}
//# sourceMappingURL=document-tree-node.model.d.ts.map