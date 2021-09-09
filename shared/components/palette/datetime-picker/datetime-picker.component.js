"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var datetime_picker_1 = require("@angular-material-components/datetime-picker");
var abstract_form_field_component_1 = require("../base-field/abstract-form-field.component");
var datetime_picker_utils_1 = require("./datetime-picker-utils");
var format_translator_service_1 = require("../../../services/case-fields/format-translator.service");
var moment = require("moment/moment");
var ɵ0 = datetime_picker_utils_1.CUSTOM_MOMENT_FORMATS;
exports.ɵ0 = ɵ0;
var DatetimePickerComponent = /** @class */ (function (_super) {
    __extends(DatetimePickerComponent, _super);
    function DatetimePickerComponent(formatTranslationService, ngxMatDateFormats) {
        var _this = _super.call(this) || this;
        _this.formatTranslationService = formatTranslationService;
        _this.ngxMatDateFormats = ngxMatDateFormats;
        _this.showSpinners = true;
        _this.showSeconds = false;
        _this.touchUi = false;
        _this.enableMeridian = false;
        _this.stepHour = 1;
        _this.stepMinute = 1;
        _this.stepSecond = 1;
        _this.color = 'primary';
        _this.disableMinute = true;
        _this.hideTime = true;
        _this.hideMinutes = true;
        _this.startView = 'month';
        _this.yearSelection = false;
        _this.checkTime = true;
        _this.stringEdited = false;
        _this.minimumDate = new Date('01/01/1800');
        _this.maximumDate = null;
        _this.minError = false;
        _this.maxError = false;
        _this.dateControl = new forms_1.FormControl(new Date());
        _this.momentFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
        return _this;
    }
    DatetimePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dateTimeEntryFormat = this.formatTranslationService.showOnlyDates(this.caseField.dateTimeEntryFormat);
        this.configureDatePicker(this.dateTimeEntryFormat);
        this.setDateTimeFormat();
        this.dateControl = this.registerControl(new forms_1.FormControl(this.caseField.value));
        // in resetting the format just after the page initialises, the input can be reformatted
        // otherwise the last format given will be how the text shown will be displayed
        setTimeout(function () {
            _this.setDateTimeFormat();
            _this.formatValue();
        }, 1);
        // when the status changes check that the maximum/minimum date has not been exceeded
        this.dateControl.statusChanges.subscribe(function () {
            _this.minError = _this.dateControl.hasError('matDatetimePickerMin');
            _this.maxError = _this.dateControl.hasError('matDatetimePickerMax');
        });
    };
    DatetimePickerComponent.prototype.setDateTimeFormat = function () {
        this.ngxMatDateFormats.parse.dateInput = this.dateTimeEntryFormat;
        this.ngxMatDateFormats.display.dateInput = this.dateTimeEntryFormat;
    };
    /*
    When the value changes, update the form control
    */
    DatetimePickerComponent.prototype.valueChanged = function () {
        this.formatValue();
    };
    DatetimePickerComponent.prototype.formatValue = function () {
        if (this.inputElement.nativeElement.value) {
            var formValue = this.inputElement.nativeElement.value;
            formValue = moment(formValue, this.dateTimeEntryFormat).format(this.momentFormat);
            if (formValue !== 'Invalid date') {
                this.dateControl.setValue(formValue);
            }
        }
    };
    DatetimePickerComponent.prototype.focusIn = function () {
        this.setDateTimeFormat();
    };
    DatetimePickerComponent.prototype.toggleClick = function () {
        this.setDateTimeFormat();
    };
    DatetimePickerComponent.prototype.minDate = function (caseField) {
        // set minimum date
        if (caseField.field_type.min instanceof Date) {
            this.minimumDate = caseField.field_type.min ? new Date(caseField.field_type.min) : this.minimumDate;
        }
        return this.minimumDate;
    };
    DatetimePickerComponent.prototype.maxDate = function (caseField) {
        // set maximum date
        if (caseField.field_type.max instanceof Date) {
            this.maximumDate = caseField.field_type.max ? new Date(caseField.field_type.max) : this.maximumDate;
        }
        return this.maximumDate;
    };
    DatetimePickerComponent.prototype.configureDatePicker = function (dateTimePickerFormat) {
        if (this.caseField.field_type.type === 'Date') {
            this.hideTime = true;
            this.checkTime = false;
            this.dateTimeEntryFormat = this.formatTranslationService.removeTime(this.dateTimeEntryFormat);
            this.momentFormat = 'YYYY-MM-DD';
        }
        if (this.checkTime) {
            if (this.formatTranslationService.hasSeconds(dateTimePickerFormat)) {
                this.showSeconds = true;
                this.hideMinutes = false;
                this.disableMinute = false;
                this.hideTime = false;
                if (!this.formatTranslationService.is24Hour(dateTimePickerFormat)) {
                    this.enableMeridian = true;
                }
            }
            if (this.formatTranslationService.hasHours(dateTimePickerFormat)) {
                this.hideTime = false;
                if (!this.formatTranslationService.is24Hour(dateTimePickerFormat)) {
                    this.enableMeridian = true;
                }
                return;
            }
            if (this.formatTranslationService.hasMinutes(dateTimePickerFormat)) {
                this.hideMinutes = false;
                this.disableMinute = false;
                this.hideTime = false;
                if (!this.formatTranslationService.is24Hour(dateTimePickerFormat)) {
                    this.enableMeridian = true;
                }
                return;
            }
        }
        if (this.formatTranslationService.hasDate(dateTimePickerFormat)) {
            return;
        }
        if (this.formatTranslationService.hasNoDay(dateTimePickerFormat)) {
            this.startView = 'multi-year';
        }
        if (this.formatTranslationService.hasNoDayAndMonth(dateTimePickerFormat)) {
            this.startView = 'multi-year';
            this.yearSelection = true;
        }
    };
    DatetimePickerComponent.prototype.yearSelected = function (event) {
        if (this.startView === 'multi-year' && this.yearSelection) {
            this.dateControl.patchValue(event.toISOString());
            this.datetimePicker.close();
            this.valueChanged();
        }
    };
    DatetimePickerComponent.prototype.monthSelected = function (event) {
        if (this.startView === 'multi-year') {
            this.dateControl.patchValue(event.toISOString());
            this.dateControl.patchValue(event.toISOString());
            this.datetimePicker.close();
            this.valueChanged();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], DatetimePickerComponent.prototype, "dateControl", void 0);
    __decorate([
        core_1.ViewChild('picker'),
        __metadata("design:type", datetime_picker_1.NgxMatDatetimePicker)
    ], DatetimePickerComponent.prototype, "datetimePicker", void 0);
    __decorate([
        core_1.ViewChild('input'),
        __metadata("design:type", core_1.ElementRef)
    ], DatetimePickerComponent.prototype, "inputElement", void 0);
    DatetimePickerComponent = __decorate([
        core_1.Component({
            selector: 'ccd-datetime-picker',
            template: "\n    <div class=\"govuk-form-group  bottom-30\" [id]=\"caseField.id\"\n         [ngClass]=\"{'form-group-error': dateControl && !dateControl.valid && dateControl.dirty}\">\n      <fieldset>\n        <legend>\n          <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel }}</span>\n          <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n          <span class=\"error-message\"\n                *ngIf=\"dateControl && dateControl.errors && dateControl.dirty && !(minError || maxError)\">{{dateControl.errors | ccdFirstError:caseField.label}}</span>\n                <span class=\"error-message\"\n                *ngIf=\"dateControl && dateControl.dirty && minError\">This date is older than the minimum date allowed</span>\n                <span class=\"error-message\"\n                *ngIf=\"dateControl && dateControl.dirty && maxError\">This date is later than the maximum date allowed</span>\n        </legend>\n        <div class=\"datepicker-container\">\n          <input class=\"govuk-input\"\n                 #input\n                 aria-label=\"Please enter a date and time in the format DD/MM/YYYY HH:MM\"\n                 [min]=\"minDate(caseField)\"\n                 [max]=\"maxDate(caseField)\"\n                 [formControl]=\"dateControl\"\n                 [ngxMatDatetimePicker]=\"picker\"\n                 (focusin)=\"focusIn()\"\n                 (dateChange)=\"valueChanged()\"\n                 ng-model-options=\"{timezone:'utc'}\"\n          >\n          <mat-datepicker-toggle matSuffix [for]=\"picker\" id=\"pickerOpener\"></mat-datepicker-toggle>\n          <ngx-mat-datetime-picker #picker\n                                   [color]=\"color\"\n                                   [touchUi]=\"touchUi\"\n                                   [hideTime]=\"hideTime\"\n                                   [startView]=\"startView\"\n                                   [stepHour]=\"stepHour\"\n                                   [stepSecond]=\"stepSecond\"\n                                   [stepMinute]=\"stepMinute\"\n                                   [showSeconds]=\"showSeconds\"\n                                   [showSpinners]=\"showSpinners\"\n                                   [disableMinute]=\"disableMinute\"\n                                   [enableMeridian]=\"enableMeridian\"\n\n                                   (yearSelected)=\"yearSelected($event)\"\n                                   (monthSelected)=\"monthSelected($event)\"\n                                   (opened)=\"toggleClick()\"\n          >\n          </ngx-mat-datetime-picker>\n        </div>\n      </fieldset>\n    </div>\n  ",
            styles: ["\n    .datepicker-container{display:inline-block;position:relative;min-width:298px}.datepicker-container .govuk-input{height:35px;min-width:298px;width:auto;padding-right:40px;border:1px solid #000}.datepicker-container .govuk-input:focus{outline:1px solid #ffdd00;border:1px solid black}.datepicker-container .govuk-input::-ms-clear{display:none}.datepicker-container .datepicker-wrapper-input{position:relative;display:inline-block;top:-20%;border:0}.datepicker-container .datepicker-wrapper-input:focus{border:0;outline:none}.datepicker-container .mat-icon-button{height:32px;width:32px}.datepicker-container .mat-icon-button:focus{outline:1px solid #ffdd00}.datepicker-container .mat-icon-button .mat-datepicker-toggle-default-icon{position:relative;top:-5px}.datepicker-container .mat-datepicker-toggle{position:absolute;right:0}.cdk-overlay-container .mat-datepicker-content{border:1px solid black;border-radius:0;max-width:295px}.cdk-overlay-container .mat-datepicker-content .mat-calendar-table{width:calc(100% - 1px);table-layout:fixed}.cdk-overlay-container .mat-datepicker-content .mat-calendar-header{height:34px;border-bottom:1px ridge #bfc1c3}.cdk-overlay-container .mat-datepicker-content .mat-calendar-period-button{left:14%;min-width:125px;border-right:1px ridge #bfc1c3;border-left:1px ridge #bfc1c3;border-radius:0px;top:-20px;width:200%}.cdk-overlay-container .mat-datepicker-content .mat-calendar-period-button .mat-button-wrapper{text-align:center;font-weight:bold}.cdk-overlay-container .mat-datepicker-content .mat-calendar-period-button:focus{border:2px solid black}.cdk-overlay-container .mat-datepicker-content .mat-calendar-previous-button{left:-73%;top:-20px;border:2px solid transparent;border-radius:0}.cdk-overlay-container .mat-datepicker-content .mat-calendar-previous-button:focus{border-color:black}.cdk-overlay-container .mat-datepicker-content .mat-calendar-previous-button::after{border-left-width:5px;border-top-width:5px;color:black;padding:4px;top:-2px;left:-2px}.cdk-overlay-container .mat-datepicker-content .mat-calendar-next-button{top:-20px;left:1%;border:2px solid transparent;border-radius:0}.cdk-overlay-container .mat-datepicker-content .mat-calendar-next-button:focus{border-color:black}.cdk-overlay-container .mat-datepicker-content .mat-calendar-next-button::after{border-right-width:5px;border-top-width:5px;color:black;padding:4px;top:-2px;left:-2px}.cdk-overlay-container .mat-datepicker-content .mat-button-wrapper{text-transform:capitalize !important}.cdk-overlay-container .mat-datepicker-content .mat-calendar{border-bottom:1px solid black}.cdk-overlay-container .mat-datepicker-content .mat-calendar-table-header-divider{padding:0px;border-bottom:none}.cdk-overlay-container .mat-datepicker-content .mat-calendar-table-header-divider::after{height:0px}.cdk-overlay-container .mat-datepicker-content .mat-calendar-content{padding:0px}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header{color:black}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header th.ng-star-inserted{font-weight:bold;font-size:15px;padding-top:2%;padding-bottom:2%;column-width:20px}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header tr:nth-of-type(1) th{visibility:hidden}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header tr:nth-of-type(1) th::after{visibility:visible;color:black;position:relative;left:-15px}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header tr:nth-of-type(1) th:nth-of-type(1)::after{content:'MON'}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header tr:nth-of-type(1) th:nth-of-type(2)::after{left:-12px;content:'TUE'}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header tr:nth-of-type(1) th:nth-of-type(3)::after{left:-18px;content:'WED'}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header tr:nth-of-type(1) th:nth-of-type(4)::after{left:-14px;content:'THU'}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header tr:nth-of-type(1) th:nth-of-type(5)::after{left:-10px;content:'FRI'}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header tr:nth-of-type(1) th:nth-of-type(6)::after{content:'SAT'}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-table-header tr:nth-of-type(1) th:nth-of-type(7)::after{content:'SUN'}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-body-label{font-weight:bold;font-size:large;color:black}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-body-selected{border:none;background-color:transparent;color:white}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-body-active{background-color:#5694ca}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-body-today{border:none;box-shadow:none}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-body-cell{border:1px ridge #bfc1c3}.cdk-overlay-container .mat-datepicker-content ngx-mat-month-view .mat-calendar-body-cell[aria-selected=\"true\"]{background-color:#1d70b8;outline:3px solid #ffdd00;border:2px solid black;outline-offset:1px;z-index:1}.cdk-overlay-container .mat-datepicker-content ngx-mat-multi-year-view .mat-calendar-table{border-collapse:separate;border-spacing:10px}.cdk-overlay-container .mat-datepicker-content ngx-mat-multi-year-view .mat-calendar-table .mat-calendar-body-active{background-color:#5694ca}.cdk-overlay-container .mat-datepicker-content ngx-mat-multi-year-view .mat-calendar-table .mat-calendar-body-cell{border:1px solid #bfc1c3}.cdk-overlay-container .mat-datepicker-content ngx-mat-multi-year-view .mat-calendar-table .mat-calendar-body-cell .mat-calendar-body-cell-content{border:none}.cdk-overlay-container .mat-datepicker-content ngx-mat-multi-year-view .mat-calendar-table .mat-calendar-body-cell .mat-calendar-body-selected{border:none;box-shadow:none;background-color:transparent}.cdk-overlay-container .mat-datepicker-content ngx-mat-multi-year-view .mat-calendar-table .mat-calendar-body-cell[aria-selected=\"true\"]{background-color:#1d70b8;outline:2px solid #ffdd00}.cdk-overlay-container .mat-datepicker-content ngx-mat-year-view .mat-calendar-table{border-collapse:separate;border-spacing:20px}.cdk-overlay-container .mat-datepicker-content ngx-mat-year-view .mat-calendar-table tr:nth-of-type(1){visibility:collapse}.cdk-overlay-container .mat-datepicker-content ngx-mat-year-view .mat-calendar-table .mat-calendar-body-active{background-color:#5694ca}.cdk-overlay-container .mat-datepicker-content ngx-mat-year-view .mat-calendar-table .mat-calendar-body-cell{border:1px solid #bfc1c3}.cdk-overlay-container .mat-datepicker-content ngx-mat-year-view .mat-calendar-table .mat-calendar-body-cell .mat-calendar-body-cell-content{border:none}.cdk-overlay-container .mat-datepicker-content ngx-mat-year-view .mat-calendar-table .mat-calendar-body-cell .mat-calendar-body-selected{border:none;box-shadow:none;background-color:transparent}.cdk-overlay-container .mat-datepicker-content ngx-mat-year-view .mat-calendar-table .mat-calendar-body-cell[aria-selected=\"true\"]{background-color:#1d70b8;outline:3px solid #ffdd00;border:2px solid black;outline-offset:1px}.cdk-overlay-container .mat-datepicker-content .time-container{height:80px;padding-top:0}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker{width:100%}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table{margin-left:0 !important}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tbody{position:relative}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .mat-icon-button .mat-button-wrapper{width:auto;height:auto}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .mat-icon-button:focus{outline:none}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:first-child{position:absolute;left:49px;top:15px;z-index:2}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:first-child button:disabled{display:none}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:first-child td:first-child [aria-label=\"expand_less icon\"]{position:absolute;left:-2px;top:25px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:first-child td:nth-child(3) [aria-label=\"expand_less icon\"].mat-icon-button{position:absolute;left:82px !important;top:25px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:first-child td:nth-child(5) [aria-label=\"expand_less icon\"].mat-icon-button{position:absolute;left:169px !important;top:25px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:first-child td:nth-last-child(1) [aria-label=\"expand_less icon\"].mat-icon-button{left:153px !important}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:first-child td:nth-last-child(2) [aria-label=\"expand_less icon\"].mat-icon-button{left:65px !important}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2){display:flex;padding:20px 0 20px 15px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) td{margin-right:30px;text-align:right}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) td:first-child .mat-form-field{width:50px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) td:first-child .mat-form-field::before{color:black;content:\"Hours\";position:relative;top:-5px;left:-5px;font-size:15px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) td:nth-child(3) .mat-form-field::before{color:black;content:\"Minutes\";position:relative;top:-5px;font-size:15px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) td:last-child{text-align:left;left:-15px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) .mat-form-field-disabled{display:none}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) td:nth-of-type(5) .mat-form-field::before{color:black;content:\"Seconds\";position:relative;top:-5px;font-size:15px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) .meridian{border-bottom:none}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) .meridian .mat-button{height:30px;top:21px;border-radius:0;color:black;border-color:black;background-color:#dee0e2;display:flex;justify-content:center}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(2) .meridian .mat-button .mat-button-wrapper{position:relative;top:-2px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(4){display:flex;padding:2rem 0 2rem 15px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(4) td{margin-right:30px;text-align:right}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:nth-child(4) td:last-child{text-align:left}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:last-child{position:absolute;left:49px;top:40px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:last-child button:disabled{display:none}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:last-child td:first-child [aria-label=\"expand_more icon\"]{position:absolute;top:15px;left:-2px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:last-child td:nth-child(3) [aria-label=\"expand_more icon\"].mat-icon-button{position:absolute;left:82px !important;top:15px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:last-child td:nth-child(5) [aria-label=\"expand_more icon\"].mat-icon-button{position:absolute;top:15px;left:169px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:last-child td:nth-last-child(1) [aria-label=\"expand_more icon\"].mat-icon-button{left:65px !important}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr:last-child td:nth-last-child(1).ng-star-inserted [aria-label=\"expand_more icon\"].mat-icon-button{left:153px !important}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr td{padding:0;border-bottom:0;position:relative}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .spacer{display:none}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .mat-icon{visibility:hidden;display:none}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .mat-button-wrapper{display:block;width:15px;height:8px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .mat-form-field-wrapper{padding-bottom:0}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .mat-form-field{width:auto;max-width:none}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr [aria-label=\"expand_less icon\"].mat-icon-button .mat-button-wrapper::after{content:' \\25B2'}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr [aria-label=\"expand_more icon\"].mat-icon-button .mat-button-wrapper::after{content:'\\25BC'}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .mat-form-field-flex{width:100%}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .mat-form-field-flex .mat-form-field-infix{border:1px solid black;height:20px;width:37px;display:flex;justify-content:center;align-items:center}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr .mat-form-field-underline{visibility:hidden}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr input{height:33px;width:37px}.cdk-overlay-container .mat-datepicker-content .time-container .ngx-mat-timepicker .table tr input:focus{border-color:black}.cdk-overlay-container .mat-datepicker-content .actions{padding-bottom:20px;margin-top:20px;justify-content:flex-start}.cdk-overlay-container .mat-datepicker-content .actions .mat-button{background-color:#00823b;position:relative;display:-moz-inline-stack;display:inline-block;padding:.526315em .789473em .263157em;border:none;border-radius:0;outline:1px solid transparent;outline-offset:-1px;-webkit-appearance:none;box-shadow:0 2px 0 #003618;font-size:1em;line-height:1.25;text-decoration:none;-webkit-font-smoothing:antialiased;color:#fff;box-sizing:border-box;vertical-align:top;width:80px;cursor:pointer}.cdk-overlay-container .mat-datepicker-content .actions .mat-button:focus{outline:2px solid #ffdd00}.cdk-overlay-container .mat-datepicker-content .actions .mat-button:hover{background-color:darkgreen}.cdk-overlay-container .mat-datepicker-content .actions .mat-button .mat-icon{visibility:hidden}.cdk-overlay-container .mat-datepicker-content .actions .mat-button .mat-button-wrapper::before{color:white;content:'Confirm';position:relative;font-size:15px;left:-3px}\n  "],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [
                { provide: datetime_picker_1.NGX_MAT_DATE_FORMATS, useValue: ɵ0 }
            ]
        }),
        __param(1, core_1.Inject(datetime_picker_1.NGX_MAT_DATE_FORMATS)),
        __metadata("design:paramtypes", [format_translator_service_1.FormatTranslatorService, Object])
    ], DatetimePickerComponent);
    return DatetimePickerComponent;
}(abstract_form_field_component_1.AbstractFormFieldComponent));
exports.DatetimePickerComponent = DatetimePickerComponent;
//# sourceMappingURL=datetime-picker.component.js.map