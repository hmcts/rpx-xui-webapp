export interface HearingStagesModel {
  jurisdictionId: string;
  stages: HearingStageModel[];
}

export interface HearingStageModel {
  stageId: string;
  stageName: string;
}
