import { Case, CaseAction } from '.';

export default interface InvokedCaseAction {
  invokedCase: Case;
  action: CaseAction;
}
