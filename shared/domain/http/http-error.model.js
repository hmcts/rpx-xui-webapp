"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpError = /** @class */ (function () {
    function HttpError() {
        this.timestamp = new Date().toISOString();
        this.error = HttpError.DEFAULT_ERROR;
        this.message = HttpError.DEFAULT_MESSAGE;
        this.status = HttpError.DEFAULT_STATUS;
        this.exception = null;
        this.path = null;
        this.details = null;
        this.callbackErrors = null;
        this.callbackWarnings = null;
    }
    HttpError.from = function (response) {
        var error = new HttpError();
        // Check that the HttpErrorResponse contains an "error" object before mapping the error properties
        if (!!(response && response.error)) {
            Object.keys(error).forEach(function (key) {
                error[key] = response.error.hasOwnProperty(key) && response.error[key] ? response.error[key] : error[key];
            });
        }
        return error;
    };
    HttpError.DEFAULT_ERROR = 'Unknown error';
    HttpError.DEFAULT_MESSAGE = 'Something unexpected happened, our technical staff have been automatically notified';
    HttpError.DEFAULT_STATUS = 500;
    return HttpError;
}());
exports.HttpError = HttpError;
//# sourceMappingURL=http-error.model.js.map