import { ActivatedRouteSnapshot } from '@angular/router';
export declare class TestRouteSnapshotBuilder {
    private parent;
    private params;
    private data;
    withParent(parent: ActivatedRouteSnapshot): TestRouteSnapshotBuilder;
    withParams(params: Object): TestRouteSnapshotBuilder;
    withData(data: Object): TestRouteSnapshotBuilder;
    build(): ActivatedRouteSnapshot;
}
