

module.exports = {
    container: 'exui-case-details-home mat-tab-header',
    tasksTab: tabWithLabel('Tasks'),
    rolesAndAccessTab: tabWithLabel('Roles and access'),
    tasksContainer: 'exui-case-details-home exui-tasks-container',
    rolesAndAccessContainer: 'exui-case-details-home exui-roles-and-access-container'

}

function tabWithLabel(label){

    let tabWithLabelPos = -1;
    switch (label){
        case 'Tasks':
            tabWithLabelPos = "1";
            break;
        case 'Roles and access':
            tabWithLabelPos = "2";
            break;
    }

    return `exui-case-details-home mat-tab-group .mat-tab-label[aria-posinset="${tabWithLabelPos}"] .mat-tab-label-content`
}

