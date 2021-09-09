"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var file_upload_state_service_1 = require("./file-upload-state.service");
var services_1 = require("../../../services");
var FileUploadProgressGuard = /** @class */ (function () {
    function FileUploadProgressGuard(fileUploadStateService, windowService) {
        this.fileUploadStateService = fileUploadStateService;
        this.windowService = windowService;
    }
    FileUploadProgressGuard_1 = FileUploadProgressGuard;
    FileUploadProgressGuard.prototype.canDeactivate = function () {
        if (this.fileUploadStateService.isUploadInProgress()) {
            var userDecision = !this.windowService.confirm(FileUploadProgressGuard_1.CONFIRM_MESSAGE);
            if (userDecision) {
                this.fileUploadStateService.setUploadInProgress(false);
            }
            return userDecision;
        }
        return true;
    };
    var FileUploadProgressGuard_1;
    FileUploadProgressGuard.CONFIRM_MESSAGE = 'File upload in progress. Press “Cancel” to cancel the upload. Press “Ok” to continue the document upload.';
    FileUploadProgressGuard = FileUploadProgressGuard_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [file_upload_state_service_1.FileUploadStateService,
            services_1.WindowService])
    ], FileUploadProgressGuard);
    return FileUploadProgressGuard;
}());
exports.FileUploadProgressGuard = FileUploadProgressGuard;
//# sourceMappingURL=file-upload-progress.guard.js.map