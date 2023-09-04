import { CaseField, FieldTypeEnum } from '../../domain';
import { FieldTypeSanitiser } from './field-type-sanitiser';
import * as i0 from "@angular/core";
export declare class FormValueService {
    private readonly fieldTypeSanitiser;
    /**
     * Gets value of a field based on fieldKey which is a dot separated reference to value and collection index.
     * There are two exceptions:
     * 1) In case of a multiselect being identified as a leaf a '---LABEL' suffix is appended to the key and values of that key are returned
     *      form= { 'list': ['code1', 'code2'],
     *              'list---LABEL': ['label1', 'label2'] },
     *      fieldKey=list,
     *      colIndex=0,
     *      value=label1, label2
     * 2) In case of a collection of simple fields is identified as a leaf all values are joined seperated by a comma
     *      form= { 'collection': [{ 'value': 'value1' }, { 'value': 'value2' }] }
     *      fieldKey=collection
     *      colIndex=1
     *      value=value1, value2
     *
     * Other examples:
     * 1) simple field reference: form={ 'PersonFirstName': 'John' }, fieldKey=PersonFirstName, value=John
     * 2) complex field reference:
     *      form= { complex1': { 'simple11': 'value11', 'simple12': 'value12', 'complex2': { 'simple21': 'value21' } }},
     *      fieldKey=complex1.complex2.simple21
     *      colIndex=0,
     *      value=value21
     * 3) complex field with collection field with complex field reference:
     *      form= { 'complex1': {
     *               'collection1': [
     *               { 'value': {
     *                   'complex2': {
     *                     'simple1': 'value1',
     *                     'complex3': {
     *                       'complex4': {
     *                         'simple2': 'value12'
     *                       }
     *                     }
     *                   }
     *                 }
     *               },
     *               { 'value': {
     *                   'complex2': {
     *                     'simple1': 'value2',
     *                     'complex3': {
     *                       'complex4': {
     *                         'simple2': 'value21'
     *                       }
     *                     }
     *                   }
     *                 }
     *               },
     *               { 'value': {
     *                   'complex2': {
     *                     'simple1': 'value3',
     *                     'complex3': {
     *                       'complex4': {
     *                         'simple2': 'value31'
     *                       }
     *                     }
     *                   }
     *                 }
     *               }
     *             ]}}
     *      fieldKey=complex1.collection1.complex2.complex3.complex4.simple2
     *      colIndex=2,
     *      value=value21
     * 4) collection of complex types
     *      form= { 'collection1': [
     *               { 'value': {'complex1': {
     *                             'simple1': 'value11',
     *                             'complex2': {
     *                               'complex3': {
     *                                 'simple2': 'value12'
     *                               }
     *                             }
     *                         }}
     *               },
     *               { 'value': {'complex1': {
     *                             'simple1': 'value21',
     *                             'complex2': {
     *                               'complex3': {
     *                                 'simple2': 'value22'
     *                               }
     *                             }
     *                         }}
     *               },
     *               { 'value': {'complex1': {
     *                             'simple1': 'value31',
     *                             'complex2': {
     *                               'complex3': {
     *                                 'simple2': 'value32'
     *                               }
     *                             }
     *                           }}
     *               }
     *             ]}
     *      fieldKey=collection1.complex1.complex2.complex3.simple2
     *      colIndex=2
     *      value=value32
     *
     * If key is pointing at a complex or collection leaf (not simple, collection of simple or multiselect types) then undefined is returned.
     * Also no key referring a leaf that is contained within collection will contain index number. The index is passed as an argument to the
     * method.
     */
    static getFieldValue(form: any, fieldKey: any, colIndex: any): any;
    /**
     * A recursive method to remove anything with a `---LABEL` suffix.
     * @param data The data to recurse through and remove MultiSelect labels.
     */
    static removeMultiSelectLabels(data: any): void;
    private static isReadOnly;
    private static isOptional;
    private static isLabel;
    private static isEmptyData;
    /**
     * Should we clear out optional, empty, complex objects?
     * @param clearEmpty False property if we simply want to skip it.
     * @param data The data to assess for "emptiness".
     * @param field The CaseField that will tell us if this is optional.
     */
    private static clearOptionalEmpty;
    constructor(fieldTypeSanitiser: FieldTypeSanitiser);
    sanitise(rawValue: object): object;
    sanitiseCaseReference(reference: string): string;
    filterCurrentPageFields(caseFields: CaseField[], editForm: any): any;
    sanitiseDynamicLists(caseFields: CaseField[], editForm: any): any;
    private sanitiseObject;
    private sanitiseArray;
    private sanitiseValue;
    clearNonCaseFields(data: object, caseFields: CaseField[]): void;
    removeNullLabels(data: object, caseFields: CaseField[]): void;
    removeEmptyDocuments(data: object, caseFields: CaseField[]): void;
    /**
     * Clear out unnecessary fields from a data object, based on an array of CaseFields.
     * This method is recursive and will call itself if it encounters particular field types.
     *
     * @param data The object to be tidied up.
     * @param caseFields The CaseFields that need to be cleaned up.
     * @param clearEmpty Whether or not we should clear out empty, optional, complex objects.
     * @param clearNonCase Whether or not we should clear out non-case fields at the top level.
     */
    removeUnnecessaryFields(data: object, caseFields: CaseField[], clearEmpty?: boolean, clearNonCase?: boolean, fromPreviousPage?: boolean, currentPageCaseFields?: any[]): void;
    removeInvalidCollectionData(data: object, field: CaseField): void;
    /**
     * Remove any empty collection fields where a value of greater than zero is specified in the field's {@link FieldType}
     * `min` attribute.
     *
     * @param data The object tree of form values on which to perform the removal
     * @param caseFields The list of underlying {@link CaseField} domain model objects for each field
     */
    removeEmptyCollectionsWithMinValidation(data: object, caseFields: CaseField[]): void;
    /**
     * Remove from the top level of the form data any case fields of a given type or types that are not intended to be
     * persisted. This function is intended to remove "special" case field types from the data, such as FlagLauncher or
     * ComponentLauncher fields.
     *
     * @param data The object tree of form values on which to perform the removal at the top level only
     * @param caseFields The list of underlying {@link CaseField} domain model objects for each field
     * @param types An array of one or more field types
     */
    removeCaseFieldsOfType(data: object, caseFields: CaseField[], types: FieldTypeEnum[]): void;
    /**
     * Re-populate the form data from the values held in the case fields. This is necessary in order to pick up, for
     * each `Flags` field, any flag details data not currently present.
     *
     * `Flags` fields may be contained in other `CaseField` instances, either as a sub-field of a Complex field, or
     * fields in a collection (or sub-fields of Complex fields in a collection). Therefore, it is necessary to
     * iterate through all `CaseField`s.
     *
     * @param data The object tree of form values on which to perform the data population
     * @param caseFields The list of underlying {@link CaseField} domain model objects for each field
     */
    repopulateFormDataFromCaseFieldValues(data: object, caseFields: CaseField[]): void;
    /**
     * Populate the linked cases from the data held in its corresponding CaseField.
     *
     * @param data The object tree of form values on which to perform the data population
     * @param caseFields The list of underlying {@link CaseField} domain model objects for each field
     */
    populateLinkedCasesDetailsFromCaseFields(data: object, caseFields: CaseField[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormValueService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormValueService>;
}
//# sourceMappingURL=form-value.service.d.ts.map