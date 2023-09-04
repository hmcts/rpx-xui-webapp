import { EventEmitter } from '@angular/core';
import { NotificationBannerConfig } from './domain';
import { NotificationBannerType } from './enums';
import * as i0 from "@angular/core";
export declare class NotificationBannerComponent {
    notificationBannerConfig: NotificationBannerConfig;
    linkClicked: EventEmitter<string>;
    get notificationBannerType(): typeof NotificationBannerType;
    onLinkClick(triggerOutputEventText: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationBannerComponent, "ccd-notification-banner", never, { "notificationBannerConfig": "notificationBannerConfig"; }, { "linkClicked": "linkClicked"; }, never, never, false, never>;
}
//# sourceMappingURL=notification-banner.component.d.ts.map