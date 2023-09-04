export declare enum LinkedCasesPages {
    BEFORE_YOU_START = 0,
    NO_LINKED_CASES = 1,
    LINK_CASE = 2,
    UNLINK_CASE = 3,
    CHECK_YOUR_ANSWERS = 4
}
export declare enum LinkedCasesErrorMessages {
    ProposedCaseWithIn = "Case can not be linked to the same case",
    CaseNumberError = "Case numbers must have 16 digits",
    ReasonSelectionError = "Select a reason why these cases should be linked",
    SomethingWrong = "Something went wrong, please try again later",
    CaseCheckAgainError = "Check the case number and try again",
    CaseSelectionError = "You need to propose at least one case",
    CaseProposedError = "This case has already been proposed",
    CasesLinkedError = "These cases are already linked",
    UnlinkCaseSelectionError = "Select a case to unlink before continuing",
    LinkCasesNavigationError = "Please select Next to link case(s)",
    UnlinkCasesNavigationError = "Please select Next to unlink case(s)",
    BackNavigationError = "Please select Back to go to the previous page",
    otherDescriptionError = "Provide a description of the reason",
    otherDescriptionMaxLengthError = "Description provided must be 100 characters or fewer"
}
export declare enum LinkedCasesEventTriggers {
    LINK_CASES = "Link cases",
    MANAGE_CASE_LINKS = "Manage case links"
}
export declare enum Patterns {
    CASE_REF = "((([0-9]{4})(?: |-)?)){4}"
}
//# sourceMappingURL=write-linked-cases-field.enum.d.ts.map