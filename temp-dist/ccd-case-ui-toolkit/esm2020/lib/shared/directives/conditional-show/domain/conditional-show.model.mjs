import { FieldsUtils } from '../../../services/fields/fields.utils';
import { ConditionParser } from '../services/condition-parser.service';
export class ShowCondition {
    // Expects a show condition of the form: <fieldName>="string"
    constructor(condition) {
        this.condition = condition;
        this.conditions = [];
        if (!!condition) {
            this.conditions = ConditionParser.parse(condition);
        }
    }
    static addPathPrefixToCondition(showCondition, pathPrefix) {
        if (!pathPrefix || pathPrefix === '') {
            return showCondition;
        }
        if (!showCondition) {
            return '';
        }
        const formula = ConditionParser.parse(showCondition);
        if (!formula) {
            return showCondition;
        }
        this.processedList = [];
        showCondition = showCondition.replace(/CONTAINS/g, ' CONTAINS');
        const processedCondition = this.processAddPathPrefixToCondition(formula, pathPrefix, showCondition);
        return processedCondition.replace(/ CONTAINS/g, 'CONTAINS');
    }
    static processAddPathPrefixToCondition(formula, pathPrefix, originalCondition) {
        let finalCondition = originalCondition;
        if (Array.isArray(formula)) {
            formula.forEach(condition => {
                if (typeof condition === 'string' && this.validJoinComparators.indexOf(condition) !== -1) {
                    // do nothing
                }
                else {
                    if (Array.isArray(condition)) {
                        finalCondition = this.processAddPathPrefixToCondition(condition, pathPrefix, finalCondition);
                    }
                    else {
                        finalCondition = this.extractConditions(condition, pathPrefix, finalCondition);
                    }
                }
            });
        }
        else {
            finalCondition = this.extractConditions(formula, pathPrefix, finalCondition);
        }
        return finalCondition;
    }
    static extractConditions(condition, pathPrefix, originalCondition) {
        if (condition.fieldReference.startsWith(pathPrefix)) {
            return originalCondition;
        }
        else {
            if (originalCondition.indexOf(condition.fieldReference) > -1) {
                if (this.processedList && this.processedList.indexOf(condition.fieldReference) === -1) {
                    this.processedList.push(condition.fieldReference);
                    const regularExp = new RegExp(`(\\b)${condition.fieldReference}(?=[^"]*(?:"[^"]*"[^"]*)*$)(\\b)`, 'g');
                    return originalCondition.replace(regularExp, `${pathPrefix}.${condition.fieldReference}`);
                }
                else {
                    return originalCondition;
                }
            }
        }
    }
    // Cache instances so that we can cache results more effectively
    static getInstance(condition) {
        let instance = this.instanceCache.get(condition);
        if (!instance) {
            instance = new ShowCondition(condition);
            this.instanceCache.set(condition, instance);
        }
        return instance;
    }
    static getField(condition) {
        let separator = ShowCondition.CONTAINS;
        if (condition.indexOf(ShowCondition.CONTAINS) < 0) {
            separator = ShowCondition.CONDITION_EQUALS;
            if (condition.indexOf(ShowCondition.CONDITION_NOT_EQUALS) > -1) {
                separator = ShowCondition.CONDITION_NOT_EQUALS;
            }
        }
        return [condition.split(separator)[0], separator];
    }
    static getConditions(formula) {
        const conditionList = [];
        if (!!formula) {
            const newFormula = typeof formula === 'string' ? JSON.parse(formula) : formula;
            if (Array.isArray(newFormula)) {
                newFormula.forEach(condition => {
                    if (!(typeof condition === 'string' && this.validJoinComparators.indexOf(condition) !== -1)) {
                        if (Array.isArray(condition)) {
                            conditionList.push(ShowCondition.getConditions(condition).toString());
                        }
                        else {
                            conditionList.push(condition.fieldReference + condition.comparator + condition.value);
                        }
                    }
                });
            }
            else {
                conditionList.push(newFormula.fieldReference + newFormula.comparator + newFormula.value);
            }
        }
        return conditionList.toString();
    }
    /**
     * Determine whether a ShowCondition model is affected by fields that have
     * a display_context of HIDDEN or READONLY, which means they aren't able to
     * be changed by the user's actions.
     *
     * @param showCondition The ShowCondition model to evaluate.
     * @param caseFields Inspected to see appropriate display_contexts.
     */
    static hiddenCannotChange(showCondition, caseFields) {
        if (showCondition && showCondition.conditions.length && caseFields) {
            const conditions = this.getConditions(showCondition.conditions).split(',');
            if (conditions && conditions.length > 0) {
                let allUnchangeable = true;
                for (const condition of conditions) {
                    const [field] = ShowCondition.getField(condition);
                    const path = field.split('.');
                    let head = path.shift();
                    let caseField = caseFields.find(cf => cf.id === head);
                    while (path.length > 0) {
                        head = path.shift();
                        if (caseField) {
                            // Jump out if this is HIDDEN or READONLY, regardless of whether or not it's
                            // complex or a collection - nested fields will "inherit" the display_context.
                            if (['HIDDEN', 'READONLY'].indexOf(caseField.display_context) > -1) {
                                break;
                            }
                            // Consider what type of field this is.
                            const ft = caseField.field_type;
                            // tslint:disable-next-line:switch-default
                            switch (ft.type) {
                                case 'Collection':
                                    if (ft.collection_field_type.type === 'Complex' && ft.collection_field_type.complex_fields) {
                                        caseField = ft.collection_field_type.complex_fields.find(cf => cf.id === head);
                                    }
                                    break;
                                case 'Complex':
                                    if (ft.complex_fields) {
                                        caseField = ft.complex_fields.find(cf => cf.id === head);
                                    }
                                    break;
                            }
                        }
                    }
                    if (caseField) {
                        allUnchangeable = allUnchangeable && ['HIDDEN', 'READONLY'].indexOf(caseField.display_context) > -1;
                    }
                }
                return allUnchangeable;
            }
        }
        return false;
    }
    match(fields, path) {
        return ConditionParser.evaluate(fields, this.conditions, this.updatePathName(path));
    }
    updatePathName(path) {
        if (path && path.split(/[_]+/g).length > 0) {
            /* tslint:disable-next-line */
            let [pathName, ...pathTail] = path.split(/[_]+/g);
            const pathFinalIndex = pathTail.pop();
            const pathTailString = pathTail.toString();
            pathTail = pathTail.map((value) => {
                return Number(pathFinalIndex) === Number(value) ? pathName : value;
            });
            return pathTailString !== pathTail.toString()
                ? `${pathName}_${pathTail.join('_')}_${pathFinalIndex}`
                : path;
        }
        else {
            return path;
        }
    }
    matchByContextFields(contextFields) {
        return this.match(FieldsUtils.toValuesMap(contextFields));
    }
    /**
     * Determine whether this is affected by fields that have a display_context
     * of HIDDEN or READONLY, which means they aren't able to be changed by the
     * user's actions.
     *
     * @param caseFields Inspected to see appropriate display_contexts.
     */
    hiddenCannotChange(caseFields) {
        return ShowCondition.hiddenCannotChange(this, caseFields);
    }
}
ShowCondition.CONDITION_NOT_EQUALS = '!=';
ShowCondition.CONDITION_EQUALS = '=';
ShowCondition.CONTAINS = 'CONTAINS';
ShowCondition.instanceCache = new Map();
ShowCondition.validJoinComparators = ['AND', 'OR'];
ShowCondition.processedList = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtc2hvdy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvZGlyZWN0aXZlcy9jb25kaXRpb25hbC1zaG93L2RvbWFpbi9jb25kaXRpb25hbC1zaG93Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFdkUsTUFBTSxPQUFPLGFBQWE7SUErSnhCLDZEQUE2RDtJQUM3RCxZQUFtQixTQUFpQjtRQUFqQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBeko1QixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBMEp0QixJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7WUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBM0pNLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxhQUFxQixFQUFFLFVBQWtCO1FBQzlFLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxLQUFLLEVBQUUsRUFBRTtZQUNwQyxPQUFPLGFBQWEsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sYUFBYSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLCtCQUErQixDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEcsT0FBTyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTyxNQUFNLENBQUMsK0JBQStCLENBQUMsT0FBWSxFQUFFLFVBQWtCLEVBQUUsaUJBQXlCO1FBQ3hHLElBQUksY0FBYyxHQUFXLGlCQUFpQixDQUFDO1FBQy9DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxQixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUN4RixhQUFhO2lCQUNkO3FCQUFNO29CQUNMLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDNUIsY0FBYyxHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO3FCQUM5Rjt5QkFBTTt3QkFDTCxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7cUJBQ2hGO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzlFO1FBQ0QsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFjLEVBQUUsVUFBa0IsRUFBRSxpQkFBeUI7UUFDNUYsSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNuRCxPQUFPLGlCQUFpQixDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVELElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3JGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxTQUFTLENBQUMsY0FBYyxrQ0FBa0MsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdkcsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsVUFBVSxJQUFJLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO2lCQUMzRjtxQkFBTTtvQkFDTCxPQUFPLGlCQUFpQixDQUFDO2lCQUMxQjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsZ0VBQWdFO0lBQ3pELE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBaUI7UUFDekMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFpQjtRQUN2QyxJQUFJLFNBQVMsR0FBVyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQy9DLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELFNBQVMsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7WUFDM0MsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUM5RCxTQUFTLEdBQUcsYUFBYSxDQUFDLG9CQUFvQixDQUFDO2FBQ2hEO1NBQ0Y7UUFDRCxPQUFPLENBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFZO1FBQ3ZDLE1BQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDYixNQUFNLFVBQVUsR0FBRyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUMvRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzdCLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQzNGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDNUIsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7eUJBQ3ZFOzZCQUFNOzRCQUNMLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDdkY7cUJBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUY7U0FDRjtRQUNELE9BQU8sYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQixDQUFDLGFBQTRCLEVBQUUsVUFBdUI7UUFDcEYsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksVUFBVSxFQUFFO1lBQ2xFLE1BQU0sVUFBVSxHQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRixJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdkMsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixLQUFLLE1BQU0sU0FBUyxJQUFJLFVBQVUsRUFBRTtvQkFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2xELE1BQU0sSUFBSSxHQUFhLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxTQUFTLEdBQWMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUM7b0JBQ2pFLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ3BCLElBQUksU0FBUyxFQUFFOzRCQUNiLDRFQUE0RTs0QkFDNUUsOEVBQThFOzRCQUM5RSxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0NBQ2xFLE1BQU07NkJBQ1A7NEJBRUQsdUNBQXVDOzRCQUN2QyxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDOzRCQUNoQywwQ0FBMEM7NEJBQzFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRTtnQ0FDZixLQUFLLFlBQVk7b0NBQ2YsSUFBSSxFQUFFLENBQUMscUJBQXFCLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxFQUFFLENBQUMscUJBQXFCLENBQUMsY0FBYyxFQUFFO3dDQUMxRixTQUFTLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDO3FDQUNoRjtvQ0FDRCxNQUFNO2dDQUNSLEtBQUssU0FBUztvQ0FDWixJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUU7d0NBQ3JCLFNBQVMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUM7cUNBQzFEO29DQUNELE1BQU07NkJBQ1Q7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsSUFBSSxTQUFTLEVBQUU7d0JBQ2IsZUFBZSxHQUFHLGVBQWUsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNyRztpQkFDRjtnQkFDRCxPQUFPLGVBQWUsQ0FBQzthQUN4QjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBU00sS0FBSyxDQUFDLE1BQWMsRUFBRSxJQUFhO1FBQ3hDLE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVPLGNBQWMsQ0FBQyxJQUFZO1FBQ2pDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6Qyw4QkFBOEI7WUFDL0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3RDLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUUzQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNoQyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxjQUFjLEtBQUssUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDM0MsQ0FBQyxDQUFDLEdBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksY0FBYyxFQUFFO2dCQUN2RCxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ1Y7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRU0sb0JBQW9CLENBQUMsYUFBMEI7UUFDcEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksa0JBQWtCLENBQUMsVUFBdUI7UUFDL0MsT0FBTyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzVELENBQUM7O0FBek1zQixrQ0FBb0IsR0FBRyxJQUFJLENBQUM7QUFDNUIsOEJBQWdCLEdBQUcsR0FBRyxDQUFDO0FBQ3ZCLHNCQUFRLEdBQUcsVUFBVSxDQUFDO0FBQzlCLDJCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7QUFDeEMsa0NBQW9CLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsMkJBQWEsR0FBYSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgICogYXMgX3Njb3JlIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBGaWVsZHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ZpZWxkcy9maWVsZHMudXRpbHMnO1xuaW1wb3J0IHsgQ29uZGl0aW9uUGFyc2VyIH0gZnJvbSAnLi4vc2VydmljZXMvY29uZGl0aW9uLXBhcnNlci5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIFNob3dDb25kaXRpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPTkRJVElPTl9OT1RfRVFVQUxTID0gJyE9JztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT05ESVRJT05fRVFVQUxTID0gJz0nO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPTlRBSU5TID0gJ0NPTlRBSU5TJztcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2VDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBTaG93Q29uZGl0aW9uPigpO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSB2YWxpZEpvaW5Db21wYXJhdG9ycyA9IFsnQU5EJywgJ09SJ107XG4gIHByaXZhdGUgc3RhdGljIHByb2Nlc3NlZExpc3Q6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgY29uZGl0aW9ucyA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0aWMgYWRkUGF0aFByZWZpeFRvQ29uZGl0aW9uKHNob3dDb25kaXRpb246IHN0cmluZywgcGF0aFByZWZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIXBhdGhQcmVmaXggfHwgcGF0aFByZWZpeCA9PT0gJycpIHtcbiAgICAgIHJldHVybiBzaG93Q29uZGl0aW9uO1xuICAgIH1cbiAgICBpZiAoIXNob3dDb25kaXRpb24pIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtdWxhID0gQ29uZGl0aW9uUGFyc2VyLnBhcnNlKHNob3dDb25kaXRpb24pO1xuICAgIGlmICghZm9ybXVsYSkge1xuICAgICAgcmV0dXJuIHNob3dDb25kaXRpb247XG4gICAgfVxuICAgIHRoaXMucHJvY2Vzc2VkTGlzdCA9IFtdO1xuICAgIHNob3dDb25kaXRpb24gPSBzaG93Q29uZGl0aW9uLnJlcGxhY2UoL0NPTlRBSU5TL2csICcgQ09OVEFJTlMnKTtcbiAgICBjb25zdCBwcm9jZXNzZWRDb25kaXRpb24gPSB0aGlzLnByb2Nlc3NBZGRQYXRoUHJlZml4VG9Db25kaXRpb24oZm9ybXVsYSwgcGF0aFByZWZpeCwgc2hvd0NvbmRpdGlvbik7XG4gICAgcmV0dXJuIHByb2Nlc3NlZENvbmRpdGlvbi5yZXBsYWNlKC8gQ09OVEFJTlMvZywgJ0NPTlRBSU5TJyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBwcm9jZXNzQWRkUGF0aFByZWZpeFRvQ29uZGl0aW9uKGZvcm11bGE6IGFueSwgcGF0aFByZWZpeDogc3RyaW5nLCBvcmlnaW5hbENvbmRpdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgZmluYWxDb25kaXRpb246IHN0cmluZyA9IG9yaWdpbmFsQ29uZGl0aW9uO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZvcm11bGEpKSB7XG4gICAgICBmb3JtdWxhLmZvckVhY2goY29uZGl0aW9uID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25kaXRpb24gPT09ICdzdHJpbmcnICYmIHRoaXMudmFsaWRKb2luQ29tcGFyYXRvcnMuaW5kZXhPZihjb25kaXRpb24pICE9PSAtMSkge1xuICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25kaXRpb24pKSB7XG4gICAgICAgICAgICBmaW5hbENvbmRpdGlvbiA9IHRoaXMucHJvY2Vzc0FkZFBhdGhQcmVmaXhUb0NvbmRpdGlvbihjb25kaXRpb24sIHBhdGhQcmVmaXgsIGZpbmFsQ29uZGl0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmluYWxDb25kaXRpb24gPSB0aGlzLmV4dHJhY3RDb25kaXRpb25zKGNvbmRpdGlvbiwgcGF0aFByZWZpeCwgZmluYWxDb25kaXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbmFsQ29uZGl0aW9uID0gdGhpcy5leHRyYWN0Q29uZGl0aW9ucyhmb3JtdWxhLCBwYXRoUHJlZml4LCBmaW5hbENvbmRpdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBmaW5hbENvbmRpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGV4dHJhY3RDb25kaXRpb25zKGNvbmRpdGlvbjogYW55LCBwYXRoUHJlZml4OiBzdHJpbmcsIG9yaWdpbmFsQ29uZGl0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChjb25kaXRpb24uZmllbGRSZWZlcmVuY2Uuc3RhcnRzV2l0aChwYXRoUHJlZml4KSkge1xuICAgICAgcmV0dXJuIG9yaWdpbmFsQ29uZGl0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3JpZ2luYWxDb25kaXRpb24uaW5kZXhPZihjb25kaXRpb24uZmllbGRSZWZlcmVuY2UpID4gLTEpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc2VkTGlzdCAmJiB0aGlzLnByb2Nlc3NlZExpc3QuaW5kZXhPZihjb25kaXRpb24uZmllbGRSZWZlcmVuY2UpID09PSAtMSkge1xuICAgICAgICAgIHRoaXMucHJvY2Vzc2VkTGlzdC5wdXNoKGNvbmRpdGlvbi5maWVsZFJlZmVyZW5jZSk7XG4gICAgICAgICAgY29uc3QgcmVndWxhckV4cCA9IG5ldyBSZWdFeHAoYChcXFxcYikke2NvbmRpdGlvbi5maWVsZFJlZmVyZW5jZX0oPz1bXlwiXSooPzpcIlteXCJdKlwiW15cIl0qKSokKShcXFxcYilgLCAnZycpO1xuICAgICAgICAgIHJldHVybiBvcmlnaW5hbENvbmRpdGlvbi5yZXBsYWNlKHJlZ3VsYXJFeHAsIGAke3BhdGhQcmVmaXh9LiR7Y29uZGl0aW9uLmZpZWxkUmVmZXJlbmNlfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvcmlnaW5hbENvbmRpdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENhY2hlIGluc3RhbmNlcyBzbyB0aGF0IHdlIGNhbiBjYWNoZSByZXN1bHRzIG1vcmUgZWZmZWN0aXZlbHlcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZShjb25kaXRpb246IHN0cmluZyk6IFNob3dDb25kaXRpb24ge1xuICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2VDYWNoZS5nZXQoY29uZGl0aW9uKTtcbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICBpbnN0YW5jZSA9IG5ldyBTaG93Q29uZGl0aW9uKGNvbmRpdGlvbik7XG4gICAgICB0aGlzLmluc3RhbmNlQ2FjaGUuc2V0KGNvbmRpdGlvbiwgaW5zdGFuY2UpO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRGaWVsZChjb25kaXRpb246IHN0cmluZyk6IFtzdHJpbmcsIHN0cmluZz9dIHtcbiAgICBsZXQgc2VwYXJhdG9yOiBzdHJpbmcgPSBTaG93Q29uZGl0aW9uLkNPTlRBSU5TO1xuICAgIGlmIChjb25kaXRpb24uaW5kZXhPZihTaG93Q29uZGl0aW9uLkNPTlRBSU5TKSA8IDApIHtcbiAgICAgIHNlcGFyYXRvciA9IFNob3dDb25kaXRpb24uQ09ORElUSU9OX0VRVUFMUztcbiAgICAgIGlmIChjb25kaXRpb24uaW5kZXhPZihTaG93Q29uZGl0aW9uLkNPTkRJVElPTl9OT1RfRVFVQUxTKSA+IC0xKSB7XG4gICAgICAgIHNlcGFyYXRvciA9IFNob3dDb25kaXRpb24uQ09ORElUSU9OX05PVF9FUVVBTFM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbIGNvbmRpdGlvbi5zcGxpdChzZXBhcmF0b3IpWzBdLCBzZXBhcmF0b3IgXTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldENvbmRpdGlvbnMoZm9ybXVsYTogYW55KTogc3RyaW5nIHtcbiAgICBjb25zdCBjb25kaXRpb25MaXN0OiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICghIWZvcm11bGEpIHtcbiAgICAgIGNvbnN0IG5ld0Zvcm11bGEgPSB0eXBlb2YgZm9ybXVsYSA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGZvcm11bGEpIDogZm9ybXVsYTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld0Zvcm11bGEpKSB7XG4gICAgICAgIG5ld0Zvcm11bGEuZm9yRWFjaChjb25kaXRpb24gPT4ge1xuICAgICAgICAgIGlmICghKHR5cGVvZiBjb25kaXRpb24gPT09ICdzdHJpbmcnICYmIHRoaXMudmFsaWRKb2luQ29tcGFyYXRvcnMuaW5kZXhPZihjb25kaXRpb24pICE9PSAtMSkpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmRpdGlvbikpIHtcbiAgICAgICAgICAgICAgY29uZGl0aW9uTGlzdC5wdXNoKFNob3dDb25kaXRpb24uZ2V0Q29uZGl0aW9ucyhjb25kaXRpb24pLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uZGl0aW9uTGlzdC5wdXNoKGNvbmRpdGlvbi5maWVsZFJlZmVyZW5jZSArIGNvbmRpdGlvbi5jb21wYXJhdG9yICsgY29uZGl0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uZGl0aW9uTGlzdC5wdXNoKG5ld0Zvcm11bGEuZmllbGRSZWZlcmVuY2UgKyBuZXdGb3JtdWxhLmNvbXBhcmF0b3IgKyBuZXdGb3JtdWxhLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbmRpdGlvbkxpc3QudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBhIFNob3dDb25kaXRpb24gbW9kZWwgaXMgYWZmZWN0ZWQgYnkgZmllbGRzIHRoYXQgaGF2ZVxuICAgKiBhIGRpc3BsYXlfY29udGV4dCBvZiBISURERU4gb3IgUkVBRE9OTFksIHdoaWNoIG1lYW5zIHRoZXkgYXJlbid0IGFibGUgdG9cbiAgICogYmUgY2hhbmdlZCBieSB0aGUgdXNlcidzIGFjdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBzaG93Q29uZGl0aW9uIFRoZSBTaG93Q29uZGl0aW9uIG1vZGVsIHRvIGV2YWx1YXRlLlxuICAgKiBAcGFyYW0gY2FzZUZpZWxkcyBJbnNwZWN0ZWQgdG8gc2VlIGFwcHJvcHJpYXRlIGRpc3BsYXlfY29udGV4dHMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGhpZGRlbkNhbm5vdENoYW5nZShzaG93Q29uZGl0aW9uOiBTaG93Q29uZGl0aW9uLCBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSk6IGJvb2xlYW4ge1xuICAgIGlmIChzaG93Q29uZGl0aW9uICYmIHNob3dDb25kaXRpb24uY29uZGl0aW9ucy5sZW5ndGggJiYgY2FzZUZpZWxkcykge1xuICAgICAgY29uc3QgY29uZGl0aW9uczogc3RyaW5nW10gPSB0aGlzLmdldENvbmRpdGlvbnMoc2hvd0NvbmRpdGlvbi5jb25kaXRpb25zKS5zcGxpdCgnLCcpO1xuICAgICAgaWYgKGNvbmRpdGlvbnMgJiYgY29uZGl0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBhbGxVbmNoYW5nZWFibGUgPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbmRpdGlvbiBvZiBjb25kaXRpb25zKSB7XG4gICAgICAgICAgY29uc3QgW2ZpZWxkXSA9IFNob3dDb25kaXRpb24uZ2V0RmllbGQoY29uZGl0aW9uKTtcbiAgICAgICAgICBjb25zdCBwYXRoOiBzdHJpbmdbXSA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgICAgICAgbGV0IGhlYWQgPSBwYXRoLnNoaWZ0KCk7XG4gICAgICAgICAgbGV0IGNhc2VGaWVsZDogQ2FzZUZpZWxkID0gY2FzZUZpZWxkcy5maW5kKGNmID0+IGNmLmlkID09PSBoZWFkKTtcbiAgICAgICAgICB3aGlsZSAocGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBoZWFkID0gcGF0aC5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKGNhc2VGaWVsZCkge1xuICAgICAgICAgICAgICAvLyBKdW1wIG91dCBpZiB0aGlzIGlzIEhJRERFTiBvciBSRUFET05MWSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIG9yIG5vdCBpdCdzXG4gICAgICAgICAgICAgIC8vIGNvbXBsZXggb3IgYSBjb2xsZWN0aW9uIC0gbmVzdGVkIGZpZWxkcyB3aWxsIFwiaW5oZXJpdFwiIHRoZSBkaXNwbGF5X2NvbnRleHQuXG4gICAgICAgICAgICAgIGlmIChbJ0hJRERFTicsICdSRUFET05MWSddLmluZGV4T2YoY2FzZUZpZWxkLmRpc3BsYXlfY29udGV4dCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gQ29uc2lkZXIgd2hhdCB0eXBlIG9mIGZpZWxkIHRoaXMgaXMuXG4gICAgICAgICAgICAgIGNvbnN0IGZ0ID0gY2FzZUZpZWxkLmZpZWxkX3R5cGU7XG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzd2l0Y2gtZGVmYXVsdFxuICAgICAgICAgICAgICBzd2l0Y2ggKGZ0LnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdDb2xsZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgIGlmIChmdC5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUudHlwZSA9PT0gJ0NvbXBsZXgnICYmIGZ0LmNvbGxlY3Rpb25fZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlRmllbGQgPSBmdC5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMuZmluZChjZiA9PiBjZi5pZCA9PT0gaGVhZCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdDb21wbGV4JzpcbiAgICAgICAgICAgICAgICAgIGlmIChmdC5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlRmllbGQgPSBmdC5jb21wbGV4X2ZpZWxkcy5maW5kKGNmID0+IGNmLmlkID09PSBoZWFkKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjYXNlRmllbGQpIHtcbiAgICAgICAgICAgIGFsbFVuY2hhbmdlYWJsZSA9IGFsbFVuY2hhbmdlYWJsZSAmJiBbJ0hJRERFTicsICdSRUFET05MWSddLmluZGV4T2YoY2FzZUZpZWxkLmRpc3BsYXlfY29udGV4dCkgPiAtMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFsbFVuY2hhbmdlYWJsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXhwZWN0cyBhIHNob3cgY29uZGl0aW9uIG9mIHRoZSBmb3JtOiA8ZmllbGROYW1lPj1cInN0cmluZ1wiXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25kaXRpb246IHN0cmluZykge1xuICAgIGlmICghIWNvbmRpdGlvbikge1xuICAgICAgdGhpcy5jb25kaXRpb25zID0gQ29uZGl0aW9uUGFyc2VyLnBhcnNlKGNvbmRpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG1hdGNoKGZpZWxkczogb2JqZWN0LCBwYXRoPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIENvbmRpdGlvblBhcnNlci5ldmFsdWF0ZShmaWVsZHMsIHRoaXMuY29uZGl0aW9ucywgdGhpcy51cGRhdGVQYXRoTmFtZShwYXRoKSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVBhdGhOYW1lKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5zcGxpdCgvW19dKy9nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG4gICAgICBsZXQgW3BhdGhOYW1lLCAuLi5wYXRoVGFpbF0gPSBwYXRoLnNwbGl0KC9bX10rL2cpO1xuICAgICAgY29uc3QgcGF0aEZpbmFsSW5kZXggPSBwYXRoVGFpbC5wb3AoKTtcbiAgICAgIGNvbnN0IHBhdGhUYWlsU3RyaW5nID0gcGF0aFRhaWwudG9TdHJpbmcoKTtcblxuICAgICAgcGF0aFRhaWwgPSBwYXRoVGFpbC5tYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgIHJldHVybiBOdW1iZXIocGF0aEZpbmFsSW5kZXgpID09PSBOdW1iZXIodmFsdWUpID8gcGF0aE5hbWUgOiB2YWx1ZTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcGF0aFRhaWxTdHJpbmcgIT09IHBhdGhUYWlsLnRvU3RyaW5nKClcbiAgICAgICAgPyBgJHtwYXRoTmFtZX1fJHtwYXRoVGFpbC5qb2luKCdfJyl9XyR7cGF0aEZpbmFsSW5kZXh9YFxuICAgICAgICA6IHBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtYXRjaEJ5Q29udGV4dEZpZWxkcyhjb250ZXh0RmllbGRzOiBDYXNlRmllbGRbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1hdGNoKEZpZWxkc1V0aWxzLnRvVmFsdWVzTWFwKGNvbnRleHRGaWVsZHMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGlzIGlzIGFmZmVjdGVkIGJ5IGZpZWxkcyB0aGF0IGhhdmUgYSBkaXNwbGF5X2NvbnRleHRcbiAgICogb2YgSElEREVOIG9yIFJFQURPTkxZLCB3aGljaCBtZWFucyB0aGV5IGFyZW4ndCBhYmxlIHRvIGJlIGNoYW5nZWQgYnkgdGhlXG4gICAqIHVzZXIncyBhY3Rpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gY2FzZUZpZWxkcyBJbnNwZWN0ZWQgdG8gc2VlIGFwcHJvcHJpYXRlIGRpc3BsYXlfY29udGV4dHMuXG4gICAqL1xuICBwdWJsaWMgaGlkZGVuQ2Fubm90Q2hhbmdlKGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFNob3dDb25kaXRpb24uaGlkZGVuQ2Fubm90Q2hhbmdlKHRoaXMsIGNhc2VGaWVsZHMpO1xuICB9XG59XG4iXX0=