
const { v4 } = require('uuid');

class PRDApi{

    constructor(){
        this.method = {
            searchTasks: "ON_SEARCH_TASKS"
        }
        this.categoryTypes = {
            HearingType:{ 
                inputs: [{ value_en: 'Breach 1' }, { value_en: 'Breach 2'}], 
                value:[]
            },
            Facilities: {
                inputs: [{ value_en: 'Facility 1' }, { value_en: 'Facility 2'}], 
                value: []
            },
            HearingChannel: {
                inputs: [{ value_en: 'Hearing channel 1' }, { value_en: 'Hearing channel 2'}], 
                value: []
            },
            JudgeType: {
                inputs: [{ value_en: 'Judge type 1' }, { value_en: 'Judge type 2'}], 
                value: []
            },
            HearingPriority: {
                inputs: [{ value_en: 'Hearing priority 1' }, { value_en: 'Hearing priority 2'}], 
                value: []
            },
            caseType:{
                inputs: [{ value_en: 'Case type 1' }, { value_en: 'Case type 2' }],
                value: []
            },
            CaseLinkingReasonCode:{
                inputs: [{ value_en: 'Case linking code 1' }, { value_en: 'Case linking code 2' }],
                value: []
            },
            HearingSubChannel:{
                inputs: [{ value_en: 'Hearing sub channel code 1' }, { value_en: 'Hearing sub channel code 2' }],
                value: []
            },
            EntityRoleCode: {
                inputs: [{ value_en: 'Entity role code 1' }, { value_en: 'Entity role code 1' }],
                value: []
            },
            ActualPartHeardReasonCodes:{
                inputs: [{ value_en: 'Actual part hearing reason code 1' }, { value_en: 'Actual part hearing reason code 1' }],
                value: []
            },
            ActualCancellationReasonCodes: {
                inputs: [{ value_en: 'Actual cancellation reason code 1' }, { value_en: 'Actual cancellation reason code 1' }],
                value: []
            },
            ChangeReasons: {
                inputs: [{ value_en: 'Change reason code 1' }, { value_en: 'Chnage reason code 1' }],
                value: []
            }
        }

        this.caseFlags = { 
            flags:[
                 { FlagDetails: [] }
            ],
            
        }
        this.setUpCaseFlags()

        for (const category of Object.keys(this.categoryTypes)){
            this.setUpcategories(category)
        }
       
    }
        
    setUpcategories(categoryType){
        const getCategory = (categoryType, type) => {
            return {
                "category_key": categoryType,
                "key": type.key ? type.key : "ABA5-BRE",
                "value_en": type.value_en ? type.value_en : "Breach",
                "value_cy": type.value_cy ? type.value_cy : "Torri Amodau",
                "hint_text_en": type.hint_text_en ? type.hint_text_en : "",
                "hint_text_cy": type.key ? type.key : "",
                "lov_order": type.lov_order ? type.lov_order : 4,
                "parent_category": type.parent_category ? type.parent_category : "",
                "parent_key": type.parent_key ? type.parent_key : "",
                "active_flag": type.active_flag ? type.active_flag : "Y",
                "child_nodes": type.child_nodes ? type.child_nodes : []

            }
        }
        this.categoryTypes[categoryType].inputs.forEach(type => {
            this.categoryTypes[categoryType].value.push(getCategory(categoryType, type))
        })
    }

    setUpCaseFlags(){
            this.addServiceCaseFlag({
                name: "A", path: ["Reasonable adjustment"],
                childFlags: [{ name: 'A.A', path: ["Reasonable adjustment","RA L1"] }]
            })
            this.addServiceCaseFlag({
                name: "B", path: ["Language interpreter"],
                childFlags: [{ name: 'B.A', path: ["Language interpreter","LI L1"], flagCode: 'PF0015'}]
            })

        this.addServiceCaseFlag({
            name: "B", path: ["Party"],
            childFlags: [{ name: 'B.A', path: ["Party", "Others L1"], flagCode: 'OT001' }]
        })
        }

        addServiceCaseFlag(flagDetails){

            const getFlag = (serviceFlag) => {
                const temp = {
                    "name": serviceFlag.name ? serviceFlag.name : "Case",
                    "hearingRelevant": serviceFlag.hearingRelevant ? serviceFlag.hearingRelevant : false,
                    "flagComment": serviceFlag.flagComment ? serviceFlag.flagComment : false,
                    "defaultStatus": serviceFlag.defaultStatus ? serviceFlag.defaultStatus : "Active",
                    "externallyAvailable": serviceFlag.externallyAvailable ? serviceFlag.externallyAvailable : false,
                    "flagCode": serviceFlag.flagCode ? serviceFlag.flagCode : "RA001",
                    "childFlags": [
                    ],
                    "isParent": serviceFlag.childFlags && serviceFlag.childFlags.length > 0 ? true : false,
                    "Path": serviceFlag.path

                    
                }
                if (!serviceFlag.childFlags){
                    return temp;
                }
                for (const child of serviceFlag.childFlags) {
                    const childFlag = getFlag(child)
                    temp.childFlags.push(childFlag)
                }
                return temp;
            }

            const flag = getFlag(flagDetails)
            this.caseFlags.flags[0].FlagDetails.push(flag)
        }

    }


module.exports = new PRDApi();


