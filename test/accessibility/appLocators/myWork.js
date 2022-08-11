
module.exports = {

    myWork: 'exui-task-home',
    myTasks: 'exui-task-home exui-my-tasks',
    availableTasks: 'exui-task-home exui-available-tasks',
    myCases: 'exui-task-home exui-my-cases',


    subNavihationLinks : {
        myTasks: GetSubnavigationLinkCss('list'),
        availableTasks: GetSubnavigationLinkCss('available'),
        myCases: GetSubnavigationLinkCss('my-cases')
    },
    workFilterButton:'exui-task-home exui-task-list-filter button',
    workFilters: 'exui-task-home exui-task-list-filter .xui-generic-filter'


}

function GetSubnavigationLinkCss(subNav){
    return `exui-task-home a.hmcts-sub-navigation__link[href*='${subNav}']`
}
