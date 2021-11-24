export interface NavigationModel {
  conditionOperator?: string;
  conditionValue?: string;
  resultValue1: string;
}

export interface ScreenNavigationModel {
  screenName: string;
  conditionKey?: string;
  navigation: NavigationModel[];
}
