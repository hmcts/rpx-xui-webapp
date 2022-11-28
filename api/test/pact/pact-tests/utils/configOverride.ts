
const defaultConfig = {
    log4JConfig : {
        "appenders": {
            "out": {
                "layout": {
                    "pattern": "%[%d | %p |%X{catFormatted}|%] %m%n",
                    "type": "pattern",
                },
                "type": "stdout",
            },
        },
        "categories": {
            "default": { "appenders": ["out"], "level": "info", },
        },
    },
     "maxLogLine": 80,
};
export function getSearchTaskOverrides(waTaskAPiUrl) {
    return {
        "services.work_allocation.taskApi": waTaskAPiUrl,
        "waSupportedJurisdictions": 'IA',
        ...defaultConfig,
    }
}

export function getWorkAllocationAPIOverrides(waTaskAPiUrl) {
    return {
        "services.work_allocation.taskApi": waTaskAPiUrl,
        ...defaultConfig,
    }
}

export function getCaseworkerRefDataAPIOverrides(cwRefApiUrl) {
    return {
        "services.case.caseworkerApi": cwRefApiUrl,
        ...defaultConfig,
    }
}

export function getLocationsRefDataAPIOverrides(locationRefApiUrl) {
    return {
        "services.location_api": locationRefApiUrl,
        ...defaultConfig,
    }
}

export function getAccessManagementServiceAPIOverrides(accessManagementAPI) {
    return {
        "services.role_assignment.roleApi": accessManagementAPI,
        ...defaultConfig,
    }
}

export function getJudicialRefDataAPIOverrides(judicialRefApiUrl) {
    return {
        "services.case.judicialApi": judicialRefApiUrl,
        ...defaultConfig,
    }
}
