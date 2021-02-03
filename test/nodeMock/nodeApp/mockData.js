class NodeAppMockData{

    getConfigurationValue(configurationKey) {
        return configurations[configurationKey];
    }

    getUIConfiguration(){
        return {
            "googleAnalyticsKey": "UA-124734893-4",
            "idamWeb": "https://idam-web-public.aat.platform.hmcts.net",
            "launchDarklyClientId": "5de6610b23ce5408280f2268",
            "manageCaseLink": "https://xui-webapp-aat.service.core-compute-aat.internal/cases",
            "manageOrgLink": "https://xui-mo-webapp-aat.service.core-compute-aat.internal",
            "protocol": "http"
        };
    }

    getAddresses(postcode){
        const addresses = {
            "header": {
                "uri": "https://api.ordnancesurvey.co.uk/places/v1/addresses/postcode?postcode=SW1",
                "query": "postcode=SW1",
                "offset": 0,
                "totalresults": 254579,
                "format": "JSON",
                "dataset": "DPA",
                "lr": "EN,CY",
                "maxresults": 100,
                "epoch": "81",
                "output_srs": "EPSG:27700"
            },
            "results" :[]
        }

        for(let i = 1; i< 100; i++){
            addresses.results.push({
                "DPA": {
                    "UPRN": "12101281"+i,
                    "UDPRN": "2392690"+i,
                    "ADDRESS": i+", ALTHORPE MEWS, LONDON, SW11 3PD",
                    "BUILDING_NUMBER": "11"+i,
                    "THOROUGHFARE_NAME": "ALTHORPE MEWS",
                    "POST_TOWN": "LONDON",
                    "POSTCODE": "SW11 3PD",
                    "RPC": "2",
                    "X_COORDINATE": 526874.0,
                    "Y_COORDINATE": 176714.0,
                    "STATUS": "APPROVED",
                    "LOGICAL_STATUS_CODE": "1",
                    "CLASSIFICATION_CODE": "RD08",
                    "CLASSIFICATION_CODE_DESCRIPTION": "Sheltered Accommodation",
                    "LOCAL_CUSTODIAN_CODE": 5960,
                    "LOCAL_CUSTODIAN_CODE_DESCRIPTION": "WANDSWORTH",
                    "POSTAL_ADDRESS_CODE": "D",
                    "POSTAL_ADDRESS_CODE_DESCRIPTION": "A record which is linked to PAF",
                    "BLPU_STATE_CODE": null,
                    "BLPU_STATE_CODE_DESCRIPTION": "Unknown/Not applicable",
                    "TOPOGRAPHY_LAYER_TOID": "osgb1000042165547",
                    "LAST_UPDATE_DATE": "13/02/2019",
                    "ENTRY_DATE": "19/03/2002",
                    "LANGUAGE": "EN",
                    "MATCH": 1.0,
                    "MATCH_DESCRIPTION": "EXACT"
                }
            });
        }
        return addresses;
    }
}



const configurations = {
    'feature.termsAndConditionsEnabled': false,
    'termsAndConditionsEnabled': false

}

module.exports = new NodeAppMockData();

