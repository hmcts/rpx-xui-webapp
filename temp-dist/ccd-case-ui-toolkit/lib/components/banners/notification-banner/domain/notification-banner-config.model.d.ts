import { NotificationBannerType } from '../enums/notification-banner-type.enum';
export interface NotificationBannerConfig {
    bannerType: NotificationBannerType;
    headingText: string;
    description: string;
    showLink: boolean;
    linkUrl?: string;
    linkText?: string;
    triggerOutputEvent?: boolean;
    triggerOutputEventText?: string;
    headerClass: string;
}
//# sourceMappingURL=notification-banner-config.model.d.ts.map