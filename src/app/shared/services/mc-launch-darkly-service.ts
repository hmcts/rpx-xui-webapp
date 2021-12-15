import { Inject, Injectable, InjectionToken } from '@angular/core';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FeatureUser, FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { RootInjectorGuard } from './rootInjectorGuard';

export const MCLAUNCHDARKLYKEY = new InjectionToken<string>('LAUNCHDARKLYKEY');

@Injectable({
    providedIn: 'root'
})
export class McLaunchDarklyService extends RootInjectorGuard implements FeatureToggleService {

    private readonly client: LDClient.LDClient;
    private readonly ready = new BehaviorSubject<boolean>(false);
    private readonly features: Record<string, BehaviorSubject<any>> = {};

    constructor(@Inject(MCLAUNCHDARKLYKEY) key: string) {
        super(FeatureToggleService);
        this.client = LDClient.initialize(key, { anonymous: true }, {});
        this.client.on('ready', () => { this.ready.next(true); });
    }

    public initialize(user: FeatureUser = { anonymous: true }): void {
        this.ready.next(false);
        this.client.identify(user).then(() => this.ready.next(true));
    }

    public isEnabled(feature: string): Observable<boolean> {
        return this.getValue<boolean>(feature, false);
    }

    public getArray<R = any>(feature: string): Observable<R[]> {
        return this.getValue<R[]>(feature, []);
    }

    public getValue<R>(feature: string, defaultValue: R): Observable<R> {
        if (!this.features.hasOwnProperty(feature)) {
            this.features[feature] = new BehaviorSubject<R>(defaultValue);
            this.ready.pipe(
                filter(ready => ready),
                map(() => this.client.variation(feature, defaultValue))
            ).subscribe(value => {
                this.features[feature].next(value);
                this.client.on(`change:${feature}`, (val: R) => {
                    this.features[feature].next(val);
                });
            });
        }
        return this.features[feature].pipe(
            distinctUntilChanged()
        );
    }

    /**
     * This method returns an observable that will only get the state of the feature toggle
     * once. It calls the LD SDK directly, and should only be used in circumstances where
     * only one value should be emitted, that value coming directly from LD. This will likely
     * only apply for Guards, and should be used only when absolutely necessary.
     * @see getValue for regular usage.
     * @param feature string
     * @param defaultValue R
     */
    public getValueOnce<R>(feature: string, defaultValue: R): Observable<R> {
        return this.ready.pipe(
            filter(ready => ready),
            map(() => this.client.variation(feature, defaultValue))
        );
    }
}
