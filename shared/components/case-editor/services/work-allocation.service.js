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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var app_config_1 = require("../../../../app.config");
var services_1 = require("../../../services");
exports.MULTIPLE_TASKS_FOUND = 'More than one task found!';
var WorkAllocationService = /** @class */ (function () {
    function WorkAllocationService(http, appConfig, errorService, alertService) {
        this.http = http;
        this.appConfig = appConfig;
        this.errorService = errorService;
        this.alertService = alertService;
    }
    WorkAllocationService_1 = WorkAllocationService;
    /**
     * Call the API to get tasks matching the search criteria.
     * @param searchRequest The search parameters that specify which tasks to match.
     */
    WorkAllocationService.prototype.searchTasks = function (searchRequest) {
        var _this = this;
        var url = this.appConfig.getWorkAllocationApiUrl() + "/searchForCompletable";
        return this.http
            .post(url, { searchRequest: searchRequest }, null, false)
            .pipe(operators_1.map(function (response) { return response; }), operators_1.catchError(function (error) {
            _this.errorService.setError(error);
            // explicitly eat away 401 error and 400 error
            if (error && error.status && (error.status === 401 || error.status === 400)) {
                // do nothing
                console.log('error status 401 or 400', error);
            }
            else {
                return rxjs_1.throwError(error);
            }
        }));
    };
    /**
     * Call the API to complete a task.
     * @param taskId specifies which task should be completed.
     */
    WorkAllocationService.prototype.completeTask = function (taskId) {
        var _this = this;
        var url = this.appConfig.getWorkAllocationApiUrl() + "/task/" + taskId + "/complete";
        return this.http
            .post(url, {})
            .pipe(operators_1.catchError(function (error) {
            _this.errorService.setError(error);
            // this will subscribe to get the user details and decide whether to display an error message
            _this.http.get(_this.appConfig.getUserInfoApiUrl()).map(function (response) { return response; }).subscribe(function (response) {
                _this.handleTaskCompletionError(response);
            });
            return rxjs_1.throwError(error);
        }));
    };
    /**
     * Handles the response from the observable to get the user details when task is completed.
     * @param response is the response given from the observable which contains the user detaild.
     */
    WorkAllocationService.prototype.handleTaskCompletionError = function (response) {
        var userDetails = response;
        if (this.userIsCaseworker(userDetails.userInfo.roles)) {
            // when submitting the completion of task if not yet rendered cases/case confirm then preserve the alert for re-rendering
            this.alertService.setPreserveAlerts(true, ['cases/case', 'submit']);
            this.alertService.warning('A task could not be completed successfully. Please complete the task associated with the case manually.');
        }
    };
    /**
     * Returns true if the user's role is equivalent to a caseworker.
     * @param roles is the list of roles found from the current user.
     */
    WorkAllocationService.prototype.userIsCaseworker = function (roles) {
        var lowerCaseRoles = roles.map(function (role) { return role.toLowerCase(); });
        // When/if lib & target permanently change to es2016, replace indexOf with includes
        return (lowerCaseRoles.indexOf(WorkAllocationService_1.IACCaseOfficer) !== -1)
            || (lowerCaseRoles.indexOf(WorkAllocationService_1.IACAdmOfficer) !== -1);
    };
    /**
     * Look for open tasks for a case and event combination. There are 5 possible scenarios:
     *   1. No tasks found                              => Success.
     *   2. One task found => Mark as done              => Success.
     *   3. One task found => Mark as done throws error => Failure.
     *   4. More than one task found                    => Failure.
     *   5. Search call throws an error                 => Failure.
     * @param ccdId The ID of the case to find tasks for.
     * @param eventId The ID of the event to find tasks for.
     */
    WorkAllocationService.prototype.completeAppropriateTask = function (ccdId, eventId, jurisdiction, caseTypeId) {
        var _this = this;
        var taskSearchParameter = {
            ccdId: ccdId,
            eventId: eventId,
            jurisdiction: jurisdiction,
            caseTypeId: caseTypeId
        };
        return this.searchTasks(taskSearchParameter)
            .pipe(operators_1.map(function (response) {
            var tasks = response.tasks;
            if (tasks && tasks.length > 0) {
                if (tasks.length === 1) {
                    _this.completeTask(tasks[0].id).subscribe();
                }
                else {
                    // This is a problem. Throw an appropriate error.
                    throw new Error(exports.MULTIPLE_TASKS_FOUND);
                }
            }
            return true; // All good. Nothing to see here.
        }), operators_1.catchError(function (error) {
            // Simply rethrow it.
            return rxjs_1.throwError(error);
        }));
    };
    var WorkAllocationService_1;
    WorkAllocationService.IACCaseOfficer = 'caseworker-ia-caseofficer';
    WorkAllocationService.IACAdmOfficer = 'caseworker-ia-admofficer';
    WorkAllocationService = WorkAllocationService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [services_1.HttpService,
            app_config_1.AbstractAppConfig,
            services_1.HttpErrorService,
            services_1.AlertService])
    ], WorkAllocationService);
    return WorkAllocationService;
}());
exports.WorkAllocationService = WorkAllocationService;
//# sourceMappingURL=work-allocation.service.js.map