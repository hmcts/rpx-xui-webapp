import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let appComponent: AppComponent;
    let store: any;
    let googleAnalyticsService: any;
    let service: any;

    beforeEach(() => {
        store = jasmine.createSpyObj('store', ['pipe', 'dispatch']);
        googleAnalyticsService = jasmine.createSpyObj('GoogleAnalyticsService', ['init']);
        service = jasmine.createSpyObj('ManageSessionServices', ['appStateChanges', 'init']);
        appComponent = new AppComponent(store, googleAnalyticsService, service);
    });

    it('Truthy', () => {
        expect(appComponent).toBeTruthy();
        expect(googleAnalyticsService.init).toHaveBeenCalled();
    });

    it('signOutHandler', () => {
        appComponent.signOutHandler();
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('idleServiceEventHandler throw Error for Invalidtype', () => {
        expect(() => appComponent.idleServiceEventHandler({type: 'something'})).toThrow(new Error('Invalid Dispatch session'));
    });

    it('idleServiceEventHandler signout', () => {
        const spyModal = spyOn(appComponent, 'setModal');
        appComponent.idleServiceEventHandler({type: 'signout'});
        expect(spyModal).toHaveBeenCalledWith(undefined, false);
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('idleServiceEventHandler modal', () => {
        const spyModal = spyOn(appComponent, 'setModal');
        appComponent.idleServiceEventHandler({type: 'modal', countdown: 100, isVisible: true});
        expect(spyModal).toHaveBeenCalledWith(100, true);
    });

    it('initIdleService', () => {
        appComponent.initIdleService(10, 100);
        expect(service.init).toHaveBeenCalledWith({
            timeout: 10 * 60,
            idleMilliseconds: (100 * 60) * 1000,
            idleServiceName: 'idleSession',
            keepAliveInSeconds: 5 * 60 * 60,
          });
    });

    it('staySignedInHandler', () => {
        const spyModal = spyOn(appComponent, 'setModal');
        appComponent.staySignedInHandler();
        expect(spyModal).toHaveBeenCalledWith(undefined, false);
    });

    it('setModal', () => {
        appComponent.setModal(100, false);
        expect(appComponent.modalConfig).toEqual({
            countdown: 100,
            isVisible: false
        });
    });

    it('idleServiceEventHandler keepalive', () => {
        const spyModal = spyOn(appComponent, 'setModal');
        appComponent.idleServiceEventHandler({type: 'keepalive'});
        expect(spyModal).not.toHaveBeenCalled();
    });

    it('addIdleServiceListener', () => {
        const spy = spyOn(appComponent, 'idleServiceEventHandler');
        service.appStateChanges.and.returnValue(of({}));
        appComponent.addIdleServiceListener();
        expect(service.appStateChanges).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({});
    });
});
