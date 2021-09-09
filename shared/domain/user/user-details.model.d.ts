import { UserInfo } from './user-info.model';
export interface UserDetails {
    sessionTimeout: {
        idleModalDisplayTime: number;
        totalIdleTime: number;
    };
    canShareCases: boolean;
    userInfo: UserInfo;
}
