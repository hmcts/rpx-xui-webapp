import { Case, CaseAction } from '.';

export default interface InvokedCaseAction {
  case: Case;
  action: CaseAction;
}
