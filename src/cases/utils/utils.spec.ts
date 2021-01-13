import { getFilterType, isStringOrNumber, sanitiseMetadataFieldName } from './utils';


describe('Utils', () => {

    it('should determine string or number', () => {
        expect(isStringOrNumber('string')).toEqual(true);
        expect(isStringOrNumber(1)).toEqual(true);
        expect(isStringOrNumber(['array'])).toEqual(false);
    });

    it('should get filter type', () => {
        const fieldName = 'someFieldName';
        let metadataFields = [];
        expect(getFilterType(fieldName, metadataFields)).toEqual('caseFilter');
        metadataFields = ['someFieldName'];
        expect(getFilterType(fieldName, metadataFields)).toEqual('metadataFilter');
    });

    it('should sanitise Metadata Field Names', () => {
        const fieldName = '[someFieldName]';
        expect(sanitiseMetadataFieldName('metadataFilter', fieldName)).toEqual('somefieldname');
        expect(sanitiseMetadataFieldName('caseFilter', fieldName)).toEqual('[someFieldName]');
    });
});
