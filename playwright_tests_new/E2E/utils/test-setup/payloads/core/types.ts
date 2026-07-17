export type CasePayloadFieldValues = Record<string, unknown>;

export type CasePayloadTemplateKey =
  | 'employment.et-england-wales.initiate-case'
  | 'divorce.xui-test-case-type.create-case-flags'
  | 'divorce.xui-test-case-type.create-case';

export type CasePayloadContext = {
  scenario: string;
  jurisdiction: string;
  caseType: string;
  eventId: string;
  seed?: number;
};

export type DeepPartial<T> =
  T extends Array<infer TValue>
    ? Array<DeepPartial<TValue>>
    : T extends object
      ? { [TKey in keyof T]?: DeepPartial<T[TKey]> }
      : T;

export type CasePayload = {
  fieldValues: CasePayloadFieldValues;
  meta: {
    template: CasePayloadTemplateKey;
    jurisdiction: string;
    caseType: string;
    eventId: string;
    seed?: number;
  };
};

export type CasePayloadBuildOptions<TFieldValues extends CasePayloadFieldValues = CasePayloadFieldValues> = {
  overrides?: DeepPartial<TFieldValues>;
  context?: Partial<CasePayloadContext>;
  seed?: number;
};

export type CasePayloadBuilder<TFieldValues extends CasePayloadFieldValues = CasePayloadFieldValues> = (
  options?: CasePayloadBuildOptions<TFieldValues>
) => CasePayload;

export type UkAddress = {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  PostTown: string;
  County: string;
  Country: string;
  PostCode: string;
};
