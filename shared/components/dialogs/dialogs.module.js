"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var document_dialog_1 = require("./document-dialog");
var delete_or_cancel_dialog_1 = require("./delete-or-cancel-dialog");
var save_or_discard_dialog_1 = require("./save-or-discard-dialog");
var remove_dialog_1 = require("./remove-dialog");
var DialogsModule = /** @class */ (function () {
    function DialogsModule() {
    }
    DialogsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                document_dialog_1.DocumentDialogComponent,
                delete_or_cancel_dialog_1.DeleteOrCancelDialogComponent,
                save_or_discard_dialog_1.SaveOrDiscardDialogComponent,
                remove_dialog_1.RemoveDialogComponent,
            ],
            entryComponents: [
                document_dialog_1.DocumentDialogComponent,
                delete_or_cancel_dialog_1.DeleteOrCancelDialogComponent,
                save_or_discard_dialog_1.SaveOrDiscardDialogComponent,
                remove_dialog_1.RemoveDialogComponent,
            ],
            exports: [
                document_dialog_1.DocumentDialogComponent,
                delete_or_cancel_dialog_1.DeleteOrCancelDialogComponent,
                save_or_discard_dialog_1.SaveOrDiscardDialogComponent,
                remove_dialog_1.RemoveDialogComponent,
            ]
        })
    ], DialogsModule);
    return DialogsModule;
}());
exports.DialogsModule = DialogsModule;
//# sourceMappingURL=dialogs.module.js.map