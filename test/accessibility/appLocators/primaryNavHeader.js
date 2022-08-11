module.exports = {
    header:'nav.hmcts-primary-navigation',
    myWork: getPrimaryNavLink('my-work/list'),
    allWork: getPrimaryNavLink('all-work/tasks'),
    caseList: getPrimaryNavLink('/cases'),
    caseCreate: getPrimaryNavLink('case-filter'),
    findCase: getPrimaryNavLink('case-search')

}


function getPrimaryNavLink(navItem){
    return `nav.hmcts-primary-navigation ul li a[href*='${navItem}']`
}

