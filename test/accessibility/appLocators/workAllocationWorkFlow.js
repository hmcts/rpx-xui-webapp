module.exports = {
    continue: '.govuk-button-group button.govuk-button',
    reAllocateWorkFlow:'exui-task-container-assignment',

    chooseRole:{
        container:'exui-choose-role exui-choose-radio-option',
        option_1:'exui-choose-role exui-choose-radio-option .govuk-radios__item:nth-of-type(1) input',
        option_2: 'exui-choose-role exui-choose-radio-option .govuk-radios__item:nth-of-type(2) input'
    },
    chooseHowToAllocate: {
        container: 'exui-choose-allocate-to exui-choose-radio-option',
        reserverToMe: 'exui-choose-allocate-to exui-choose-radio-option .govuk-radios__item:nth-of-type(1) input',
        anotherperson: 'exui-choose-allocate-to exui-choose-radio-option .govuk-radios__item:nth-of-type(2) input'
    },
    chooseDuration:{
        container:'exui-choose-duration',
        sevenDays:'exui-choose-duration .govuk-radios .govuk-radios__item:nth-of-type(1) input',
        indefinite:'exui-choose-duration .govuk-radios .govuk-radios__item:nth-of-type(2) input',
        anotherPeriod: 'exui-choose-duration .govuk-radios .govuk-radios__item:nth-of-type(3) input',
        startDate:{
            day: getDurationDateElementLocator('dayStartDate'),
            month: getDurationDateElementLocator('monthStartDate'),
            year: getDurationDateElementLocator('yearStartDate')
        },
        endDate: {
            day: getDurationDateElementLocator('dayEndDate'),
            month: getDurationDateElementLocator('monthEndDate'),
            year: getDurationDateElementLocator('yearEndDate')
        }
    },
    allocateCheckAnswers:'exui-allocate-role-check-answers exui-answers',

    findPerson:{
        container:'xuilib-find-person',
        inputText:'xuilib-find-person input',
        resultFirstOption:'.cdk-overlay-container mat-option span'
    },
    taskAssignmentCheckYourAnswers:'exui-task-assignment-confirm',
    taskActionContainer:'exui-task-action-container',

    deleteExclusionPage:'exui-delete-exclusion',
    removeAllocation:'exui-remove-role'


}

function getDurationDateElementLocator(controlName){
    return `formcontrolnameexui-choose-duration input[formcontrolname*='${controlName}']`
}

