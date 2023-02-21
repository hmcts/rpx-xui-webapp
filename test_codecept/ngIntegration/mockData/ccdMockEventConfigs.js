
const CCDCaseConfig = require('../../nodeMock/ccd/ccdCaseConfig/caseCreateConfigGenerator');

function getEventConfig(event){
    const mockEvent = new CCDCaseConfig(event, "Mock " + event, "Mock event description " + event);
    switch (event){
        case "CollectionFieldPermission":
            mockEvent.addWizardPage("testPage1", "Test Page 1")
                .addCaseField({
                    id: "collectionField", type: "Collection", label: "collection of Text", collection_field_type:
                    {
                        id: "simpleText", type: "Text", label: "Simple text collection"
                    },
                    value: [{ id: 1, value:"test val"}]
                });
                break;
        default:
            throw new Error(`Mock event config for provided event ${event} is not defined. Please check test data config`);

    }

    return mockEvent;
}

module.exports = getEventConfig;