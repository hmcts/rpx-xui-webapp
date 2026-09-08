export interface UserInfo {
  forename?: string;
  given_name?: string;
  surname?: string;
  family_name?: string;
  name?: string;
  email?: string;
  active?: boolean;
  id?: string;
  uid?: string;
  roles?: string[];
  roleCategories?: string[];
  ssoProvider?: string;
  identity?: string;
  sub?: string;
  subname?: string;
  iss?: string;
}
