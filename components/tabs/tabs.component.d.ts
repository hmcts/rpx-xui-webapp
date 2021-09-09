import { QueryList, ElementRef, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';
import { ActivatedRoute } from '@angular/router';
export declare class TabsComponent implements AfterContentInit {
    private route;
    tabs: QueryList<ElementRef>;
    panels: QueryList<TabComponent>;
    private panelIds;
    constructor(route: ActivatedRoute);
    ngAfterContentInit(): void;
    show(id: string): void;
}
