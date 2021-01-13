export class NocQuestion {
  public caseTypeId: string;
  public order: string;
  public questionText: string;
  public answerFieldType: {
    id: string;
    type: string;
    min: null | number;
    max: null | number;
    regularExpression: any;
    fixedListItems: [];
    complexFields: [];
    collectionFieldType: null | any;
  };
  public displayContextParameter: string;
  public challengeQuestionId: string;
  public answerField: string;
  public questionId: string;
}
