
module.exports = {

    allWork: 'exui-all-work-home',
    tasks: 'exui-all-work-home exui-all-work-tasks',
    cases: '',

    subNavihationLinks: {
        tasks: GetSubnavigationLinkCss('tasks'),
        cases: GetSubnavigationLinkCss('cases'),
    },

}

function GetSubnavigationLinkCss(subNav) {
    return `exui-all-work-home .hmcts-sub-navigation li a[href*="${subNav}"]']`
}

