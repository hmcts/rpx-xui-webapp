

const defaultConfig = {
    log4JConfig : {
        "appenders": {
            "out": {
                "layout": {
                    "pattern": "%[%d | %p |%X{catFormatted}|%] %m%n",
                    "type": "pattern"
                },
                "type": "stdout"
            }
        },
        "categories": {
            "default": { "appenders": ["out"], "level": "info" }
        }
    },
     "maxLogLine": 80,
   
};
export function getSearchTaskOverrides(waTaskAPiUrl){
    return {
        "services.work_allocation.taskApi": waTaskAPiUrl,
        ...defaultConfig
    }
}



