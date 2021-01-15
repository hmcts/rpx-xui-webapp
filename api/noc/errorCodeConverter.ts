export function generateErrorMessageWithCode(error) {
  let data
  if (error.data && !error.data.code && error.data.message) {
    const code = generateErrorCodeFromMessage(error.data.message)
    data = {...error.data, code}
  } else {
    data = error.data
  }
  return {...error, data}
}

function generateErrorCodeFromMessage(message: string) {
  if (message.toLowerCase().includes('Case ID can not be empty'.toLowerCase())) {
    return 'case-id-empty'
  } else if (message.toLowerCase().includes('Case ID has to be a valid 16-digit'.toLowerCase())) {
    return 'case-id-invalid'
  } else if (message.toLowerCase().includes('Case ID has to be 16-digits long'.toLowerCase())) {
    return 'case-id-invalid-length'
  } else if (message.toLowerCase().includes('Case could not be found'.toLowerCase())) {
    return 'case-not-found'
  } else if (message.toLowerCase().includes('Multiple NoC Request events found for the user'.toLowerCase())) {
    return 'multiple-noc-requests-on-user'
  } else if (message.toLowerCase().includes('More than one change request found on the case'.toLowerCase())) {
    return 'multiple-noc-requests-on-case'
  } else if (message.toLowerCase().includes('Insufficient privileges for notice of change request'.toLowerCase())) {
    return 'insufficient-privileges'
  } else if (message.toLowerCase().includes('No Organisation Policy'.toLowerCase())) {
    return 'no-org-policy'
  } else if (message.toLowerCase().includes('No NoC events available'.toLowerCase())) {
    return 'noc-event-unavailable'
  } else if (message.toLowerCase().includes('Ongoing NoC request in progress'.toLowerCase())) {
    return 'noc-in-progress'
  } else if (message.toLowerCase().includes('Challenge question answers can not be empty'.toLowerCase())) {
    return 'answers-empty'
  } else if (message.toLowerCase().includes('The number of provided answers must match the number of questions'.toLowerCase())) {
    return 'answers-mismatch-questions'
  } else if (message.toLowerCase().includes('The answers did not match those for any litigant'.toLowerCase())) {
    return 'answers-not-matched-any-litigant'
  } else if (message.toLowerCase().includes('The answers did not uniquely identify a litigant'.toLowerCase())) {
    return 'answers-not-identify-litigant'
  } else if (message.toLowerCase().includes('No answer has been provided for question ID'.toLowerCase())) {
    return 'no-answer-provided-for-question'
  } else if (message.toLowerCase().includes('No OrganisationPolicy exists on the case for the case role'.toLowerCase())) {
    return 'no-org-policy'
  } else if (message.toLowerCase().includes('they are already representing'.toLowerCase())) {
    return 'has-represented'
  } else if (message.toLowerCase().includes('they are already representing'.toLowerCase())) {
    return 'has-represented'
  } else if (message.toLowerCase().includes('Missing ChangeOrganisationRequest.CaseRoleID'.toLowerCase())) {
    return 'missing-cor-case-role-id'
  } else {
    return 'generic-error'
  }
}
