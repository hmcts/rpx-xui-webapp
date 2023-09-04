import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DocumentTreeNode, DocumentTreeNodeType } from '../../../../../domain/case-file-view';
import { DocumentManagementService, WindowService } from '../../../../../services';
import { CaseFileViewFolderSelectorComponent } from '../case-file-view-folder-selector/case-file-view-folder-selector.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../../../services";
import * as i2 from "@angular/router";
import * as i3 from "@angular/material/dialog";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/cdk/tree";
import * as i7 from "./case-file-view-folder-sort/case-file-view-folder-sort.component";
import * as i8 from "./case-file-view-folder-document-actions/case-file-view-folder-document-actions.component";
function CaseFileViewFolderComponent_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, " No results found ");
    i0.ɵɵelementEnd();
} }
function CaseFileViewFolderComponent_div_8_cdk_nested_tree_node_4_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "cdk-nested-tree-node", 12)(1, "button", 13);
    i0.ɵɵlistener("click", function CaseFileViewFolderComponent_div_8_cdk_nested_tree_node_4_Template_button_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const node_r4 = restoredCtx.$implicit; const ctx_r5 = i0.ɵɵnextContext(2); ctx_r5.selectedNodeItem = node_r4; return i0.ɵɵresetView(ctx_r5.clickedDocument.emit(node_r4)); });
    i0.ɵɵelementStart(2, "div", 14);
    i0.ɵɵelement(3, "img", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 16);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 17)(7, "ccd-case-file-view-folder-document-actions", 18);
    i0.ɵɵlistener("changeFolderAction", function CaseFileViewFolderComponent_div_8_cdk_nested_tree_node_4_Template_ccd_case_file_view_folder_document_actions_changeFolderAction_7_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const node_r4 = restoredCtx.$implicit; const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.triggerDocumentAction("changeFolder", node_r4)); })("openInANewTabAction", function CaseFileViewFolderComponent_div_8_cdk_nested_tree_node_4_Template_ccd_case_file_view_folder_document_actions_openInANewTabAction_7_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const node_r4 = restoredCtx.$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.triggerDocumentAction("openInANewTab", node_r4)); })("downloadAction", function CaseFileViewFolderComponent_div_8_cdk_nested_tree_node_4_Template_ccd_case_file_view_folder_document_actions_downloadAction_7_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const node_r4 = restoredCtx.$implicit; const ctx_r9 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r9.triggerDocumentAction("download", node_r4)); })("printAction", function CaseFileViewFolderComponent_div_8_cdk_nested_tree_node_4_Template_ccd_case_file_view_folder_document_actions_printAction_7_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const node_r4 = restoredCtx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.triggerDocumentAction("print", node_r4)); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const node_r4 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("node--selected", (ctx_r2.selectedNodeItem == null ? null : ctx_r2.selectedNodeItem.name) === node_r4.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(node_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("allowMoving", ctx_r2.allowMoving);
} }
function CaseFileViewFolderComponent_div_8_cdk_nested_tree_node_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "cdk-nested-tree-node", 19)(1, "button", 20)(2, "div", 21);
    i0.ɵɵelement(3, "img", 22);
    i0.ɵɵelementStart(4, "span", 23);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 24);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div");
    i0.ɵɵelementContainer(9, 25);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const node_r11 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", "toggle " + node_r11.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", ctx_r3.nestedTreeControl.isExpanded(node_r11) ? "/assets/images/folder-open.png" : "/assets/images/folder.png", i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(node_r11.childDocumentCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(node_r11.name);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("document-tree-invisible", !ctx_r3.nestedTreeControl.isExpanded(node_r11));
} }
function CaseFileViewFolderComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, CaseFileViewFolderComponent_div_8_div_1_Template, 2, 0, "div", 8);
    i0.ɵɵelementStart(2, "div")(3, "cdk-tree", 9);
    i0.ɵɵtemplate(4, CaseFileViewFolderComponent_div_8_cdk_nested_tree_node_4_Template, 8, 4, "cdk-nested-tree-node", 10);
    i0.ɵɵtemplate(5, CaseFileViewFolderComponent_div_8_cdk_nested_tree_node_5_Template, 10, 6, "cdk-nested-tree-node", 11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.nestedDataSource || ctx_r0.nestedDataSource.length === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("dataSource", ctx_r0.nestedDataSource)("treeControl", ctx_r0.nestedTreeControl);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("cdkTreeNodeDefWhen", ctx_r0.nestedChildren);
} }
export const MEDIA_VIEWER_LOCALSTORAGE_KEY = 'media-viewer-info';
export class CaseFileViewFolderComponent {
    constructor(windowService, router, documentManagementService, dialog) {
        this.windowService = windowService;
        this.router = router;
        this.documentManagementService = documentManagementService;
        this.dialog = dialog;
        this.clickedDocument = new EventEmitter();
        this.moveDocument = new EventEmitter();
        this.categories = [];
        this.getChildren = (node) => of(node.children);
        this.nestedChildren = (_, nodeData) => nodeData.children;
        this.nestedTreeControl = new NestedTreeControl(this.getChildren);
    }
    get documentCount() {
        if (this.nestedDataSource?.length) {
            return this.nestedDataSource.reduce((acc, item) => {
                return acc + item.childDocumentCount;
            }, 0);
        }
        else {
            return 0;
        }
    }
    ngOnInit() {
        this.documentFilterFormGroup = new UntypedFormGroup({});
        this.documentSearchFormControl = new FormControl('');
        this.documentFilterFormGroup.addControl(CaseFileViewFolderComponent.DOCUMENT_SEARCH_FORM_CONTROL_NAME, this.documentSearchFormControl);
        // Listen to search input and initiate filter documents if at least three characters entered
        this.documentFilterSubscription = this.documentSearchFormControl.valueChanges.pipe(tap((searchTerm) => this.searchTermLength = searchTerm.length), switchMap((searchTerm) => this.filter(searchTerm.toLowerCase()).pipe())).subscribe(documentTreeData => {
            this.nestedDataSource = documentTreeData;
            this.nestedTreeControl.dataNodes = documentTreeData;
            this.searchTermLength >= CaseFileViewFolderComponent.MINIMUM_SEARCH_CHARACTERS
                ? this.nestedTreeControl.expandAll()
                : this.nestedTreeControl.collapseAll();
        });
        // Subscribe to the input categories and documents, and generate tree data and initialise cdk tree
        this.categoriesAndDocumentsSubscription = this.categoriesAndDocuments.subscribe(categoriesAndDocuments => {
            const categories = categoriesAndDocuments.categories;
            this.categories = categories;
            // Generate document tree data from categories
            this.documentTreeData = this.generateTreeData(categories);
            // Append uncategorised documents
            if (categoriesAndDocuments.uncategorised_documents && categoriesAndDocuments.uncategorised_documents.length > 0) {
                const uncategorisedDocuments = this.getUncategorisedDocuments(categoriesAndDocuments.uncategorised_documents);
                this.documentTreeData.push(uncategorisedDocuments);
            }
            // Initialise cdk tree with generated data
            this.nestedDataSource = this.documentTreeData;
            this.nestedTreeControl.dataNodes = this.documentTreeData;
        });
    }
    generateTreeData(categories) {
        return categories.reduce((tree, node) => {
            const newDocumentTreeNode = new DocumentTreeNode();
            newDocumentTreeNode.name = node.category_name;
            newDocumentTreeNode.type = DocumentTreeNodeType.FOLDER;
            newDocumentTreeNode.children = [...this.generateTreeData(node.sub_categories), ...this.getDocuments(node.documents)];
            return [
                ...tree,
                newDocumentTreeNode,
            ];
        }, []);
    }
    getDocuments(documents) {
        const documentsToReturn = [];
        documents.forEach(document => {
            const documentTreeNode = new DocumentTreeNode();
            documentTreeNode.name = document.document_filename;
            documentTreeNode.type = DocumentTreeNodeType.DOCUMENT;
            documentTreeNode.document_filename = document.document_filename;
            documentTreeNode.document_binary_url = document.document_binary_url;
            documentTreeNode.attribute_path = document.attribute_path;
            documentsToReturn.push(documentTreeNode);
        });
        return documentsToReturn;
    }
    getUncategorisedDocuments(uncategorisedDocuments) {
        const documents = [];
        uncategorisedDocuments.forEach(document => {
            const documentTreeNode = new DocumentTreeNode();
            documentTreeNode.name = document.document_filename;
            documentTreeNode.type = DocumentTreeNodeType.DOCUMENT;
            documentTreeNode.document_filename = document.document_filename;
            documentTreeNode.document_binary_url = document.document_binary_url;
            documentTreeNode.attribute_path = document.attribute_path;
            documents.push(documentTreeNode);
        });
        const uncategorisedNode = new DocumentTreeNode();
        uncategorisedNode.name = CaseFileViewFolderComponent.UNCATEGORISED_DOCUMENTS_TITLE;
        uncategorisedNode.type = DocumentTreeNodeType.FOLDER;
        uncategorisedNode.children = documents;
        return uncategorisedNode;
    }
    filter(searchTerm) {
        // Make a copy of the data so we do not mutate the original
        function copy(node) {
            const documentTreeNode = new DocumentTreeNode();
            return Object.assign(documentTreeNode, node);
        }
        let filteredData = this.documentTreeData;
        if (searchTerm && searchTerm.length >= CaseFileViewFolderComponent.MINIMUM_SEARCH_CHARACTERS && this.documentFilterFormGroup.controls[CaseFileViewFolderComponent.DOCUMENT_SEARCH_FORM_CONTROL_NAME].value.length > 0) {
            filteredData = this.documentTreeData.map(copy).filter(function filterTreeData(node) {
                if (node.name && node.name.toLowerCase().includes(searchTerm) && node.type === DocumentTreeNodeType.DOCUMENT) {
                    return true;
                }
                // Call recursively if node has children
                if (node.children) {
                    return (node.children = node.children.map(copy).filter(filterTreeData)).length;
                }
            });
        }
        return of(filteredData);
    }
    triggerDocumentAction(actionType, documentTreeNode) {
        switch (actionType) {
            case ('changeFolder'):
                this.openMoveDialog(documentTreeNode);
                break;
            case ('openInANewTab'):
                this.windowService.setLocalStorage(MEDIA_VIEWER_LOCALSTORAGE_KEY, this.documentManagementService.getMediaViewerInfo({
                    document_binary_url: documentTreeNode.document_binary_url,
                    document_filename: documentTreeNode.document_filename
                }));
                this.windowService.openOnNewTab(this.router.createUrlTree(['/media-viewer'])?.toString());
                break;
            case ('download'):
                // Create a URL from the document_binary_url property (absolute URL) and use the path portion (relative URL).
                // This is necessary because the Manage Cases application will automatically apply a proxy to the request, with
                // the correct remote endpoint
                this.downloadFile(new URL(documentTreeNode.document_binary_url).pathname, documentTreeNode.document_filename);
                break;
            case ('print'):
                this.printDocument(new URL(documentTreeNode.document_binary_url).pathname);
                break;
            default:
                return;
        }
    }
    sortDataSourceAscAlphabetically() {
        const sortedData = this.nestedDataSource.map(item => {
            item.sortChildrenAscending();
            return item;
        });
        this.updateNodeData(sortedData);
    }
    sortDataSourceDescAlphabetically() {
        const sortedData = this.nestedDataSource.map(item => {
            item.sortChildrenDescending();
            return item;
        });
        this.updateNodeData(sortedData);
    }
    updateNodeData(data) {
        const prevSelected = this.nestedTreeControl.expansionModel.selected.map((item) => {
            return item.name;
        });
        this.nestedTreeControl.collapseAll();
        this.nestedDataSource = data.map((item) => {
            const newDocumentTreeNode = new DocumentTreeNode();
            newDocumentTreeNode.name = item.name;
            newDocumentTreeNode.type = item.type;
            newDocumentTreeNode.children = item.children;
            return newDocumentTreeNode;
        });
        const flattenedArray = this.nestedDataSource.map((item) => {
            return item.flattenedAll;
        }).flat();
        const newObjects = flattenedArray.filter((item) => {
            return prevSelected.includes(item.name);
        });
        newObjects.forEach(object => this.nestedTreeControl.expand(object));
    }
    ngOnDestroy() {
        this.categoriesAndDocumentsSubscription?.unsubscribe();
        this.documentFilterSubscription?.unsubscribe();
    }
    openMoveDialog(node) {
        const dialogRef = this.dialog.open(CaseFileViewFolderSelectorComponent, {
            data: { categories: this.categories, document: node }
        });
        dialogRef.afterClosed().subscribe(newCatId => {
            if (newCatId) {
                this.moveDocument.emit({ newCategory: newCatId, document: node });
            }
        });
    }
    printDocument(url) {
        const printWindow = window.open(url);
        printWindow.print();
    }
    downloadFile(url, downloadFileName) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = downloadFileName;
        a.click();
        a.remove();
    }
}
CaseFileViewFolderComponent.UNCATEGORISED_DOCUMENTS_TITLE = 'Uncategorised documents';
CaseFileViewFolderComponent.DOCUMENT_SEARCH_FORM_CONTROL_NAME = 'documentSearchFormControl';
CaseFileViewFolderComponent.MINIMUM_SEARCH_CHARACTERS = 1;
CaseFileViewFolderComponent.ɵfac = function CaseFileViewFolderComponent_Factory(t) { return new (t || CaseFileViewFolderComponent)(i0.ɵɵdirectiveInject(i1.WindowService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i1.DocumentManagementService), i0.ɵɵdirectiveInject(i3.MatDialog)); };
CaseFileViewFolderComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseFileViewFolderComponent, selectors: [["ccd-case-file-view-folder"]], inputs: { categoriesAndDocuments: "categoriesAndDocuments", allowMoving: "allowMoving" }, outputs: { clickedDocument: "clickedDocument", moveDocument: "moveDocument" }, decls: 9, vars: 3, consts: [[1, "document-filter-container"], [1, "form-group", "document-filter", 3, "formGroup"], ["type", "search", "id", "document-search", "name", "documentSearchFormControl", "formControlName", "documentSearchFormControl", "placeholder", "Search by document name", 1, "form-control", "document-search"], [1, "document-folders-header"], [1, "document-folders-header__title"], [3, "sortAscending", "sortDescending"], ["class", "document-tree-container", 4, "ngIf"], [1, "document-tree-container"], [4, "ngIf"], [3, "dataSource", "treeControl"], ["class", "document-tree-container__node document-tree-container__node--document", 4, "cdkTreeNodeDef"], ["class", "document-tree-container__node document-tree-container__folder", 4, "cdkTreeNodeDef", "cdkTreeNodeDefWhen"], [1, "document-tree-container__node", "document-tree-container__node--document"], [1, "node", 3, "click"], ["disabled", "", 1, "node__icon"], ["src", "/assets/img/case-file-view/case-file-view-document.svg", "alt", "Document icon", 1, "node__iconImg"], [1, "node__name", "node-name-document"], [1, "node__document-options"], [3, "allowMoving", "changeFolderAction", "openInANewTabAction", "downloadAction", "printAction"], [1, "document-tree-container__node", "document-tree-container__folder"], ["cdkTreeNodeToggle", "", 1, "node"], [1, "node__icon"], ["alt", "Folder icon", 1, "node__iconImg", 3, "src"], [1, "node__count"], [1, "node__name", "node__name--folder"], ["cdkTreeNodeOutlet", ""]], template: function CaseFileViewFolderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
        i0.ɵɵelement(2, "input", 2);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(3, "div", 3)(4, "div", 4);
        i0.ɵɵtext(5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div")(7, "ccd-case-file-view-folder-sort", 5);
        i0.ɵɵlistener("sortAscending", function CaseFileViewFolderComponent_Template_ccd_case_file_view_folder_sort_sortAscending_7_listener() { return ctx.sortDataSourceAscAlphabetically(); })("sortDescending", function CaseFileViewFolderComponent_Template_ccd_case_file_view_folder_sort_sortDescending_7_listener() { return ctx.sortDataSourceDescAlphabetically(); });
        i0.ɵɵelementEnd()()();
        i0.ɵɵtemplate(8, CaseFileViewFolderComponent_div_8_Template, 6, 4, "div", 6);
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("formGroup", ctx.documentFilterFormGroup);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1("Documents (", ctx.documentCount, ")");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.documentTreeData);
    } }, dependencies: [i4.NgIf, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgControlStatusGroup, i5.FormGroupDirective, i5.FormControlName, i6.CdkNestedTreeNode, i6.CdkTreeNodeDef, i6.CdkTreeNodeToggle, i6.CdkTree, i6.CdkTreeNodeOutlet, i7.CaseFileViewFolderSortComponent, i8.CaseFileViewFolderDocumentActionsComponent], styles: ["[_nghost-%COMP%]{display:flex;height:100%;flex-direction:column}[_nghost-%COMP%]   .document-tree-container[_ngcontent-%COMP%]{flex:1 0}.document-filter-container[_ngcontent-%COMP%]{border-bottom:2px solid #C9C9C9}.document-filter-container[_ngcontent-%COMP%]   .document-filter[_ngcontent-%COMP%]{padding:10px}.document-filter-container[_ngcontent-%COMP%]   .document-filter[_ngcontent-%COMP%]   .document-search[_ngcontent-%COMP%]{background:url(/assets/images/icon-search-black.svg) no-repeat right #FFF;background-position-x:calc(100% - 4px);padding-right:30px;width:100%}.document-filter-container[_ngcontent-%COMP%]   .documents-title[_ngcontent-%COMP%]{height:30%;margin-left:8px;font-weight:700}.document-tree-container[_ngcontent-%COMP%]{padding:4px;overflow-x:hidden;overflow-y:scroll}.document-tree-container__node[_ngcontent-%COMP%]{display:block}.document-tree-container__node[_ngcontent-%COMP%]   .document-tree-container__node[_ngcontent-%COMP%]{padding-left:40px}.document-tree-container[_ngcontent-%COMP%]   .document-tree-invisible[_ngcontent-%COMP%]{display:none}.document-tree-container[_ngcontent-%COMP%]::-webkit-scrollbar{width:7px}.document-tree-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{border:4px solid rgba(0,0,0,0);background-clip:padding-box;border-radius:9999px;background-color:#aaa}.document-tree-container[_ngcontent-%COMP%]::-webkit-scrollbar-button{display:none}.document-tree-container[_ngcontent-%COMP%]::-webkit-scrollbar-track-piece{background:#EEE}.document-tree-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#CCC}.document-folders-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #C9C9C9;padding:10px}.document-folders-header__title[_ngcontent-%COMP%]{font-weight:700}.node[_ngcontent-%COMP%]{display:flex;align-items:center;width:100%;padding:6px;background:none;border:0;cursor:pointer;white-space:nowrap}.node--selected[_ngcontent-%COMP%]{background:#fff2cc}.node__icon[_ngcontent-%COMP%]{position:relative;display:inline-block}.node__count[_ngcontent-%COMP%]{color:#fff;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:.875rem;padding-top:4px}.node__iconImg[_ngcontent-%COMP%]{display:block;height:30px;width:30px}.node__name[_ngcontent-%COMP%]{margin-left:6px;font-size:1rem;overflow:hidden;text-overflow:ellipsis}.node__document-options[_ngcontent-%COMP%]{margin-left:auto;margin-right:0}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFileViewFolderComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-file-view-folder', template: "<div class=\"document-filter-container\">\n  <div class=\"form-group document-filter\" [formGroup]=\"documentFilterFormGroup\">\n    <input class=\"form-control document-search\"\n      type=\"search\"\n      id=\"document-search\"\n      name=\"documentSearchFormControl\"\n      formControlName=\"documentSearchFormControl\"\n      placeholder=\"Search by document name\">\n  </div>\n</div>\n\n<div class=\"document-folders-header\">\n  <div class=\"document-folders-header__title\">Documents ({{ documentCount }})</div>\n  <div>\n    <ccd-case-file-view-folder-sort\n      (sortAscending)=\"sortDataSourceAscAlphabetically()\"\n      (sortDescending)=\"sortDataSourceDescAlphabetically()\"\n    ></ccd-case-file-view-folder-sort>\n  </div>\n</div>\n\n<div class=\"document-tree-container\" *ngIf=\"documentTreeData\">\n  <div *ngIf=\"!nestedDataSource || nestedDataSource.length === 0\">\n    No results found\n  </div>\n  <div>\n    <cdk-tree [dataSource]=\"nestedDataSource\" [treeControl]=\"nestedTreeControl\">\n      <!-- document -->\n      <cdk-nested-tree-node class=\"document-tree-container__node document-tree-container__node--document\" *cdkTreeNodeDef=\"let node\">\n        <button class=\"node\" (click)=\"selectedNodeItem = node; clickedDocument.emit(node)\"\n                [class.node--selected]=\"selectedNodeItem?.name === node.name\">\n          <div class=\"node__icon\" disabled>\n            <img src=\"/assets/img/case-file-view/case-file-view-document.svg\" class=\"node__iconImg\" alt=\"Document icon\">\n          </div>\n          <span class=\"node__name node-name-document\">{{node.name}}</span>\n          <div class=\"node__document-options\">\n            <ccd-case-file-view-folder-document-actions\n              (changeFolderAction)=\"triggerDocumentAction('changeFolder', node)\"\n              (openInANewTabAction)=\"triggerDocumentAction('openInANewTab', node)\"\n              (downloadAction)=\"triggerDocumentAction('download', node)\"\n              (printAction)=\"triggerDocumentAction('print', node)\"\n              [allowMoving]=\"allowMoving\"\n            >\n            </ccd-case-file-view-folder-document-actions>\n          </div>\n        </button>\n      </cdk-nested-tree-node>\n      <!-- folder-->\n      <cdk-nested-tree-node class=\"document-tree-container__node document-tree-container__folder\" *cdkTreeNodeDef=\"let node; when: nestedChildren\">\n        <button class=\"node\" cdkTreeNodeToggle>\n          <div class=\"node__icon\" [attr.aria-label]=\"'toggle ' + node.name\" >\n            <img class=\"node__iconImg\"\n                 [src]=\"nestedTreeControl.isExpanded(node) ? '/assets/images/folder-open.png' : '/assets/images/folder.png'\" alt=\"Folder icon\">\n            <span class=\"node__count\">{{node.childDocumentCount}}</span>\n          </div>\n          <span class=\"node__name node__name--folder\">{{node.name}}</span>\n        </button>\n\n        <div [class.document-tree-invisible]=\"!nestedTreeControl.isExpanded(node)\">\n          <ng-container cdkTreeNodeOutlet></ng-container>\n        </div>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  </div>\n</div>\n", styles: [":host{display:flex;height:100%;flex-direction:column}:host .document-tree-container{flex:1 0}.document-filter-container{border-bottom:2px solid #C9C9C9}.document-filter-container .document-filter{padding:10px}.document-filter-container .document-filter .document-search{background:url(/assets/images/icon-search-black.svg) no-repeat right #FFF;background-position-x:calc(100% - 4px);padding-right:30px;width:100%}.document-filter-container .documents-title{height:30%;margin-left:8px;font-weight:700}.document-tree-container{padding:4px;overflow-x:hidden;overflow-y:scroll}.document-tree-container__node{display:block}.document-tree-container__node .document-tree-container__node{padding-left:40px}.document-tree-container .document-tree-invisible{display:none}.document-tree-container::-webkit-scrollbar{width:7px}.document-tree-container::-webkit-scrollbar-thumb{border:4px solid rgba(0,0,0,0);background-clip:padding-box;border-radius:9999px;background-color:#aaa}.document-tree-container::-webkit-scrollbar-button{display:none}.document-tree-container::-webkit-scrollbar-track-piece{background:#EEE}.document-tree-container::-webkit-scrollbar-thumb{background:#CCC}.document-folders-header{display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #C9C9C9;padding:10px}.document-folders-header__title{font-weight:700}.node{display:flex;align-items:center;width:100%;padding:6px;background:none;border:0;cursor:pointer;white-space:nowrap}.node--selected{background:#fff2cc}.node__icon{position:relative;display:inline-block}.node__count{color:#fff;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:.875rem;padding-top:4px}.node__iconImg{display:block;height:30px;width:30px}.node__name{margin-left:6px;font-size:1rem;overflow:hidden;text-overflow:ellipsis}.node__document-options{margin-left:auto;margin-right:0}\n"] }]
    }], function () { return [{ type: i1.WindowService }, { type: i2.Router }, { type: i1.DocumentManagementService }, { type: i3.MatDialog }]; }, { categoriesAndDocuments: [{
            type: Input
        }], allowMoving: [{
            type: Input
        }], clickedDocument: [{
            type: Output
        }], moveDocument: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1maWxlLXZpZXctZm9sZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtZmlsZS12aWV3L2NvbXBvbmVudHMvY2FzZS1maWxlLXZpZXctZm9sZGVyL2Nhc2UtZmlsZS12aWV3LWZvbGRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9jYXNlLWZpbGUtdmlldy9jb21wb25lbnRzL2Nhc2UtZmlsZS12aWV3LWZvbGRlci9jYXNlLWZpbGUtdmlldy1mb2xkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUlMLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDckIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLEVB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Q2pGLDJCQUFLLHdDQUFBO1FBRUQsZ0pBQWlCLHFDQUFpQyxJQUFDLHFJQUNqQyxzQ0FBa0MsSUFERDtRQUVwRCxpQkFBaUMsRUFBQSxFQUFBO1FBSXRDLDRFQTJDTTs7UUEvRG9DLGVBQXFDO1FBQXJDLHVEQUFxQztRQVdqQyxlQUErQjtRQUEvQiw0REFBK0I7UUFTdkMsZUFBc0I7UUFBdEIsMkNBQXNCOzt1RkRFL0MsMkJBQTJCO2NBTHZDLFNBQVM7MkJBQ0UsMkJBQTJCO3FKQVNyQixzQkFBc0I7a0JBQXJDLEtBQUs7WUFDVSxXQUFXO2tCQUExQixLQUFLO1lBQ1csZUFBZTtrQkFBL0IsTUFBTTtZQUNVLFlBQVk7a0JBQTVCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXN0ZWRUcmVlQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2FzZUZpbGVWaWV3Q2F0ZWdvcnksXG4gIENhc2VGaWxlVmlld0RvY3VtZW50LFxuICBDYXRlZ29yaWVzQW5kRG9jdW1lbnRzLFxuICBEb2N1bWVudFRyZWVOb2RlLFxuICBEb2N1bWVudFRyZWVOb2RlVHlwZVxufSBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb21haW4vY2FzZS1maWxlLXZpZXcnO1xuaW1wb3J0IHsgRG9jdW1lbnRNYW5hZ2VtZW50U2VydmljZSwgV2luZG93U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IENhc2VGaWxlVmlld0ZvbGRlclNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vY2FzZS1maWxlLXZpZXctZm9sZGVyLXNlbGVjdG9yL2Nhc2UtZmlsZS12aWV3LWZvbGRlci1zZWxlY3Rvci5jb21wb25lbnQnO1xuZXhwb3J0IGNvbnN0IE1FRElBX1ZJRVdFUl9MT0NBTFNUT1JBR0VfS0VZID0gJ21lZGlhLXZpZXdlci1pbmZvJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtZmlsZS12aWV3LWZvbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWZpbGUtdmlldy1mb2xkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXNlLWZpbGUtdmlldy1mb2xkZXIuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZUZpbGVWaWV3Rm9sZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBVTkNBVEVHT1JJU0VEX0RPQ1VNRU5UU19USVRMRSA9ICdVbmNhdGVnb3Jpc2VkIGRvY3VtZW50cyc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERPQ1VNRU5UX1NFQVJDSF9GT1JNX0NPTlRST0xfTkFNRSA9ICdkb2N1bWVudFNlYXJjaEZvcm1Db250cm9sJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUlOSU1VTV9TRUFSQ0hfQ0hBUkFDVEVSUyA9IDE7XG5cbiAgQElucHV0KCkgcHVibGljIGNhdGVnb3JpZXNBbmREb2N1bWVudHM6IE9ic2VydmFibGU8Q2F0ZWdvcmllc0FuZERvY3VtZW50cz47XG4gIEBJbnB1dCgpIHB1YmxpYyBhbGxvd01vdmluZzogYm9vbGVhbjtcbiAgQE91dHB1dCgpIHB1YmxpYyBjbGlja2VkRG9jdW1lbnQgPSBuZXcgRXZlbnRFbWl0dGVyPERvY3VtZW50VHJlZU5vZGU+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgbW92ZURvY3VtZW50ID0gbmV3IEV2ZW50RW1pdHRlcjx7IG5ld0NhdGVnb3J5OiBzdHJpbmcsIGRvY3VtZW50OiBEb2N1bWVudFRyZWVOb2RlIH0+KCk7XG5cbiAgcHVibGljIG5lc3RlZFRyZWVDb250cm9sOiBOZXN0ZWRUcmVlQ29udHJvbDxEb2N1bWVudFRyZWVOb2RlPjtcbiAgcHVibGljIG5lc3RlZERhdGFTb3VyY2U6IERvY3VtZW50VHJlZU5vZGVbXTtcbiAgcHVibGljIGNhdGVnb3JpZXM6IENhc2VGaWxlVmlld0NhdGVnb3J5W10gPSBbXTtcbiAgcHVibGljIGNhdGVnb3JpZXNBbmREb2N1bWVudHNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIHNlbGVjdGVkTm9kZUl0ZW06IERvY3VtZW50VHJlZU5vZGUgfCB1bmRlZmluZWQ7XG5cbiAgcHVibGljIGRvY3VtZW50RmlsdGVyRm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgZG9jdW1lbnRTZWFyY2hGb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gIHB1YmxpYyBkb2N1bWVudFRyZWVEYXRhOiBEb2N1bWVudFRyZWVOb2RlW107XG4gIHB1YmxpYyBkb2N1bWVudEZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgc2VhcmNoVGVybUxlbmd0aDogbnVtYmVyO1xuXG4gIHByaXZhdGUgZ2V0Q2hpbGRyZW4gPSAobm9kZTogRG9jdW1lbnRUcmVlTm9kZSkgPT4gb2Yobm9kZS5jaGlsZHJlbik7XG4gIHB1YmxpYyBuZXN0ZWRDaGlsZHJlbiA9IChfOiBudW1iZXIsIG5vZGVEYXRhOiBEb2N1bWVudFRyZWVOb2RlKSA9PiBub2RlRGF0YS5jaGlsZHJlbjtcbiAgcHVibGljIGdldCBkb2N1bWVudENvdW50KCkge1xuICAgIGlmICh0aGlzLm5lc3RlZERhdGFTb3VyY2U/Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMubmVzdGVkRGF0YVNvdXJjZS5yZWR1Y2UoKGFjYywgaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gYWNjICsgaXRlbS5jaGlsZERvY3VtZW50Q291bnQ7XG4gICAgICB9LCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSB3aW5kb3dTZXJ2aWNlOiBXaW5kb3dTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBkb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlOiBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7XG4gICAgdGhpcy5uZXN0ZWRUcmVlQ29udHJvbCA9IG5ldyBOZXN0ZWRUcmVlQ29udHJvbDxEb2N1bWVudFRyZWVOb2RlPih0aGlzLmdldENoaWxkcmVuKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRvY3VtZW50RmlsdGVyRm9ybUdyb3VwID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuICAgIHRoaXMuZG9jdW1lbnRTZWFyY2hGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gICAgdGhpcy5kb2N1bWVudEZpbHRlckZvcm1Hcm91cC5hZGRDb250cm9sKENhc2VGaWxlVmlld0ZvbGRlckNvbXBvbmVudC5ET0NVTUVOVF9TRUFSQ0hfRk9STV9DT05UUk9MX05BTUUsIHRoaXMuZG9jdW1lbnRTZWFyY2hGb3JtQ29udHJvbCk7XG5cbiAgICAvLyBMaXN0ZW4gdG8gc2VhcmNoIGlucHV0IGFuZCBpbml0aWF0ZSBmaWx0ZXIgZG9jdW1lbnRzIGlmIGF0IGxlYXN0IHRocmVlIGNoYXJhY3RlcnMgZW50ZXJlZFxuICAgIHRoaXMuZG9jdW1lbnRGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLmRvY3VtZW50U2VhcmNoRm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICB0YXAoKHNlYXJjaFRlcm06IHN0cmluZykgPT4gdGhpcy5zZWFyY2hUZXJtTGVuZ3RoID0gc2VhcmNoVGVybS5sZW5ndGgpLFxuICAgICAgc3dpdGNoTWFwKChzZWFyY2hUZXJtOiBzdHJpbmcpID0+IHRoaXMuZmlsdGVyKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkucGlwZSgpKVxuICAgICkuc3Vic2NyaWJlKGRvY3VtZW50VHJlZURhdGEgPT4ge1xuICAgICAgdGhpcy5uZXN0ZWREYXRhU291cmNlID0gZG9jdW1lbnRUcmVlRGF0YTtcbiAgICAgIHRoaXMubmVzdGVkVHJlZUNvbnRyb2wuZGF0YU5vZGVzID0gZG9jdW1lbnRUcmVlRGF0YTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybUxlbmd0aCA+PSBDYXNlRmlsZVZpZXdGb2xkZXJDb21wb25lbnQuTUlOSU1VTV9TRUFSQ0hfQ0hBUkFDVEVSU1xuICAgICAgICA/IHRoaXMubmVzdGVkVHJlZUNvbnRyb2wuZXhwYW5kQWxsKClcbiAgICAgICAgOiB0aGlzLm5lc3RlZFRyZWVDb250cm9sLmNvbGxhcHNlQWxsKCk7XG4gICAgfSk7XG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gdGhlIGlucHV0IGNhdGVnb3JpZXMgYW5kIGRvY3VtZW50cywgYW5kIGdlbmVyYXRlIHRyZWUgZGF0YSBhbmQgaW5pdGlhbGlzZSBjZGsgdHJlZVxuICAgIHRoaXMuY2F0ZWdvcmllc0FuZERvY3VtZW50c1N1YnNjcmlwdGlvbiA9IHRoaXMuY2F0ZWdvcmllc0FuZERvY3VtZW50cy5zdWJzY3JpYmUoY2F0ZWdvcmllc0FuZERvY3VtZW50cyA9PiB7XG4gICAgICBjb25zdCBjYXRlZ29yaWVzID0gY2F0ZWdvcmllc0FuZERvY3VtZW50cy5jYXRlZ29yaWVzO1xuICAgICAgdGhpcy5jYXRlZ29yaWVzID0gY2F0ZWdvcmllcztcbiAgICAgIC8vIEdlbmVyYXRlIGRvY3VtZW50IHRyZWUgZGF0YSBmcm9tIGNhdGVnb3JpZXNcbiAgICAgIHRoaXMuZG9jdW1lbnRUcmVlRGF0YSA9IHRoaXMuZ2VuZXJhdGVUcmVlRGF0YShjYXRlZ29yaWVzKTtcbiAgICAgIC8vIEFwcGVuZCB1bmNhdGVnb3Jpc2VkIGRvY3VtZW50c1xuICAgICAgaWYgKGNhdGVnb3JpZXNBbmREb2N1bWVudHMudW5jYXRlZ29yaXNlZF9kb2N1bWVudHMgJiYgY2F0ZWdvcmllc0FuZERvY3VtZW50cy51bmNhdGVnb3Jpc2VkX2RvY3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHVuY2F0ZWdvcmlzZWREb2N1bWVudHMgPSB0aGlzLmdldFVuY2F0ZWdvcmlzZWREb2N1bWVudHMoY2F0ZWdvcmllc0FuZERvY3VtZW50cy51bmNhdGVnb3Jpc2VkX2RvY3VtZW50cyk7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRUcmVlRGF0YS5wdXNoKHVuY2F0ZWdvcmlzZWREb2N1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWFsaXNlIGNkayB0cmVlIHdpdGggZ2VuZXJhdGVkIGRhdGFcbiAgICAgIHRoaXMubmVzdGVkRGF0YVNvdXJjZSA9IHRoaXMuZG9jdW1lbnRUcmVlRGF0YTtcbiAgICAgIHRoaXMubmVzdGVkVHJlZUNvbnRyb2wuZGF0YU5vZGVzID0gdGhpcy5kb2N1bWVudFRyZWVEYXRhO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdlbmVyYXRlVHJlZURhdGEoY2F0ZWdvcmllczogQ2FzZUZpbGVWaWV3Q2F0ZWdvcnlbXSk6IERvY3VtZW50VHJlZU5vZGVbXSB7XG4gICAgcmV0dXJuIGNhdGVnb3JpZXMucmVkdWNlKCh0cmVlLCBub2RlKSA9PiB7XG4gICAgICBjb25zdCBuZXdEb2N1bWVudFRyZWVOb2RlID0gbmV3IERvY3VtZW50VHJlZU5vZGUoKTtcbiAgICAgIG5ld0RvY3VtZW50VHJlZU5vZGUubmFtZSA9IG5vZGUuY2F0ZWdvcnlfbmFtZTtcbiAgICAgIG5ld0RvY3VtZW50VHJlZU5vZGUudHlwZSA9IERvY3VtZW50VHJlZU5vZGVUeXBlLkZPTERFUjtcbiAgICAgIG5ld0RvY3VtZW50VHJlZU5vZGUuY2hpbGRyZW4gPSBbLi4udGhpcy5nZW5lcmF0ZVRyZWVEYXRhKG5vZGUuc3ViX2NhdGVnb3JpZXMpLCAuLi50aGlzLmdldERvY3VtZW50cyhub2RlLmRvY3VtZW50cyldO1xuXG4gICAgICByZXR1cm4gW1xuICAgICAgICAuLi50cmVlLFxuICAgICAgICBuZXdEb2N1bWVudFRyZWVOb2RlLFxuICAgICAgXTtcbiAgICB9LCBbXSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RG9jdW1lbnRzKGRvY3VtZW50czogQ2FzZUZpbGVWaWV3RG9jdW1lbnRbXSk6IERvY3VtZW50VHJlZU5vZGVbXSB7XG4gICAgY29uc3QgZG9jdW1lbnRzVG9SZXR1cm46IERvY3VtZW50VHJlZU5vZGVbXSA9IFtdO1xuICAgIGRvY3VtZW50cy5mb3JFYWNoKGRvY3VtZW50ID0+IHtcbiAgICAgIGNvbnN0IGRvY3VtZW50VHJlZU5vZGUgPSBuZXcgRG9jdW1lbnRUcmVlTm9kZSgpO1xuICAgICAgZG9jdW1lbnRUcmVlTm9kZS5uYW1lID0gZG9jdW1lbnQuZG9jdW1lbnRfZmlsZW5hbWU7XG4gICAgICBkb2N1bWVudFRyZWVOb2RlLnR5cGUgPSBEb2N1bWVudFRyZWVOb2RlVHlwZS5ET0NVTUVOVDtcbiAgICAgIGRvY3VtZW50VHJlZU5vZGUuZG9jdW1lbnRfZmlsZW5hbWUgPSBkb2N1bWVudC5kb2N1bWVudF9maWxlbmFtZTtcbiAgICAgIGRvY3VtZW50VHJlZU5vZGUuZG9jdW1lbnRfYmluYXJ5X3VybCA9IGRvY3VtZW50LmRvY3VtZW50X2JpbmFyeV91cmw7XG4gICAgICBkb2N1bWVudFRyZWVOb2RlLmF0dHJpYnV0ZV9wYXRoID0gZG9jdW1lbnQuYXR0cmlidXRlX3BhdGg7XG5cbiAgICAgIGRvY3VtZW50c1RvUmV0dXJuLnB1c2goZG9jdW1lbnRUcmVlTm9kZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZG9jdW1lbnRzVG9SZXR1cm47XG4gIH1cblxuICBwdWJsaWMgZ2V0VW5jYXRlZ29yaXNlZERvY3VtZW50cyh1bmNhdGVnb3Jpc2VkRG9jdW1lbnRzOiBDYXNlRmlsZVZpZXdEb2N1bWVudFtdKTogRG9jdW1lbnRUcmVlTm9kZSB7XG4gICAgY29uc3QgZG9jdW1lbnRzOiBEb2N1bWVudFRyZWVOb2RlW10gPSBbXTtcbiAgICB1bmNhdGVnb3Jpc2VkRG9jdW1lbnRzLmZvckVhY2goZG9jdW1lbnQgPT4ge1xuICAgICAgY29uc3QgZG9jdW1lbnRUcmVlTm9kZSA9IG5ldyBEb2N1bWVudFRyZWVOb2RlKCk7XG4gICAgICBkb2N1bWVudFRyZWVOb2RlLm5hbWUgPSBkb2N1bWVudC5kb2N1bWVudF9maWxlbmFtZTtcbiAgICAgIGRvY3VtZW50VHJlZU5vZGUudHlwZSA9IERvY3VtZW50VHJlZU5vZGVUeXBlLkRPQ1VNRU5UO1xuICAgICAgZG9jdW1lbnRUcmVlTm9kZS5kb2N1bWVudF9maWxlbmFtZSA9IGRvY3VtZW50LmRvY3VtZW50X2ZpbGVuYW1lO1xuICAgICAgZG9jdW1lbnRUcmVlTm9kZS5kb2N1bWVudF9iaW5hcnlfdXJsID0gZG9jdW1lbnQuZG9jdW1lbnRfYmluYXJ5X3VybDtcbiAgICAgIGRvY3VtZW50VHJlZU5vZGUuYXR0cmlidXRlX3BhdGggPSBkb2N1bWVudC5hdHRyaWJ1dGVfcGF0aDtcblxuICAgICAgZG9jdW1lbnRzLnB1c2goZG9jdW1lbnRUcmVlTm9kZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB1bmNhdGVnb3Jpc2VkTm9kZSA9IG5ldyBEb2N1bWVudFRyZWVOb2RlKCk7XG4gICAgdW5jYXRlZ29yaXNlZE5vZGUubmFtZSA9IENhc2VGaWxlVmlld0ZvbGRlckNvbXBvbmVudC5VTkNBVEVHT1JJU0VEX0RPQ1VNRU5UU19USVRMRTtcbiAgICB1bmNhdGVnb3Jpc2VkTm9kZS50eXBlID0gRG9jdW1lbnRUcmVlTm9kZVR5cGUuRk9MREVSO1xuICAgIHVuY2F0ZWdvcmlzZWROb2RlLmNoaWxkcmVuID0gZG9jdW1lbnRzO1xuXG4gICAgcmV0dXJuIHVuY2F0ZWdvcmlzZWROb2RlO1xuICB9XG5cbiAgcHVibGljIGZpbHRlcihzZWFyY2hUZXJtOiBzdHJpbmcpOiBPYnNlcnZhYmxlPERvY3VtZW50VHJlZU5vZGVbXT4ge1xuICAgIC8vIE1ha2UgYSBjb3B5IG9mIHRoZSBkYXRhIHNvIHdlIGRvIG5vdCBtdXRhdGUgdGhlIG9yaWdpbmFsXG4gICAgZnVuY3Rpb24gY29weShub2RlOiBEb2N1bWVudFRyZWVOb2RlKSB7XG4gICAgICBjb25zdCBkb2N1bWVudFRyZWVOb2RlID0gbmV3IERvY3VtZW50VHJlZU5vZGUoKTtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGRvY3VtZW50VHJlZU5vZGUsIG5vZGUpO1xuICAgIH1cblxuICAgIGxldCBmaWx0ZXJlZERhdGEgPSB0aGlzLmRvY3VtZW50VHJlZURhdGE7XG4gICAgaWYgKHNlYXJjaFRlcm0gJiYgc2VhcmNoVGVybS5sZW5ndGggPj0gQ2FzZUZpbGVWaWV3Rm9sZGVyQ29tcG9uZW50Lk1JTklNVU1fU0VBUkNIX0NIQVJBQ1RFUlMgJiYgdGhpcy5kb2N1bWVudEZpbHRlckZvcm1Hcm91cC5jb250cm9sc1tDYXNlRmlsZVZpZXdGb2xkZXJDb21wb25lbnQuRE9DVU1FTlRfU0VBUkNIX0ZPUk1fQ09OVFJPTF9OQU1FXS52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBmaWx0ZXJlZERhdGEgPSB0aGlzLmRvY3VtZW50VHJlZURhdGEubWFwKGNvcHkpLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJUcmVlRGF0YShub2RlOiBEb2N1bWVudFRyZWVOb2RlKSB7XG4gICAgICAgIGlmIChub2RlLm5hbWUgJiYgbm9kZS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkgJiYgbm9kZS50eXBlID09PSBEb2N1bWVudFRyZWVOb2RlVHlwZS5ET0NVTUVOVCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbGwgcmVjdXJzaXZlbHkgaWYgbm9kZSBoYXMgY2hpbGRyZW5cbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICByZXR1cm4gKG5vZGUuY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuLm1hcChjb3B5KS5maWx0ZXIoZmlsdGVyVHJlZURhdGEpKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb2YoZmlsdGVyZWREYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyB0cmlnZ2VyRG9jdW1lbnRBY3Rpb24oXG4gICAgYWN0aW9uVHlwZTogJ2NoYW5nZUZvbGRlcicgfCAnb3BlbkluQU5ld1RhYicgfCAnZG93bmxvYWQnIHwgJ3ByaW50JyxcbiAgICBkb2N1bWVudFRyZWVOb2RlOiBEb2N1bWVudFRyZWVOb2RlXG4gICk6IHZvaWQge1xuICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xuICAgICAgY2FzZSAoJ2NoYW5nZUZvbGRlcicpOlxuICAgICAgICB0aGlzLm9wZW5Nb3ZlRGlhbG9nKGRvY3VtZW50VHJlZU5vZGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKCdvcGVuSW5BTmV3VGFiJyk6XG4gICAgICAgIHRoaXMud2luZG93U2VydmljZS5zZXRMb2NhbFN0b3JhZ2UoTUVESUFfVklFV0VSX0xPQ0FMU1RPUkFHRV9LRVksXG4gICAgICAgICAgdGhpcy5kb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlLmdldE1lZGlhVmlld2VySW5mbyh7XG4gICAgICAgICAgICBkb2N1bWVudF9iaW5hcnlfdXJsOiBkb2N1bWVudFRyZWVOb2RlLmRvY3VtZW50X2JpbmFyeV91cmwsXG4gICAgICAgICAgICBkb2N1bWVudF9maWxlbmFtZTogZG9jdW1lbnRUcmVlTm9kZS5kb2N1bWVudF9maWxlbmFtZVxuICAgICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLndpbmRvd1NlcnZpY2Uub3Blbk9uTmV3VGFiKFxuICAgICAgICAgIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUoWycvbWVkaWEtdmlld2VyJ10pPy50b1N0cmluZygpXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAoJ2Rvd25sb2FkJyk6XG4gICAgICAgIC8vIENyZWF0ZSBhIFVSTCBmcm9tIHRoZSBkb2N1bWVudF9iaW5hcnlfdXJsIHByb3BlcnR5IChhYnNvbHV0ZSBVUkwpIGFuZCB1c2UgdGhlIHBhdGggcG9ydGlvbiAocmVsYXRpdmUgVVJMKS5cbiAgICAgICAgLy8gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSB0aGUgTWFuYWdlIENhc2VzIGFwcGxpY2F0aW9uIHdpbGwgYXV0b21hdGljYWxseSBhcHBseSBhIHByb3h5IHRvIHRoZSByZXF1ZXN0LCB3aXRoXG4gICAgICAgIC8vIHRoZSBjb3JyZWN0IHJlbW90ZSBlbmRwb2ludFxuICAgICAgICB0aGlzLmRvd25sb2FkRmlsZShuZXcgVVJMKGRvY3VtZW50VHJlZU5vZGUuZG9jdW1lbnRfYmluYXJ5X3VybCkucGF0aG5hbWUsIGRvY3VtZW50VHJlZU5vZGUuZG9jdW1lbnRfZmlsZW5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKCdwcmludCcpOlxuICAgICAgICB0aGlzLnByaW50RG9jdW1lbnQobmV3IFVSTChkb2N1bWVudFRyZWVOb2RlLmRvY3VtZW50X2JpbmFyeV91cmwpLnBhdGhuYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNvcnREYXRhU291cmNlQXNjQWxwaGFiZXRpY2FsbHkoKSB7XG4gICAgY29uc3Qgc29ydGVkRGF0YSA9IHRoaXMubmVzdGVkRGF0YVNvdXJjZS5tYXAoaXRlbSA9PiB7XG4gICAgICBpdGVtLnNvcnRDaGlsZHJlbkFzY2VuZGluZygpO1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZU5vZGVEYXRhKHNvcnRlZERhdGEpO1xuICB9XG5cbiAgcHVibGljIHNvcnREYXRhU291cmNlRGVzY0FscGhhYmV0aWNhbGx5KCkge1xuICAgIGNvbnN0IHNvcnRlZERhdGEgPSB0aGlzLm5lc3RlZERhdGFTb3VyY2UubWFwKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5zb3J0Q2hpbGRyZW5EZXNjZW5kaW5nKCk7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlTm9kZURhdGEoc29ydGVkRGF0YSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTm9kZURhdGEoZGF0YTogRG9jdW1lbnRUcmVlTm9kZVtdKTogdm9pZCB7XG4gICAgY29uc3QgcHJldlNlbGVjdGVkID0gdGhpcy5uZXN0ZWRUcmVlQ29udHJvbC5leHBhbnNpb25Nb2RlbC5zZWxlY3RlZC5tYXAoXG4gICAgICAoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLm5lc3RlZFRyZWVDb250cm9sLmNvbGxhcHNlQWxsKCk7XG4gICAgdGhpcy5uZXN0ZWREYXRhU291cmNlID0gZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IG5ld0RvY3VtZW50VHJlZU5vZGUgPSBuZXcgRG9jdW1lbnRUcmVlTm9kZSgpO1xuICAgICAgbmV3RG9jdW1lbnRUcmVlTm9kZS5uYW1lID0gaXRlbS5uYW1lO1xuICAgICAgbmV3RG9jdW1lbnRUcmVlTm9kZS50eXBlID0gaXRlbS50eXBlO1xuICAgICAgbmV3RG9jdW1lbnRUcmVlTm9kZS5jaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW47XG5cbiAgICAgIHJldHVybiBuZXdEb2N1bWVudFRyZWVOb2RlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZmxhdHRlbmVkQXJyYXkgPSB0aGlzLm5lc3RlZERhdGFTb3VyY2UubWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5mbGF0dGVuZWRBbGw7XG4gICAgfSkuZmxhdCgpO1xuICAgIGNvbnN0IG5ld09iamVjdHMgPSBmbGF0dGVuZWRBcnJheS5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBwcmV2U2VsZWN0ZWQuaW5jbHVkZXMoaXRlbS5uYW1lKTtcbiAgICB9KTtcbiAgICBuZXdPYmplY3RzLmZvckVhY2gob2JqZWN0ID0+IHRoaXMubmVzdGVkVHJlZUNvbnRyb2wuZXhwYW5kKG9iamVjdCkpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2F0ZWdvcmllc0FuZERvY3VtZW50c1N1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmRvY3VtZW50RmlsdGVyU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuTW92ZURpYWxvZyhub2RlOiBEb2N1bWVudFRyZWVOb2RlKTogdm9pZCB7XG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDYXNlRmlsZVZpZXdGb2xkZXJTZWxlY3RvckNvbXBvbmVudCwge1xuICAgICAgZGF0YTogeyBjYXRlZ29yaWVzOiB0aGlzLmNhdGVnb3JpZXMsIGRvY3VtZW50OiBub2RlIH1cbiAgICB9KTtcblxuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShuZXdDYXRJZCA9PiB7XG4gICAgICBpZiAobmV3Q2F0SWQpIHtcbiAgICAgICAgdGhpcy5tb3ZlRG9jdW1lbnQuZW1pdCh7IG5ld0NhdGVnb3J5OiBuZXdDYXRJZCwgZG9jdW1lbnQ6IG5vZGUgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcHJpbnREb2N1bWVudCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHByaW50V2luZG93ID0gd2luZG93Lm9wZW4odXJsKTtcbiAgICBwcmludFdpbmRvdy5wcmludCgpO1xuICB9XG5cbiAgcHVibGljIGRvd25sb2FkRmlsZSh1cmw6IHN0cmluZywgZG93bmxvYWRGaWxlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lJyk7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBkb3dubG9hZEZpbGVOYW1lO1xuICAgIGEuY2xpY2soKTtcbiAgICBhLnJlbW92ZSgpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZG9jdW1lbnQtZmlsdGVyLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBkb2N1bWVudC1maWx0ZXJcIiBbZm9ybUdyb3VwXT1cImRvY3VtZW50RmlsdGVyRm9ybUdyb3VwXCI+XG4gICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGRvY3VtZW50LXNlYXJjaFwiXG4gICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgIGlkPVwiZG9jdW1lbnQtc2VhcmNoXCJcbiAgICAgIG5hbWU9XCJkb2N1bWVudFNlYXJjaEZvcm1Db250cm9sXCJcbiAgICAgIGZvcm1Db250cm9sTmFtZT1cImRvY3VtZW50U2VhcmNoRm9ybUNvbnRyb2xcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYnkgZG9jdW1lbnQgbmFtZVwiPlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiZG9jdW1lbnQtZm9sZGVycy1oZWFkZXJcIj5cbiAgPGRpdiBjbGFzcz1cImRvY3VtZW50LWZvbGRlcnMtaGVhZGVyX190aXRsZVwiPkRvY3VtZW50cyAoe3sgZG9jdW1lbnRDb3VudCB9fSk8L2Rpdj5cbiAgPGRpdj5cbiAgICA8Y2NkLWNhc2UtZmlsZS12aWV3LWZvbGRlci1zb3J0XG4gICAgICAoc29ydEFzY2VuZGluZyk9XCJzb3J0RGF0YVNvdXJjZUFzY0FscGhhYmV0aWNhbGx5KClcIlxuICAgICAgKHNvcnREZXNjZW5kaW5nKT1cInNvcnREYXRhU291cmNlRGVzY0FscGhhYmV0aWNhbGx5KClcIlxuICAgID48L2NjZC1jYXNlLWZpbGUtdmlldy1mb2xkZXItc29ydD5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cImRvY3VtZW50LXRyZWUtY29udGFpbmVyXCIgKm5nSWY9XCJkb2N1bWVudFRyZWVEYXRhXCI+XG4gIDxkaXYgKm5nSWY9XCIhbmVzdGVkRGF0YVNvdXJjZSB8fCBuZXN0ZWREYXRhU291cmNlLmxlbmd0aCA9PT0gMFwiPlxuICAgIE5vIHJlc3VsdHMgZm91bmRcbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPGNkay10cmVlIFtkYXRhU291cmNlXT1cIm5lc3RlZERhdGFTb3VyY2VcIiBbdHJlZUNvbnRyb2xdPVwibmVzdGVkVHJlZUNvbnRyb2xcIj5cbiAgICAgIDwhLS0gZG9jdW1lbnQgLS0+XG4gICAgICA8Y2RrLW5lc3RlZC10cmVlLW5vZGUgY2xhc3M9XCJkb2N1bWVudC10cmVlLWNvbnRhaW5lcl9fbm9kZSBkb2N1bWVudC10cmVlLWNvbnRhaW5lcl9fbm9kZS0tZG9jdW1lbnRcIiAqY2RrVHJlZU5vZGVEZWY9XCJsZXQgbm9kZVwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwibm9kZVwiIChjbGljayk9XCJzZWxlY3RlZE5vZGVJdGVtID0gbm9kZTsgY2xpY2tlZERvY3VtZW50LmVtaXQobm9kZSlcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5ub2RlLS1zZWxlY3RlZF09XCJzZWxlY3RlZE5vZGVJdGVtPy5uYW1lID09PSBub2RlLm5hbWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm9kZV9faWNvblwiIGRpc2FibGVkPlxuICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9jYXNlLWZpbGUtdmlldy9jYXNlLWZpbGUtdmlldy1kb2N1bWVudC5zdmdcIiBjbGFzcz1cIm5vZGVfX2ljb25JbWdcIiBhbHQ9XCJEb2N1bWVudCBpY29uXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJub2RlX19uYW1lIG5vZGUtbmFtZS1kb2N1bWVudFwiPnt7bm9kZS5uYW1lfX08L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vZGVfX2RvY3VtZW50LW9wdGlvbnNcIj5cbiAgICAgICAgICAgIDxjY2QtY2FzZS1maWxlLXZpZXctZm9sZGVyLWRvY3VtZW50LWFjdGlvbnNcbiAgICAgICAgICAgICAgKGNoYW5nZUZvbGRlckFjdGlvbik9XCJ0cmlnZ2VyRG9jdW1lbnRBY3Rpb24oJ2NoYW5nZUZvbGRlcicsIG5vZGUpXCJcbiAgICAgICAgICAgICAgKG9wZW5JbkFOZXdUYWJBY3Rpb24pPVwidHJpZ2dlckRvY3VtZW50QWN0aW9uKCdvcGVuSW5BTmV3VGFiJywgbm9kZSlcIlxuICAgICAgICAgICAgICAoZG93bmxvYWRBY3Rpb24pPVwidHJpZ2dlckRvY3VtZW50QWN0aW9uKCdkb3dubG9hZCcsIG5vZGUpXCJcbiAgICAgICAgICAgICAgKHByaW50QWN0aW9uKT1cInRyaWdnZXJEb2N1bWVudEFjdGlvbigncHJpbnQnLCBub2RlKVwiXG4gICAgICAgICAgICAgIFthbGxvd01vdmluZ109XCJhbGxvd01vdmluZ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L2NjZC1jYXNlLWZpbGUtdmlldy1mb2xkZXItZG9jdW1lbnQtYWN0aW9ucz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Nkay1uZXN0ZWQtdHJlZS1ub2RlPlxuICAgICAgPCEtLSBmb2xkZXItLT5cbiAgICAgIDxjZGstbmVzdGVkLXRyZWUtbm9kZSBjbGFzcz1cImRvY3VtZW50LXRyZWUtY29udGFpbmVyX19ub2RlIGRvY3VtZW50LXRyZWUtY29udGFpbmVyX19mb2xkZXJcIiAqY2RrVHJlZU5vZGVEZWY9XCJsZXQgbm9kZTsgd2hlbjogbmVzdGVkQ2hpbGRyZW5cIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm5vZGVcIiBjZGtUcmVlTm9kZVRvZ2dsZT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm9kZV9faWNvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwiJ3RvZ2dsZSAnICsgbm9kZS5uYW1lXCIgPlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cIm5vZGVfX2ljb25JbWdcIlxuICAgICAgICAgICAgICAgICBbc3JjXT1cIm5lc3RlZFRyZWVDb250cm9sLmlzRXhwYW5kZWQobm9kZSkgPyAnL2Fzc2V0cy9pbWFnZXMvZm9sZGVyLW9wZW4ucG5nJyA6ICcvYXNzZXRzL2ltYWdlcy9mb2xkZXIucG5nJ1wiIGFsdD1cIkZvbGRlciBpY29uXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5vZGVfX2NvdW50XCI+e3tub2RlLmNoaWxkRG9jdW1lbnRDb3VudH19PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibm9kZV9fbmFtZSBub2RlX19uYW1lLS1mb2xkZXJcIj57e25vZGUubmFtZX19PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8ZGl2IFtjbGFzcy5kb2N1bWVudC10cmVlLWludmlzaWJsZV09XCIhbmVzdGVkVHJlZUNvbnRyb2wuaXNFeHBhbmRlZChub2RlKVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgY2RrVHJlZU5vZGVPdXRsZXQ+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9jZGstbmVzdGVkLXRyZWUtbm9kZT5cbiAgICA8L2Nkay10cmVlPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19