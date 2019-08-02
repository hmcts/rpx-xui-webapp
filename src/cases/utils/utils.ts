export function isStringOrNumber(value: any): boolean {
    return (typeof value === 'string' && value.length !== 0) || (typeof value === 'number');
}

export function getFilterType(fieldName: string, metadataFields): string {
    return (metadataFields && (metadataFields.indexOf(fieldName) > -1)) ?
        'metadataFilter' : 'caseFilter';
}

export function sanitiseMetadataFieldName(filterType: string, fieldName: string): string {
    if (filterType === 'metadataFilter') {
        fieldName = fieldName.replace(/\[(.*?)]/g, '$1').toLocaleLowerCase();
    }
    return fieldName;
}
