export interface NoCQuestion {
    displayOrder: number // controls order in which they are displayed, mandatory and unique so identifies the question
    answerType: string // One of Text/Date/Time/DateTime/PhoneUK/Number/Email/Postcode
    displayContext: string // used for date/time field formatting
    questionLabel: string
}
