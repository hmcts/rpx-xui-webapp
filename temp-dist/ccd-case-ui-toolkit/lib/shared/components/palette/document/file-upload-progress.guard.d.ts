import { CanDeactivate } from '@angular/router';
import { WindowService } from '../../../services/window/window.service';
import { FileUploadStateService } from './file-upload-state.service';
import * as i0 from "@angular/core";
export declare class FileUploadProgressGuard implements CanDeactivate<any> {
    private readonly fileUploadStateService;
    private readonly windowService;
    static readonly CONFIRM_MESSAGE = "File upload in progress. Press \u201CCancel\u201D to cancel the upload. Press \u201COk\u201D to continue the document upload.";
    constructor(fileUploadStateService: FileUploadStateService, windowService: WindowService);
    canDeactivate(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileUploadProgressGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FileUploadProgressGuard>;
}
//# sourceMappingURL=file-upload-progress.guard.d.ts.map