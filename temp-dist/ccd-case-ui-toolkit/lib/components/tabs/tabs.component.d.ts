import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabComponent } from './tab.component';
import * as i0 from "@angular/core";
export declare class TabsComponent implements AfterContentInit {
    private readonly route;
    tabs: QueryList<ElementRef>;
    panels: QueryList<TabComponent>;
    private readonly panelIds;
    constructor(route: ActivatedRoute);
    ngAfterContentInit(): void;
    show(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsComponent, "cut-tabs", never, {}, {}, ["panels"], ["*"], false, never>;
}
//# sourceMappingURL=tabs.component.d.ts.map