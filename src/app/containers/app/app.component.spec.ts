import { AppComponent } from './app.component';
describe('AppComponent', () => {
    let appComponent: AppComponent;
    let store: any;
    let googleAnalyticsService: any;
    let service: any;

    beforeEach(() => {
        store = jasmine.createSpyObj('store', ['pipe', 'dispatch']);
        googleAnalyticsService = jasmine.createSpyObj('GoogleAnalyticsService', ['init']);
        service = jasmine.createSpyObj('ManageSessionServices', ['appStateChanges']);
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
});
