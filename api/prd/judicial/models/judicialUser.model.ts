export interface RawJudicialUserModel {
  sidam_id: string;
  object_id: string;
  known_as: string;
  surname: string;
  title: string;
  personal_code: string;
  full_name: string;
  post_nominals: string;
  email_id: string;
  is_judge: string;
  is_panel_number: string;
  is_magistrate: string;
}

export interface JudicialUserModel {
  emailId: string;
  fullName: string;
  idamId: string;
  isJudge: string;
  isMagistrate: string;
  isPanelMember: string;
  knownAs: string;
  personalCode: string;
  surname: string;
  title: string;
}

/**
 * @description due to some bad design from rd API below is created,
 * and they said we won't make the changes to keep the model to be consistent as same camelCase as it's live for other users
 * API 1: /refdata/judicial/users/search it's all camelCase from the request and also returns with camelCase in the body.
 * API 2: /refdata/judicial/users it's all snake_case from the request and also returns with snake_case in the body.
 * so we need an unified model from ExUI and transform it to JudicialUserModel for API 2
 */
export function transformToJudicialUserModel(rawJudicialUserModel: RawJudicialUserModel): JudicialUserModel {
  return {
    emailId: rawJudicialUserModel.email_id,
    fullName: rawJudicialUserModel.full_name,
    idamId: rawJudicialUserModel.sidam_id,
    isJudge: rawJudicialUserModel.is_judge,
    isMagistrate: rawJudicialUserModel.is_magistrate,
    isPanelMember: rawJudicialUserModel.is_panel_number,
    knownAs: rawJudicialUserModel.known_as,
    personalCode: rawJudicialUserModel.personal_code,
    surname: rawJudicialUserModel.surname,
    title: rawJudicialUserModel.title
  };
}
