export interface NavigationModel {
  conditionOperator?: string;
  conditionValue?: string | boolean | number;
  resultValue: string;
}

export interface ScreenNavigationModel {
  screenName: string;
  conditionKey?: string | boolean | number;
  navigation: NavigationModel[];
}
