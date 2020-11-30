import { RoutesRecognized } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let appComponent: AppComponent;
    let store: any;
    let googleTagManagerService: any;
    let googleAnalyticsService: any;
    let timeoutNotificationService: any;
    let router: any;
    let title: any;
    let testRoute: RoutesRecognized;

    beforeEach(() => {
        store = jasmine.createSpyObj('store', ['pipe', 'dispatch']);
        googleAnalyticsService = jasmine.createSpyObj('GoogleAnalyticsService', ['init']);
        googleTagManagerService = jasmine.createSpyObj('GoogleTagManagerService', ['init']);
        timeoutNotificationService = jasmine.createSpyObj('TimeoutNotificationsService', ['notificationOnChange', 'initialise']);
        testRoute = new RoutesRecognized(1, 'test', 'test', {
            url: 'test',
            root: {
                firstChild: {
                    data: { title: 'Test' },
                    url: [],
                    params: {},
                    queryParams: {},
                    fragment: '',
                    outlet: '',
                    component: '',
                    routeConfig: {},
                    root: null,
                    parent: null,
                    firstChild: null,
                    children: [],
                    pathFromRoot: [],
                    paramMap: null,
                    queryParamMap: null
                },
                data: { title: 'Test' },
                url: [],
                params: {},
                queryParams: {},
                fragment: '',
                outlet: '',
                component: '',
                routeConfig: {},
                root: null,
                parent: null,
                children: [],
                pathFromRoot: [],
                paramMap: null,
                queryParamMap: null
            }
        });
        router = { events: of(testRoute) };
        title = jasmine.createSpyObj('Title', ['setTitle']);
        appComponent = new AppComponent(store, googleAnalyticsService, timeoutNotificationService, router, title);
    });

    it('Truthy', () => {
        expect(appComponent).toBeTruthy();
        expect(googleAnalyticsService.init).toHaveBeenCalled();
    });

    it('Calls title service', () => {
        expect(title.setTitle).toHaveBeenCalled();
    });

    it('signOutHandler', () => {
        appComponent.signOutHandler();
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('timeoutNotificationEventHandler throw Error for Invalidtype', () => {
        expect(() => appComponent.timeoutNotificationEventHandler({type: 'something'})).toThrow(new Error('Invalid Timeout Notification Event'));
    });

    it('timeoutNotificationEventHandler signout', () => {
        const spyModal = spyOn(appComponent, 'updateTimeoutModal');
        appComponent.timeoutNotificationEventHandler({eventType: 'sign-out'});
        expect(spyModal).toHaveBeenCalledWith('0 seconds', false);
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('timeoutNotificationEventHandler updateTimeoutModal', () => {
        const spyModal = spyOn(appComponent, 'updateTimeoutModal');
        appComponent.timeoutNotificationEventHandler({eventType: 'countdown', readableCountdown: '100 seconds'});
        expect(spyModal).toHaveBeenCalledWith('100 seconds', true);
    });

    it('initTimeoutNotificationService', () => {
        appComponent.initTimeoutNotificationService(10, 100);
        expect(timeoutNotificationService.initialise).toHaveBeenCalledWith({
            idleModalDisplayTime: (10 * 60) * 1000,
            totalIdleTime: (100 * 60) * 1000,
            idleServiceName: 'idleSession',
          });
    });

    it('staySignedInHandler', () => {
        const spyModal = spyOn(appComponent, 'updateTimeoutModal');
        appComponent.staySignedInHandler();
        expect(spyModal).toHaveBeenCalledWith(undefined, false);
    });

    it('updateTimeoutModal', () => {
        appComponent.updateTimeoutModal('100 seconds', false);
        expect(appComponent.timeoutModalConfig).toEqual({
            countdown: '100 seconds',
            isVisible: false
        });
    });

    it('timeoutNotificationEventHandler keepalive', () => {
        const spyModal = spyOn(appComponent, 'updateTimeoutModal');
        appComponent.timeoutNotificationEventHandler({eventType: 'keep-alive'});
        expect(spyModal).toHaveBeenCalled();
    });

    it('addIdleServiceListener', () => {
        const spy = spyOn(appComponent, 'timeoutNotificationEventHandler');
        timeoutNotificationService.notificationOnChange.and.returnValue(of({}));
        appComponent.addTimeoutNotificationServiceListener();
        expect(timeoutNotificationService.notificationOnChange).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({});
    });
});
