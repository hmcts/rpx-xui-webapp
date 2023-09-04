import { Injectable } from '@angular/core';
import { WindowService } from '../../../services/window/window.service';
import { FileUploadStateService } from './file-upload-state.service';
import * as i0 from "@angular/core";
import * as i1 from "./file-upload-state.service";
import * as i2 from "../../../services/window/window.service";
export class FileUploadProgressGuard {
    constructor(fileUploadStateService, windowService) {
        this.fileUploadStateService = fileUploadStateService;
        this.windowService = windowService;
    }
    canDeactivate() {
        if (this.fileUploadStateService.isUploadInProgress()) {
            const userDecision = !this.windowService.confirm(FileUploadProgressGuard.CONFIRM_MESSAGE);
            if (userDecision) {
                this.fileUploadStateService.setUploadInProgress(false);
            }
            return userDecision;
        }
        return true;
    }
}
FileUploadProgressGuard.CONFIRM_MESSAGE = 'File upload in progress. Press “Cancel” to cancel the upload. Press “Ok” to continue the document upload.';
FileUploadProgressGuard.ɵfac = function FileUploadProgressGuard_Factory(t) { return new (t || FileUploadProgressGuard)(i0.ɵɵinject(i1.FileUploadStateService), i0.ɵɵinject(i2.WindowService)); };
FileUploadProgressGuard.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FileUploadProgressGuard, factory: FileUploadProgressGuard.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FileUploadProgressGuard, [{
        type: Injectable
    }], function () { return [{ type: i1.FileUploadStateService }, { type: i2.WindowService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQtcHJvZ3Jlc3MuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9kb2N1bWVudC9maWxlLXVwbG9hZC1wcm9ncmVzcy5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7OztBQUdyRSxNQUFNLE9BQU8sdUJBQXVCO0lBSWhDLFlBQ3FCLHNCQUE4QyxFQUM5QyxhQUE0QjtRQUQ1QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQzlDLENBQUM7SUFFRyxhQUFhO1FBQ2hCLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDbEQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxRixJQUFJLFlBQVksRUFBRTtnQkFDZCxJQUFJLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUQ7WUFDRCxPQUFPLFlBQVksQ0FBQztTQUN2QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O0FBaEJzQix1Q0FBZSxHQUFHLDJHQUEyRyxDQUFDOzhGQUY1SSx1QkFBdUI7NkVBQXZCLHVCQUF1QixXQUF2Qix1QkFBdUI7dUZBQXZCLHVCQUF1QjtjQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGVhY3RpdmF0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBXaW5kb3dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvd2luZG93L3dpbmRvdy5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVVcGxvYWRTdGF0ZVNlcnZpY2UgfSBmcm9tICcuL2ZpbGUtdXBsb2FkLXN0YXRlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZFByb2dyZXNzR3VhcmQgaW1wbGVtZW50cyBDYW5EZWFjdGl2YXRlPGFueT4ge1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT05GSVJNX01FU1NBR0UgPSAnRmlsZSB1cGxvYWQgaW4gcHJvZ3Jlc3MuIFByZXNzIOKAnENhbmNlbOKAnSB0byBjYW5jZWwgdGhlIHVwbG9hZC4gUHJlc3Mg4oCcT2vigJ0gdG8gY29udGludWUgdGhlIGRvY3VtZW50IHVwbG9hZC4nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZmlsZVVwbG9hZFN0YXRlU2VydmljZTogRmlsZVVwbG9hZFN0YXRlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB3aW5kb3dTZXJ2aWNlOiBXaW5kb3dTZXJ2aWNlXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGNhbkRlYWN0aXZhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVVcGxvYWRTdGF0ZVNlcnZpY2UuaXNVcGxvYWRJblByb2dyZXNzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJEZWNpc2lvbiA9ICF0aGlzLndpbmRvd1NlcnZpY2UuY29uZmlybShGaWxlVXBsb2FkUHJvZ3Jlc3NHdWFyZC5DT05GSVJNX01FU1NBR0UpO1xuICAgICAgICAgICAgaWYgKHVzZXJEZWNpc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZFN0YXRlU2VydmljZS5zZXRVcGxvYWRJblByb2dyZXNzKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1c2VyRGVjaXNpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG4iXX0=