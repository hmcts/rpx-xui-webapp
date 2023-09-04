export var LinkedCasesPages;
(function (LinkedCasesPages) {
    LinkedCasesPages[LinkedCasesPages["BEFORE_YOU_START"] = 0] = "BEFORE_YOU_START";
    LinkedCasesPages[LinkedCasesPages["NO_LINKED_CASES"] = 1] = "NO_LINKED_CASES";
    LinkedCasesPages[LinkedCasesPages["LINK_CASE"] = 2] = "LINK_CASE";
    LinkedCasesPages[LinkedCasesPages["UNLINK_CASE"] = 3] = "UNLINK_CASE";
    LinkedCasesPages[LinkedCasesPages["CHECK_YOUR_ANSWERS"] = 4] = "CHECK_YOUR_ANSWERS";
})(LinkedCasesPages || (LinkedCasesPages = {}));
export var LinkedCasesErrorMessages;
(function (LinkedCasesErrorMessages) {
    LinkedCasesErrorMessages["ProposedCaseWithIn"] = "Case can not be linked to the same case";
    LinkedCasesErrorMessages["CaseNumberError"] = "Case numbers must have 16 digits";
    LinkedCasesErrorMessages["ReasonSelectionError"] = "Select a reason why these cases should be linked";
    LinkedCasesErrorMessages["SomethingWrong"] = "Something went wrong, please try again later";
    LinkedCasesErrorMessages["CaseCheckAgainError"] = "Check the case number and try again";
    LinkedCasesErrorMessages["CaseSelectionError"] = "You need to propose at least one case";
    LinkedCasesErrorMessages["CaseProposedError"] = "This case has already been proposed";
    LinkedCasesErrorMessages["CasesLinkedError"] = "These cases are already linked";
    LinkedCasesErrorMessages["UnlinkCaseSelectionError"] = "Select a case to unlink before continuing";
    LinkedCasesErrorMessages["LinkCasesNavigationError"] = "Please select Next to link case(s)";
    LinkedCasesErrorMessages["UnlinkCasesNavigationError"] = "Please select Next to unlink case(s)";
    LinkedCasesErrorMessages["BackNavigationError"] = "Please select Back to go to the previous page";
    LinkedCasesErrorMessages["otherDescriptionError"] = "Provide a description of the reason";
    LinkedCasesErrorMessages["otherDescriptionMaxLengthError"] = "Description provided must be 100 characters or fewer";
})(LinkedCasesErrorMessages || (LinkedCasesErrorMessages = {}));
export var LinkedCasesEventTriggers;
(function (LinkedCasesEventTriggers) {
    LinkedCasesEventTriggers["LINK_CASES"] = "Link cases";
    LinkedCasesEventTriggers["MANAGE_CASE_LINKS"] = "Manage case links";
})(LinkedCasesEventTriggers || (LinkedCasesEventTriggers = {}));
export var Patterns;
(function (Patterns) {
    Patterns["CASE_REF"] = "((([0-9]{4})(?: |-)?)){4}";
})(Patterns || (Patterns = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtbGlua2VkLWNhc2VzLWZpZWxkLmVudW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9saW5rZWQtY2FzZXMvZW51bXMvd3JpdGUtbGlua2VkLWNhc2VzLWZpZWxkLmVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFOLElBQVksZ0JBTVg7QUFORCxXQUFZLGdCQUFnQjtJQUMxQiwrRUFBZ0IsQ0FBQTtJQUNoQiw2RUFBZSxDQUFBO0lBQ2YsaUVBQVMsQ0FBQTtJQUNULHFFQUFXLENBQUE7SUFDWCxtRkFBa0IsQ0FBQTtBQUNwQixDQUFDLEVBTlcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQU0zQjtBQUVELE1BQU0sQ0FBTixJQUFZLHdCQWVYO0FBZkQsV0FBWSx3QkFBd0I7SUFDbEMsMEZBQThELENBQUE7SUFDOUQsZ0ZBQW9ELENBQUE7SUFDcEQscUdBQXlFLENBQUE7SUFDekUsMkZBQStELENBQUE7SUFDL0QsdUZBQTJELENBQUE7SUFDM0Qsd0ZBQTRELENBQUE7SUFDNUQscUZBQXlELENBQUE7SUFDekQsK0VBQW1ELENBQUE7SUFDbkQsa0dBQXNFLENBQUE7SUFDdEUsMkZBQStELENBQUE7SUFDL0QsK0ZBQW1FLENBQUE7SUFDbkUsaUdBQXFFLENBQUE7SUFDckUseUZBQTZELENBQUE7SUFDN0QsbUhBQXVGLENBQUE7QUFDekYsQ0FBQyxFQWZXLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFlbkM7QUFFRCxNQUFNLENBQU4sSUFBWSx3QkFHWDtBQUhELFdBQVksd0JBQXdCO0lBQ2xDLHFEQUF5QixDQUFBO0lBQ3pCLG1FQUF1QyxDQUFBO0FBQ3pDLENBQUMsRUFIVyx3QkFBd0IsS0FBeEIsd0JBQXdCLFFBR25DO0FBRUQsTUFBTSxDQUFOLElBQVksUUFFWDtBQUZELFdBQVksUUFBUTtJQUNsQixrREFBc0MsQ0FBQTtBQUN4QyxDQUFDLEVBRlcsUUFBUSxLQUFSLFFBQVEsUUFFbkIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBMaW5rZWRDYXNlc1BhZ2VzIHtcbiAgQkVGT1JFX1lPVV9TVEFSVCxcbiAgTk9fTElOS0VEX0NBU0VTLFxuICBMSU5LX0NBU0UsXG4gIFVOTElOS19DQVNFLFxuICBDSEVDS19ZT1VSX0FOU1dFUlNcbn1cblxuZXhwb3J0IGVudW0gTGlua2VkQ2FzZXNFcnJvck1lc3NhZ2VzIHtcbiAgUHJvcG9zZWRDYXNlV2l0aEluID0gJ0Nhc2UgY2FuIG5vdCBiZSBsaW5rZWQgdG8gdGhlIHNhbWUgY2FzZScsXG4gIENhc2VOdW1iZXJFcnJvciA9ICdDYXNlIG51bWJlcnMgbXVzdCBoYXZlIDE2IGRpZ2l0cycsXG4gIFJlYXNvblNlbGVjdGlvbkVycm9yID0gJ1NlbGVjdCBhIHJlYXNvbiB3aHkgdGhlc2UgY2FzZXMgc2hvdWxkIGJlIGxpbmtlZCcsXG4gIFNvbWV0aGluZ1dyb25nID0gJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyJyxcbiAgQ2FzZUNoZWNrQWdhaW5FcnJvciA9ICdDaGVjayB0aGUgY2FzZSBudW1iZXIgYW5kIHRyeSBhZ2FpbicsXG4gIENhc2VTZWxlY3Rpb25FcnJvciA9ICdZb3UgbmVlZCB0byBwcm9wb3NlIGF0IGxlYXN0IG9uZSBjYXNlJyxcbiAgQ2FzZVByb3Bvc2VkRXJyb3IgPSAnVGhpcyBjYXNlIGhhcyBhbHJlYWR5IGJlZW4gcHJvcG9zZWQnLFxuICBDYXNlc0xpbmtlZEVycm9yID0gJ1RoZXNlIGNhc2VzIGFyZSBhbHJlYWR5IGxpbmtlZCcsXG4gIFVubGlua0Nhc2VTZWxlY3Rpb25FcnJvciA9ICdTZWxlY3QgYSBjYXNlIHRvIHVubGluayBiZWZvcmUgY29udGludWluZycsXG4gIExpbmtDYXNlc05hdmlnYXRpb25FcnJvciA9ICdQbGVhc2Ugc2VsZWN0IE5leHQgdG8gbGluayBjYXNlKHMpJyxcbiAgVW5saW5rQ2FzZXNOYXZpZ2F0aW9uRXJyb3IgPSAnUGxlYXNlIHNlbGVjdCBOZXh0IHRvIHVubGluayBjYXNlKHMpJyxcbiAgQmFja05hdmlnYXRpb25FcnJvciA9ICdQbGVhc2Ugc2VsZWN0IEJhY2sgdG8gZ28gdG8gdGhlIHByZXZpb3VzIHBhZ2UnLFxuICBvdGhlckRlc2NyaXB0aW9uRXJyb3IgPSAnUHJvdmlkZSBhIGRlc2NyaXB0aW9uIG9mIHRoZSByZWFzb24nLFxuICBvdGhlckRlc2NyaXB0aW9uTWF4TGVuZ3RoRXJyb3IgPSAnRGVzY3JpcHRpb24gcHJvdmlkZWQgbXVzdCBiZSAxMDAgY2hhcmFjdGVycyBvciBmZXdlcicsXG59XG5cbmV4cG9ydCBlbnVtIExpbmtlZENhc2VzRXZlbnRUcmlnZ2VycyB7XG4gIExJTktfQ0FTRVMgPSAnTGluayBjYXNlcycsXG4gIE1BTkFHRV9DQVNFX0xJTktTID0gJ01hbmFnZSBjYXNlIGxpbmtzJ1xufVxuXG5leHBvcnQgZW51bSBQYXR0ZXJucyB7XG4gIENBU0VfUkVGID0gJygoKFswLTldezR9KSg/OiB8LSk/KSl7NH0nXG59XG4iXX0=