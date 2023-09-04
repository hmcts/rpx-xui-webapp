import { ActivatedRouteSnapshot } from '@angular/router';
export declare class TestRouteSnapshotBuilder {
    private parent;
    private params;
    private data;
    withParent(parent: ActivatedRouteSnapshot): TestRouteSnapshotBuilder;
    withParams(params: object): TestRouteSnapshotBuilder;
    withData(data: object): TestRouteSnapshotBuilder;
    build(): ActivatedRouteSnapshot;
}
//# sourceMappingURL=test-route-snapshot-builder.d.ts.map