"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _score = require("underscore");
var fields_utils_1 = require("../../../services/fields/fields.utils");
var ShowCondition = /** @class */ (function () {
    // Expects a show condition of the form: <fieldName>="string"
    function ShowCondition(condition) {
        this.condition = condition;
        this.orConditions = null;
        this.andConditions = null;
        if (!!condition) {
            if (condition.search(ShowCondition.OR_CONDITION_REGEXP) !== -1) {
                this.orConditions = condition.split(ShowCondition.OR_CONDITION_REGEXP);
            }
            else {
                this.andConditions = condition.split(ShowCondition.AND_CONDITION_REGEXP);
            }
        }
    }
    ShowCondition.addPathPrefixToCondition = function (showCondition, pathPrefix) {
        if (!pathPrefix || pathPrefix === '') {
            return showCondition;
        }
        if (showCondition.search(ShowCondition.OR_CONDITION_REGEXP) !== -1) {
            var orConditions = showCondition.split(ShowCondition.OR_CONDITION_REGEXP);
            orConditions = this.extractConditions(orConditions, pathPrefix);
            return orConditions.join(' OR ');
        }
        else {
            var andConditions = showCondition.split(ShowCondition.AND_CONDITION_REGEXP);
            andConditions = this.extractConditions(andConditions, pathPrefix);
            return andConditions.join(' AND ');
        }
    };
    ShowCondition.extractConditions = function (conditionsArray, pathPrefix) {
        var extracted = conditionsArray.map(function (condition) {
            if (condition.startsWith(pathPrefix)) {
                return condition;
            }
            return pathPrefix + "." + condition;
        });
        return extracted;
    };
    // Cache instances so that we can cache results more effectively
    ShowCondition.getInstance = function (condition) {
        var instance = this.instanceCache.get(condition);
        if (!instance) {
            instance = new ShowCondition(condition);
            this.instanceCache.set(condition, instance);
        }
        return instance;
    };
    ShowCondition.getField = function (condition) {
        var separator = ShowCondition.CONTAINS;
        if (condition.indexOf(ShowCondition.CONTAINS) < 0) {
            separator = ShowCondition.CONDITION_EQUALS;
            if (condition.indexOf(ShowCondition.CONDITION_NOT_EQUALS) > -1) {
                separator = ShowCondition.CONDITION_NOT_EQUALS;
            }
        }
        return [condition.split(separator)[0], separator];
    };
    /**
     * Determine whether a ShowCondition model is affected by fields that have
     * a display_context of HIDDEN or READONLY, which means they aren't able to
     * be changed by the user's actions.
     *
     * @param showCondition The ShowCondition model to evaluate.
     * @param caseFields Inspected to see appropriate display_contexts.
     */
    ShowCondition.hiddenCannotChange = function (showCondition, caseFields) {
        if (showCondition && caseFields) {
            var conditions = showCondition.andConditions || showCondition.orConditions;
            if (conditions && conditions.length > 0) {
                var allUnchangeable = true;
                var _loop_1 = function (condition) {
                    var field = ShowCondition.getField(condition)[0];
                    var path = field.split('.');
                    var head = path.shift();
                    var caseField = caseFields.find(function (cf) { return cf.id === head; });
                    while (path.length > 0) {
                        head = path.shift();
                        if (caseField) {
                            // Jump out if this is HIDDEN or READONLY, regardless of whether or not it's
                            // complex or a collection - nested fields will "inherit" the display_context.
                            if (['HIDDEN', 'READONLY'].indexOf(caseField.display_context) > -1) {
                                break;
                            }
                            // Consider what type of field this is.
                            var ft = caseField.field_type;
                            switch (ft.type) {
                                case 'Collection':
                                    if (ft.collection_field_type.type === 'Complex' && ft.collection_field_type.complex_fields) {
                                        caseField = ft.collection_field_type.complex_fields.find(function (cf) { return cf.id === head; });
                                    }
                                    break;
                                case 'Complex':
                                    if (ft.complex_fields) {
                                        caseField = ft.complex_fields.find(function (cf) { return cf.id === head; });
                                    }
                                    break;
                            }
                        }
                    }
                    if (caseField) {
                        allUnchangeable = allUnchangeable && ['HIDDEN', 'READONLY'].indexOf(caseField.display_context) > -1;
                    }
                };
                for (var _i = 0, conditions_1 = conditions; _i < conditions_1.length; _i++) {
                    var condition = conditions_1[_i];
                    _loop_1(condition);
                }
                return allUnchangeable;
            }
        }
        return false;
    };
    ShowCondition.prototype.match = function (fields, path) {
        if (!this.condition) {
            return true;
        }
        return this.matchAndConditions(fields, path);
    };
    ShowCondition.prototype.matchByContextFields = function (contextFields) {
        return this.match(fields_utils_1.FieldsUtils.toValuesMap(contextFields));
    };
    /**
     * Determine whether this is affected by fields that have a display_context
     * of HIDDEN or READONLY, which means they aren't able to be changed by the
     * user's actions.
     *
     * @param caseFields Inspected to see appropriate display_contexts.
     */
    ShowCondition.prototype.hiddenCannotChange = function (caseFields) {
        return ShowCondition.hiddenCannotChange(this, caseFields);
    };
    ShowCondition.prototype.matchAndConditions = function (fields, path) {
        var _this = this;
        if (!!this.orConditions) {
            return this.orConditions.some(function (orCondition) { return _this.matchEqualityCondition(fields, orCondition, path); });
        }
        else if (!!this.andConditions) {
            return this.andConditions.every(function (andCondition) { return _this.matchEqualityCondition(fields, andCondition, path); });
        }
        else {
            return false;
        }
    };
    ShowCondition.prototype.matchEqualityCondition = function (fields, condition, path) {
        var _a = ShowCondition.getField(condition), field = _a[0], conditionSeparator = _a[1];
        var _b = field.split('.'), head = _b[0], tail = _b.slice(1);
        var currentValue = this.findValueForComplexCondition(fields, head, tail, path);
        var expectedValue = this.unquoted(condition.split(conditionSeparator)[1]);
        if (conditionSeparator === ShowCondition.CONTAINS) {
            return this.checkValueContains(expectedValue, currentValue);
        }
        else {
            return this.checkValueEquals(expectedValue, currentValue, conditionSeparator);
        }
    };
    ShowCondition.prototype.checkValueEquals = function (expectedValue, currentValue, conditionSeparaor) {
        if (expectedValue.search('[,]') > -1) { // for  multi-select list
            return this.checkMultiSelectListEquals(expectedValue, currentValue, conditionSeparaor);
        }
        else if (expectedValue.endsWith('*') && currentValue && conditionSeparaor !== ShowCondition.CONDITION_NOT_EQUALS) {
            if (typeof currentValue === 'string') {
                return currentValue.startsWith(this.removeStarChar(expectedValue));
            }
            return expectedValue === '*';
        }
        else {
            // changed from '===' to '==' to cover number field conditions
            if (conditionSeparaor === ShowCondition.CONDITION_NOT_EQUALS) {
                return this.checkValueNotEquals(expectedValue, currentValue);
            }
            else {
                return currentValue == expectedValue || this.okIfBothEmpty(expectedValue, currentValue); // tslint:disable-line
            }
        }
    };
    ShowCondition.prototype.checkValueNotEquals = function (expectedValue, currentValue) {
        var formatCurrentValue = currentValue ? currentValue.toString().trim() : '';
        if ('*' === expectedValue && formatCurrentValue !== '') {
            return false;
        }
        var formatExpectedValue = expectedValue ? expectedValue.toString().trim() : '';
        return formatCurrentValue != formatExpectedValue; // tslint:disable-line
    };
    ShowCondition.prototype.checkMultiSelectListEquals = function (expectedValue, currentValue, conditionSeparator) {
        var expectedValues = expectedValue.split(',').sort().toString();
        var values = currentValue ? currentValue.sort().toString() : '';
        if (conditionSeparator === ShowCondition.CONDITION_NOT_EQUALS) {
            return expectedValues !== values;
        }
        else {
            return expectedValues === values;
        }
    };
    ShowCondition.prototype.checkValueContains = function (expectedValue, currentValue) {
        if (expectedValue.search(',') > -1) {
            var expectedValues = expectedValue.split(',').sort();
            var values_1 = currentValue ? currentValue.sort().toString() : '';
            return expectedValues.every(function (item) { return values_1.search(item) >= 0; });
        }
        else {
            var values = currentValue && Array.isArray(currentValue) ? currentValue.toString() : '';
            return values.search(expectedValue) >= 0;
        }
    };
    ShowCondition.prototype.findValueForComplexCondition = function (fields, head, tail, path) {
        if (!fields) {
            return undefined;
        }
        if (tail.length === 0) {
            return this.getValue(fields, head);
        }
        else {
            if (fields_utils_1.FieldsUtils.isArray(fields[head])) {
                return this.findValueForComplexConditionInArray(fields, head, tail, path);
            }
            else {
                return this.findValueForComplexConditionForPathIfAny(fields, head, tail, path);
            }
        }
    };
    ShowCondition.prototype.findValueForComplexConditionForPathIfAny = function (fields, head, tail, path) {
        if (path) {
            var _a = path.split(/[_]+/g), _ = _a[0], pathTail = _a.slice(1);
            return this.findValueForComplexCondition(fields[head], tail[0], tail.slice(1), pathTail.join('_'));
        }
        else {
            return this.findValueForComplexCondition(fields[head], tail[0], tail.slice(1), path);
        }
    };
    ShowCondition.prototype.findValueForComplexConditionInArray = function (fields, head, tail, path) {
        // use the path to resolve which array element we refer to
        if (path && path.startsWith(head)) {
            var _a = path.split(/[_]+/g), _ = _a[0], pathTail = _a.slice(1);
            if (pathTail.length > 0) {
                try {
                    var arrayIndex = Number.parseInt(pathTail[0], 10);
                    var __ = pathTail[0], dropNumberPath = pathTail.slice(1);
                    return (fields[head][arrayIndex] !== undefined) ? this.findValueForComplexCondition(fields[head][arrayIndex]['value'], tail[0], tail.slice(1), dropNumberPath.join('_')) : null;
                }
                catch (e) {
                    console.log('Error while parsing number', pathTail[0], e);
                }
            }
        }
        else {
            console.log('Path in formArray should start with ', head, ', full path: ', path);
        }
    };
    ShowCondition.prototype.getValue = function (fields, head) {
        if (this.isDynamicList(fields[head])) {
            return fields[head].value.code;
        }
        else {
            return fields[head];
        }
    };
    ShowCondition.prototype.isDynamicList = function (dynamiclist) {
        return !_score.isEmpty(dynamiclist) &&
            (_score.has(dynamiclist, 'value') && _score.has(dynamiclist, 'list_items'));
    };
    ShowCondition.prototype.unquoted = function (str) {
        return str.replace(/^"|"$/g, '');
    };
    ShowCondition.prototype.removeStarChar = function (str) {
        return str.substring(0, str.length - 1);
    };
    ShowCondition.prototype.okIfBothEmpty = function (right, value) {
        return value === null && (right === '');
    };
    ShowCondition.AND_CONDITION_REGEXP = new RegExp('\\sAND\\s(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)', 'g');
    ShowCondition.OR_CONDITION_REGEXP = new RegExp('\\sOR\\s(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)', 'g');
    ShowCondition.CONDITION_NOT_EQUALS = '!=';
    ShowCondition.CONDITION_EQUALS = '=';
    ShowCondition.CONTAINS = 'CONTAINS';
    ShowCondition.instanceCache = new Map();
    return ShowCondition;
}());
exports.ShowCondition = ShowCondition;
//# sourceMappingURL=conditional-show.model.js.map