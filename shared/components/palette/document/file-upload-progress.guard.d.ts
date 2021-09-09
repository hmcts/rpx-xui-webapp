import { CanDeactivate } from '@angular/router';
import { FileUploadStateService } from './file-upload-state.service';
import { WindowService } from '../../../services';
export declare class FileUploadProgressGuard implements CanDeactivate<any> {
    private fileUploadStateService;
    private windowService;
    static readonly CONFIRM_MESSAGE = "File upload in progress. Press \u201CCancel\u201D to cancel the upload. Press \u201COk\u201D to continue the document upload.";
    constructor(fileUploadStateService: FileUploadStateService, windowService: WindowService);
    canDeactivate(): boolean;
}
