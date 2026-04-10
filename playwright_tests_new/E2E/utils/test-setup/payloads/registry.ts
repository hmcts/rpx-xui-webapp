import type { CasePayloadBuildOptions, CasePayloadBuilder, CasePayloadFieldValues, CasePayloadTemplateKey } from './core/types';
import { buildDivorceXuiTestCaseTypeCreateCasePayload } from './templates/divorce/xui-test-case-type/createCase';
import { buildDivorceXuiTestCaseTypeCreateCaseFlagsPayload } from './templates/divorce/xui-test-case-type/createCaseFlags';
import { buildEmploymentEtEnglandWalesInitiateCasePayload } from './templates/employment/et-england-wales/initiateCase';

const payloadTemplateRegistry: Record<CasePayloadTemplateKey, CasePayloadBuilder> = {
  'employment.et-england-wales.initiate-case': buildEmploymentEtEnglandWalesInitiateCasePayload as CasePayloadBuilder,
  'divorce.xui-test-case-type.create-case-flags': buildDivorceXuiTestCaseTypeCreateCaseFlagsPayload as CasePayloadBuilder,
  'divorce.xui-test-case-type.create-case': buildDivorceXuiTestCaseTypeCreateCasePayload as CasePayloadBuilder,
};

export function buildCasePayloadFromTemplate<TFieldValues extends CasePayloadFieldValues = CasePayloadFieldValues>(
  template: CasePayloadTemplateKey,
  options: CasePayloadBuildOptions<TFieldValues> = {}
) {
  const builder = payloadTemplateRegistry[template] as CasePayloadBuilder<TFieldValues> | undefined;
  if (!builder) {
    throw new Error(`Unsupported payload template '${template}'.`);
  }

  return builder(options);
}

export {
  buildDivorceXuiTestCaseTypeCreateCaseFlagsPayload,
  buildDivorceXuiTestCaseTypeCreateCasePayload,
  buildEmploymentEtEnglandWalesInitiateCasePayload,
};
export type {
  CasePayload,
  CasePayloadBuildOptions,
  CasePayloadBuilder,
  CasePayloadContext,
  CasePayloadFieldValues,
  CasePayloadTemplateKey,
  DeepPartial,
} from './core/types';
