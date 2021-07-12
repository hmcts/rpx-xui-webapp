import { CASE_ALLOCATOR_ROLE, CASE_ID, JURISDICTION, JURISDICTION_KEY } from '../constants/constant-key';
import { MyCaseModel } from '../models/myCaseModel';

export function ccdCaseToMyCase(assignments: any[], rawCase: any, caseType: string): MyCaseModel {
  const jurisdiction: string = rawCase.fields.hasOwnProperty(JURISDICTION_KEY) ? rawCase.fields[JURISDICTION_KEY] : '';
  const caseId: string = rawCase.case_id;
  const assignment = assignments.find(asm => asm.attributes.hasOwnProperty(CASE_ID) ? asm.attributes.caseId === caseId : false);
  switch (jurisdiction) {
    case JURISDICTION.IA:
      return getIAMapping(assignment, rawCase, jurisdiction, caseType);
    default:
      return null;
  }
}

export function getIAMapping(assignment: any, rawCase: any, jurisdiction: string, caseType: string): MyCaseModel {
  const roleName: string = assignment.roleName ? assignment.roleName : '';
  const startDate: string = assignment.beginTime ? assignment.beginTime : '';
  const endDate: string = assignment.endTime ? assignment.endTime : '';
  const isCaseAllocator: boolean = assignment.authorisations.some(auth => auth.toString().includes(CASE_ALLOCATOR_ROLE));
  const permissions: string[] = ['Read'];
  if (isCaseAllocator) {
    permissions.push('Manage');
  }
  return {
    case_category: caseType,
    case_id: rawCase.case_id,
    case_name: `${rawCase.fields.appellantGivenNames} ${rawCase.fields.appellantFamilyName}`,
    case_role: roleName,
    end_date: endDate,
    jurisdiction,
    permissions,
    start_date: startDate,
  };
}
