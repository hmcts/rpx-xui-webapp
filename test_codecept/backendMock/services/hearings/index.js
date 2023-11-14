
const { v4 } = require('uuid');
const userApiData = require('../userApiData')


class HearingsApi{
    

    constructor(){

        this.method = {
            searchTasks: "ON_SEARCH_TASKS"
        }
        this.hearings = [];
        this.serviceLinkedcases = []

        // this.addHearing()
        this.addHearing({ hmcStatus: "COMPLETED" })
        this.addHearing({ hmcStatus: "AWAITING_ACTUALS" })

    }

    addHearing(props){
        this.hearings.push(this.gethearingTemplate(props))
    }

    getHearingWithProps(props){
        return this.gethearingTemplate(props);
    }
    

    getCaseHearings(){
            return {
                "caseRef": "1690807693531270",
                "caseHearings": this.hearings,
                "hmctsServiceCode": null
        }
    }


    gethearingTemplate(props){
        props = props ? props : {}
        return {
            hearingRequestDateTime: props.hearingRequestDateTime ? props.hearingRequestDateTime : "2023-07-13T10:58:40.419815",
            hearingType: props.hearingType ? props.hearingType : "ABA5-FOF",
            hmcStatus: props.hmcStatus ? props.hmcStatus : "LISTED",
            lastResponseReceivedDateTime: props.lastResponseReceivedDateTime ? props.lastResponseReceivedDateTime : "2023-07-13T16:12:15",
            requestVersion: 1,
            hearingListingStatus: props.hearingListingStatus ? props.hearingListingStatus : "FIXED",
            listAssistCaseStatus: props.listAssistCaseStatus ? props.listAssistCaseStatus : "LISTED",
            hearingDaySchedule: [
                {
                    hearingStartDateTime: props['hearingDaySchedule.hearingStartDateTime'] ? props['hearingDaySchedule.hearingStartDateTime'] : "2023-07-21T10:00:00",
                    hearingEndDateTime: props['hearingDaySchedule.hearingEndDateTime'] ? props['hearingDaySchedule.hearingEndDateTime'] : "2023-07-21T14:05:00",
                    hearingVenueId: "497679",
                    hearingRoomId: "Coventry Combined Chambers 02",
                    hearingJudgeId: "",
                    panelMemberIds: [
                    ],
                    attendees: [
                        {
                            hearingSubChannel: "INTER",
                            partyID: "f6abd409-fe74-4140-a18b-a7d003c223cd",
                        },
                        {
                            hearingSubChannel: "VIDOTHER",
                            partyID: "107f3aa0-991a-48be-a3a2-4c5145576e6b",
                        },
                        {
                            hearingSubChannel: "VIDOTHER",
                            partyID: "b8f8c362-77bc-479a-b8ee-ae3f6e4c9475",
                        },
                        {
                            hearingSubChannel: "VIDOTHER",
                            partyID: "98ffefe7-ad04-4139-87e1-fffdb2bf4c99",
                        },
                        {
                            hearingSubChannel: "INTER",
                            partyID: "af72284a-30c7-463f-85ae-be75c2d93359",
                        },
                        {
                            hearingSubChannel: null,
                            partyID: "d1ea0557-0d91-4caf-8dda-cc6d9a0e0dfb",
                        },
                    ],
                    listAssistSessionID: null,
                },
            ],
            hearingGroupRequestId: null,
            hearingIsLinkedFlag: false,
            hearingChannels: props.hearingChannels ? props.hearingChannels.split(",") : [
                "INTER",
            ],
            hearingID: Date.now(),
            hearingResponse:{
                laCaseStatus: 'LISTED'
            }
            
        }
    }

}

module.exports = new HearingsApi()



