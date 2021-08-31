
module.exports = {

    allWork: 'exui-all-tasks ',
    tasks: 'exui-all-tasks exui-all-work-tasks',
    cases: '',

    subNavihationLinks: {
        tasks: GetSubnavigationLinkCss('tasks'),
        cases: GetSubnavigationLinkCss('cases'),
    },

}

function GetSubnavigationLinkCss(subNav) {
    return `exui-all-tasks .hmcts-sub-navigation li a[href*="${subNav}"]']`
}

