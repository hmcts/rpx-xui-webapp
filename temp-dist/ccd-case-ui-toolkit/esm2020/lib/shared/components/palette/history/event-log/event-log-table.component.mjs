import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaseViewEvent } from '../../../../domain';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "../../utils/date.pipe";
import * as i4 from "rpx-xui-translation";
function EventLogTableComponent_tr_20_div_3_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 16);
    i0.ɵɵlistener("click", function EventLogTableComponent_tr_20_div_3_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r9); const event_r1 = i0.ɵɵnextContext(2).$implicit; const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.caseHistoryClicked(event_r1.id)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const event_r1 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", ctx_r6.getAriaLabelforLink(event_r1));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(event_r1.event_name);
} }
function EventLogTableComponent_tr_20_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtemplate(1, EventLogTableComponent_tr_20_div_3_a_1_Template, 2, 2, "a", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const event_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", event_r1.state_id !== "Draft");
} }
const _c0 = function (a2) { return ["./", "event", a2, "history"]; };
function EventLogTableComponent_tr_20_div_4_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const event_r1 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r12 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(4, _c0, event_r1.id))("target", "_blank");
    i0.ɵɵattribute("aria-label", ctx_r12.getAriaLabelforLink(event_r1));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(event_r1.event_name);
} }
function EventLogTableComponent_tr_20_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, EventLogTableComponent_tr_20_div_4_a_1_Template, 2, 6, "a", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const event_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", event_r1.state_id !== "Draft");
} }
function EventLogTableComponent_tr_20_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const event_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(event_r1.event_name);
} }
function EventLogTableComponent_tr_20_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "a", 20);
    i0.ɵɵelement(2, "img", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 22);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const event_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("href", ctx_r5.getSignificantItemUrl(event_r1), i0.ɵɵsanitizeUrl);
    i0.ɵɵattribute("aria-label", ctx_r5.getAriaLabelforLink(event_r1));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r5.getSignificantItemDesc(event_r1));
} }
const _c1 = function (a0) { return { "EventLogTable-Selected": a0 }; };
function EventLogTableComponent_tr_20_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 4);
    i0.ɵɵlistener("click", function EventLogTableComponent_tr_20_Template_tr_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r18); const event_r1 = restoredCtx.$implicit; const ctx_r17 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r17.select(event_r1)); });
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵelementContainerStart(2, 5);
    i0.ɵɵtemplate(3, EventLogTableComponent_tr_20_div_3_Template, 2, 1, "div", 6);
    i0.ɵɵtemplate(4, EventLogTableComponent_tr_20_div_4_Template, 2, 1, "div", 7);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵtemplate(5, EventLogTableComponent_tr_20_span_5_Template, 2, 1, "span", 8);
    i0.ɵɵtemplate(6, EventLogTableComponent_tr_20_div_6_Template, 5, 3, "div", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 10);
    i0.ɵɵlistener("keydown.enter", function EventLogTableComponent_tr_20_Template_td_keydown_enter_7_listener() { const restoredCtx = i0.ɵɵrestoreView(_r18); const event_r1 = restoredCtx.$implicit; const ctx_r19 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r19.select(event_r1)); });
    i0.ɵɵelementStart(8, "div", 11);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "ccdDate");
    i0.ɵɵelementStart(11, "span", 12);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "rpxTranslate");
    i0.ɵɵpipe(14, "ccdDate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "td", 13)(16, "span", 2);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "titlecase");
    i0.ɵɵpipe(19, "uppercase");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const event_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(25, _c1, ctx_r0.selected === event_r1));
    i0.ɵɵattribute("aria-label", ctx_r0.getAriaLabelforRow(event_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngSwitch", ctx_r0.isPartOfCaseTimeline);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", true);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", false);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", event_r1.state_id === "Draft");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.significantItemExist(event_r1));
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("aria-label", ctx_r0.getAriaLabelforColumn(event_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(10, 13, event_r1.timestamp, "local"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(13, 16, "Local:"), " ", i0.ɵɵpipeBind2(14, 18, event_r1.timestamp, "local"), "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(18, 21, event_r1.user_first_name), " ", i0.ɵɵpipeBind1(19, 23, event_r1.user_last_name), "");
} }
export class EventLogTableComponent {
    constructor() {
        this.onSelect = new EventEmitter();
        this.onCaseHistory = new EventEmitter();
        this.isPartOfCaseTimeline = false;
    }
    ngOnInit() {
        this.isPartOfCaseTimeline = this.onCaseHistory.observers.length > 0;
    }
    select(event) {
        this.selected = event;
        this.onSelect.emit(event);
    }
    significantItemExist(event) {
        return (event.significant_item &&
            event.significant_item.type === 'DOCUMENT' &&
            event.significant_item.url !== undefined &&
            event.significant_item.description !== undefined);
    }
    getSignificantItemUrl(event) {
        if (event.significant_item) {
            return event.significant_item.url;
        }
    }
    getSignificantItemDesc(event) {
        if (event.significant_item) {
            return event.significant_item.description;
        }
    }
    caseHistoryClicked(eventId) {
        this.onCaseHistory.emit(eventId);
    }
    getAriaLabelforColumn(event) {
        if (this.selected !== event) {
            return `date ${formatDate(event.timestamp, 'dd MMM yyyy hh:mm:ss a', 'en-GB')},
        press enter key for event ${event.event_name} details`;
        }
        else {
            return '';
        }
    }
    getAriaLabelforRow(event) {
        return `you are on event ${event.event_name} row, press tab key to navigate to columns`;
    }
    getAriaLabelforLink(event) {
        return `press enter key to open event ${event.event_name} link in separate window`;
    }
}
EventLogTableComponent.ɵfac = function EventLogTableComponent_Factory(t) { return new (t || EventLogTableComponent)(); };
EventLogTableComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventLogTableComponent, selectors: [["ccd-event-log-table"]], inputs: { events: "events", selected: "selected" }, outputs: { onSelect: "onSelect", onCaseHistory: "onCaseHistory" }, decls: 21, vars: 13, consts: [[1, "EventLogTable"], [1, "heading-h2"], [1, "text-16"], ["tabindex", "0", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "ngClass", "click"], [3, "ngSwitch"], ["id", "case-timeline", 4, "ngSwitchCase"], [4, "ngSwitchCase"], [4, "ngIf"], ["class", "tooltip", 4, "ngIf"], ["tabindex", "0", 3, "keydown.enter"], [1, "tooltip", "text-16"], [1, "tooltiptext"], ["tabindex", "0"], ["id", "case-timeline"], ["class", "text-16 event-link", 3, "click", 4, "ngIf"], [1, "text-16", "event-link", 3, "click"], ["class", "text-16 event-link", 3, "routerLink", "target", 4, "ngIf"], [1, "text-16", "event-link", 3, "routerLink", "target"], [1, "tooltip"], ["target", "_blank", "rel", "noopener", 3, "href"], ["alt", "document image", "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABoCAYAAABmOHdtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4yMfEgaZUAAAkoSURBVHhe7d33c5RFHAZw/wCKiF0s2LAwiigq9l5G/UV/UUeFkEAoQqiWoKKI1Dg6YxQQbGmkXQoJIQQiaSShhiQMkgIphCSXkN4buPtcnnDG9fXCa+FN9mY+M5Lce7f3ZPb2u/vu+3rRsKn+Z4ey4e7BIB4XnQ8doA7QHB2gSTpAk3SAJlk+wOG9VL/7L+gATbrgAxzlHgAM6skVcTDhw2i4daENXvbZCXd9EAU8fqRbADi/5j9JB2jSBRvg2Hmh8MAnMbAl/Ths+jUPqhvboLapHXJKTkPU/mKI2FcEdyyJhOvmhoLqvczQAZp0wQU4YVEAuPnGw5GTtdDd0wOdXd3Q1uGQXVID/HlXdw+0tHVCWU0zvLMhFSZ5R4Dqvc+HDtCkCybAW8RAIHn6xkJpuR3aOrqgqqEVPDanwZu+u8HLLwPY1aduTAF7fSvwuLqmNliweRfc6x0JqrYMxN8FONwj9Cz0Pq8/HWBvEP2Do389wFHugTDROxqOldcDu2hmfiXcucQGN8wLgxHiWOnc6zjKncs9t8DVs4Ih+kAxFFY2QK0IUXr1q11wvRhYJOc2DQSD6B8cDXMLPAuKYyUd4P8d4Eg3B7+UfOgRA4V0XHxYafx7kcCCePT0IHhudTyEZZ6Al9YlAAO+bEbQH8RlnYT6lg4oqW6CG+eHw7Apfg6KNhrRAVo9wAeXxcKu3DJgOTLn53S4cmYwMLiA1AI4VdsCja0dwC5feroZOKXjcWO9woDHtbSLMkfYmHgMVG1zhQ7Q6gHyg/IDnbA3AssRLiLM/SUDyutagc8vrmoEDj4suAsqGuCa2SFwuWcQLAzIhJ6eMxCYVgi3LY4AVRuN6ACtHuALaxKgobUT8kUI0uRlMcAy5+fkfOjsktO5nr4pHrvmG75JUFzdDE1iGie9/s1uuHiaP7y4NgH4B8gtrYFJH8eAqo1GdIBWD5BTs6KqJmCZMW5RBLAgfmd9MvDxeeRhYNe7QhTPUqWYvkFdC2xK/A34fl9EHYZ80b2lmqZ2GPNuKDi3zRU6QKsHyC7F4PjB7vsoBi6eFgCBaQXQ0dkN2cWn4VJRJEvsgtuzSqFdPEd6ZlU8cKr31BfxwN/zDzdZlFKSqo1GdIBWD3D8+1HAQvhQUTWc+/J3BLj1QDHwyz+zwA4MhoH/euQUsJzhFO8SjwC4X4QscZks6Wg5vOKzE1RtNKIDtHqAb36bBOVieiXVN7cDB4crZ24Bt+9TgQXwmpgc4GDDQrm6oRUqxAAi+cTmwAg3f+Agwikfnz9mdjCo2mhEB2j1AN/6Lgn4gVhWjFtkg9EegbA8MgvYNW37ioFTNRbUHIRYmE8XJZLE5TD+u0EMWNLpxjbg8ao2GtEBWj3AmxeEAx9ZYgCR5vllAAeR2EMl0NDSDnweBxGWKzyxztObj6/YDix3uHzGQcS2twg42KjaaEQHaPUAH/9cfEChTgwcUm1zBzz82TZgF14hvvglLiYE7SkEdmEuzXM5jIW55w9pwFMHM8R/S/0Ld8t2YR2g4ocD4bYxBfYXVgG/3Lm5iEv67ptSgY8vt+UCt7dd+24osBzilo5l4QeBC7OrtmYDyxwue42ZEwKqNhrRAVo9QBbMreILXWIXfHtDCnAQCU4/DpzK7cmrgNHTRRcXuBiwJ68S+HrPrNoBl4ivAenplduBiwmJuWXAKZ6qjUZ0gIMlwOa2DiiqaoS31ydDX4BiwJAYYNqxCmB5wkEnI98OXJx4emU8jHKX2z/8UepIDHBXThnoAIdqgAyKm4h4ovxGr1DoG0S+TwE+1okBRLpFFOHSdXPDgEv6nBouDT0AfL/V0Yfhz4NIKDi3zRU6QKsH+NCnscBFBBbULLA5SKyMzgYu6funFsBVs4Lh5gU2KBGhSXy9KRuSgYsJM3/cAyyX8srrYaxXOKjaaEQHaPUAOYXqFhN/iSfMFwdmAhcLth8uBXbxgyeqgL/nhTbx4jkSNylxcOAmo4dEqSNxEAkRpZH0wtoEULXRiA7Q6gG+9nUiFFY2Aif549+LAJYpq7bmABdUt4iSRrp6dghwaZ8bJ9mFueWDS/qzf0qHxtZOsNe3ADdmqtpoRAdo9QB5OrFYfGiJZcWED6OAWzs8f0wHnlRaHpEFXJBlucM/AKeEH4UdAC4mrI3NBS46cAsIl8VUbTSiA7R6gFyOYnBHy+pgmiiaJW5L25F9ErhIkHy0HPj7J1bEAZfFuPD66PI44GDz8Kdiyie0d3ZBgpjGSc+K6Z2kaqMRHaDVA3xMfDiJW3W5NfeRz7YBP3h45nHoEKWJtK/QDiy0n1udAPx5S3sX3Lt0KzDo59fsAAbIQnri0mhQtdGIDtDqAbJ8mLIhBbi5nFs6eKE0p2B8LAnaCzfNDwdukOQF2OzK3MrB91sXmwMn7A3ARQXLDiI6QMUPzwfLDE76+XMW0ryEn4PDT0l5wNOeDJqDREh6IfAPwdOaz68WXVjglJCD1kTRzSXnNrlCBzhYAvwrnIIliBJG4pI+bzLBJX8+n4MO/yA8ngFy0OKUMPVYBXDp3/m9XaEDHOwBcirHDZWcyn0spmcSp3CqY50xUF4yxsHjVE0z8JYDqmON6AAHe4C8gIYX1jBAn225wPJFdawzBsibVHARgUFyEFIda0QHONgDpK/jcoHlB28e4WoBfKmY7kncUtzVLW/S091XHvHiRtWxRnSAgz7A3ptBcNmLS/a8+VjU/iLg7U5YtvB4bioatzAceHkrb27Bk0osf/7w3i7QAQ76AHtxAyVPlPNWTly6z8ivhDd8d8NLPjvBY1Mq8CZlvClZQXkd8OJDHaAO0DWTvG3gtTkRePqSgwJPmPMSLm5zO3PmDBRW1IPHehGucNuicFC9lyt0gEMtQLr7gyjg1g0uCrCrcoq2t8AOyb9VABcTbl9sA9VrD4QOUPHaA2HZAIk3Fxsx1Q/u8Y4GBsugeVKJ2+FUr3U+dIAmWT7A/5sO0CQdoEk6QJN0gCbpAE0yHSBfYKgaMcMG/YMjHeDfMB2g6iDtHB2gSTpAk3SAJukATdIBmvSvBcj/UUnfGwxWitCcKcNxhQ7QQRmOK1iIql50KFGG4wodoIMyHFfoAB2U4bhCB+igDMcVOkAHZTiu0AFK/md/Bw8XevIIyEqZAAAAAElFTkSuQmCC", 1, "doc-img"], [1, "tooltiptext", "doc-tooltip"]], template: function EventLogTableComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "table", 0)(1, "caption")(2, "h2", 1);
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(5, "thead")(6, "tr")(7, "th")(8, "span", 2);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(11, "th")(12, "span", 2);
        i0.ɵɵtext(13);
        i0.ɵɵpipe(14, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(15, "th")(16, "span", 2);
        i0.ɵɵtext(17);
        i0.ɵɵpipe(18, "rpxTranslate");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(19, "tbody");
        i0.ɵɵtemplate(20, EventLogTableComponent_tr_20_Template, 20, 27, "tr", 3);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 5, "History"));
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 7, "Event"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 9, "Date"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 11, "Author"));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.events);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i1.NgSwitch, i1.NgSwitchCase, i2.RouterLink, i1.UpperCasePipe, i1.TitleCasePipe, i3.DatePipe, i4.RpxTranslatePipe], styles: ["#case-timeline[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer;text-decoration:underline;color:#005ea5}#case-timeline[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#2b8cc4}#case-timeline[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited{color:#4c2c92}.EventLogTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{padding-left:10px}.EventLogTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] > tr.EventLogTable-Selected[_ngcontent-%COMP%]{border-left:8px solid #005ea5;background-color:#f8f8f8}.EventLogTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] > tr.EventLogTable-Selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{padding-left:6px}.EventLogTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:not(.EventLogTable-Selected):hover{border-left:8px solid #2b8cc4;background-color:#f8f8f8;cursor:pointer;cursor:hand}.EventLogTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:not(.EventLogTable-Selected):hover   td[_ngcontent-%COMP%]:first-child{padding-left:6px}.EventLogTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]   .event-link[_ngcontent-%COMP%]{float:left;padding-right:8px}.EventLogTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]   .doc-img[_ngcontent-%COMP%]{width:16px;float:left}.EventLogTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]   .doc-tooltip[_ngcontent-%COMP%]{left:35%;bottom:7px}.EventLogTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]   .doc-tooltip[_ngcontent-%COMP%]:after{border-color:transparent}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventLogTableComponent, [{
        type: Component,
        args: [{ selector: 'ccd-event-log-table', template: "<table class=\"EventLogTable\">\n  <caption><h2 class=\"heading-h2\">{{'History' | rpxTranslate}}</h2></caption>\n  <thead>\n  <tr>\n    <th><span class=\"text-16\">{{'Event' | rpxTranslate}}</span></th>\n    <th><span class=\"text-16\">{{'Date' | rpxTranslate}}</span></th>\n    <th><span class=\"text-16\">{{'Author' | rpxTranslate}}</span></th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr *ngFor=\"let event of events\" (click)=\"select(event)\" [ngClass]=\"{'EventLogTable-Selected': selected === event}\" tabindex=\"0\" attr.aria-label=\"{{getAriaLabelforRow(event)}}\">\n    <td>\n      <ng-container [ngSwitch]=\"isPartOfCaseTimeline\">\n        <div id=\"case-timeline\" *ngSwitchCase=\"true\">\n          <a (click)=\"caseHistoryClicked(event.id)\"\n            *ngIf=\"event.state_id !== 'Draft'\" class=\"text-16 event-link\" attr.aria-label=\"{{getAriaLabelforLink(event)}}\">{{event.event_name}}</a>\n          </div>\n        <div *ngSwitchCase=\"false\">\n          <a [routerLink]=\"['./', 'event', event.id, 'history']\"\n              [target]=\"'_blank'\"\n              *ngIf=\"event.state_id !== 'Draft'\" class=\"text-16 event-link\" attr.aria-label=\"{{getAriaLabelforLink(event)}}\">{{event.event_name}}</a>\n        </div>\n      </ng-container>\n      <span *ngIf=\"event.state_id === 'Draft'\">{{event.event_name}}</span>\n      <div class=\"tooltip\" *ngIf=\"significantItemExist(event)\">\n        <a href=\"{{getSignificantItemUrl(event)}}\" target=\"_blank\" rel=\"noopener\" attr.aria-label=\"{{getAriaLabelforLink(event)}}\">\n          <img class=\"doc-img\" alt=\"document image\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABoCAYAAABmOHdtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4yMfEgaZUAAAkoSURBVHhe7d33c5RFHAZw/wCKiF0s2LAwiigq9l5G/UV/UUeFkEAoQqiWoKKI1Dg6YxQQbGmkXQoJIQQiaSShhiQMkgIphCSXkN4buPtcnnDG9fXCa+FN9mY+M5Lce7f3ZPb2u/vu+3rRsKn+Z4ey4e7BIB4XnQ8doA7QHB2gSTpAk3SAJlk+wOG9VL/7L+gATbrgAxzlHgAM6skVcTDhw2i4daENXvbZCXd9EAU8fqRbADi/5j9JB2jSBRvg2Hmh8MAnMbAl/Ths+jUPqhvboLapHXJKTkPU/mKI2FcEdyyJhOvmhoLqvczQAZp0wQU4YVEAuPnGw5GTtdDd0wOdXd3Q1uGQXVID/HlXdw+0tHVCWU0zvLMhFSZ5R4Dqvc+HDtCkCybAW8RAIHn6xkJpuR3aOrqgqqEVPDanwZu+u8HLLwPY1aduTAF7fSvwuLqmNliweRfc6x0JqrYMxN8FONwj9Cz0Pq8/HWBvEP2Do389wFHugTDROxqOldcDu2hmfiXcucQGN8wLgxHiWOnc6zjKncs9t8DVs4Ih+kAxFFY2QK0IUXr1q11wvRhYJOc2DQSD6B8cDXMLPAuKYyUd4P8d4Eg3B7+UfOgRA4V0XHxYafx7kcCCePT0IHhudTyEZZ6Al9YlAAO+bEbQH8RlnYT6lg4oqW6CG+eHw7Apfg6KNhrRAVo9wAeXxcKu3DJgOTLn53S4cmYwMLiA1AI4VdsCja0dwC5feroZOKXjcWO9woDHtbSLMkfYmHgMVG1zhQ7Q6gHyg/IDnbA3AssRLiLM/SUDyutagc8vrmoEDj4suAsqGuCa2SFwuWcQLAzIhJ6eMxCYVgi3LY4AVRuN6ACtHuALaxKgobUT8kUI0uRlMcAy5+fkfOjsktO5nr4pHrvmG75JUFzdDE1iGie9/s1uuHiaP7y4NgH4B8gtrYFJH8eAqo1GdIBWD5BTs6KqJmCZMW5RBLAgfmd9MvDxeeRhYNe7QhTPUqWYvkFdC2xK/A34fl9EHYZ80b2lmqZ2GPNuKDi3zRU6QKsHyC7F4PjB7vsoBi6eFgCBaQXQ0dkN2cWn4VJRJEvsgtuzSqFdPEd6ZlU8cKr31BfxwN/zDzdZlFKSqo1GdIBWD3D8+1HAQvhQUTWc+/J3BLj1QDHwyz+zwA4MhoH/euQUsJzhFO8SjwC4X4QscZks6Wg5vOKzE1RtNKIDtHqAb36bBOVieiXVN7cDB4crZ24Bt+9TgQXwmpgc4GDDQrm6oRUqxAAi+cTmwAg3f+Agwikfnz9mdjCo2mhEB2j1AN/6Lgn4gVhWjFtkg9EegbA8MgvYNW37ioFTNRbUHIRYmE8XJZLE5TD+u0EMWNLpxjbg8ao2GtEBWj3AmxeEAx9ZYgCR5vllAAeR2EMl0NDSDnweBxGWKzyxztObj6/YDix3uHzGQcS2twg42KjaaEQHaPUAH/9cfEChTgwcUm1zBzz82TZgF14hvvglLiYE7SkEdmEuzXM5jIW55w9pwFMHM8R/S/0Ld8t2YR2g4ocD4bYxBfYXVgG/3Lm5iEv67ptSgY8vt+UCt7dd+24osBzilo5l4QeBC7OrtmYDyxwue42ZEwKqNhrRAVo9QBbMreILXWIXfHtDCnAQCU4/DpzK7cmrgNHTRRcXuBiwJ68S+HrPrNoBl4ivAenplduBiwmJuWXAKZ6qjUZ0gIMlwOa2DiiqaoS31ydDX4BiwJAYYNqxCmB5wkEnI98OXJx4emU8jHKX2z/8UepIDHBXThnoAIdqgAyKm4h4ovxGr1DoG0S+TwE+1okBRLpFFOHSdXPDgEv6nBouDT0AfL/V0Yfhz4NIKDi3zRU6QKsH+NCnscBFBBbULLA5SKyMzgYu6funFsBVs4Lh5gU2KBGhSXy9KRuSgYsJM3/cAyyX8srrYaxXOKjaaEQHaPUAOYXqFhN/iSfMFwdmAhcLth8uBXbxgyeqgL/nhTbx4jkSNylxcOAmo4dEqSNxEAkRpZH0wtoEULXRiA7Q6gG+9nUiFFY2Aif549+LAJYpq7bmABdUt4iSRrp6dghwaZ8bJ9mFueWDS/qzf0qHxtZOsNe3ADdmqtpoRAdo9QB5OrFYfGiJZcWED6OAWzs8f0wHnlRaHpEFXJBlucM/AKeEH4UdAC4mrI3NBS46cAsIl8VUbTSiA7R6gFyOYnBHy+pgmiiaJW5L25F9ErhIkHy0HPj7J1bEAZfFuPD66PI44GDz8Kdiyie0d3ZBgpjGSc+K6Z2kaqMRHaDVA3xMfDiJW3W5NfeRz7YBP3h45nHoEKWJtK/QDiy0n1udAPx5S3sX3Lt0KzDo59fsAAbIQnri0mhQtdGIDtDqAbJ8mLIhBbi5nFs6eKE0p2B8LAnaCzfNDwdukOQF2OzK3MrB91sXmwMn7A3ARQXLDiI6QMUPzwfLDE76+XMW0ryEn4PDT0l5wNOeDJqDREh6IfAPwdOaz68WXVjglJCD1kTRzSXnNrlCBzhYAvwrnIIliBJG4pI+bzLBJX8+n4MO/yA8ngFy0OKUMPVYBXDp3/m9XaEDHOwBcirHDZWcyn0spmcSp3CqY50xUF4yxsHjVE0z8JYDqmON6AAHe4C8gIYX1jBAn225wPJFdawzBsibVHARgUFyEFIda0QHONgDpK/jcoHlB28e4WoBfKmY7kncUtzVLW/S091XHvHiRtWxRnSAgz7A3ptBcNmLS/a8+VjU/iLg7U5YtvB4bioatzAceHkrb27Bk0osf/7w3i7QAQ76AHtxAyVPlPNWTly6z8ivhDd8d8NLPjvBY1Mq8CZlvClZQXkd8OJDHaAO0DWTvG3gtTkRePqSgwJPmPMSLm5zO3PmDBRW1IPHehGucNuicFC9lyt0gEMtQLr7gyjg1g0uCrCrcoq2t8AOyb9VABcTbl9sA9VrD4QOUPHaA2HZAIk3Fxsx1Q/u8Y4GBsugeVKJ2+FUr3U+dIAmWT7A/5sO0CQdoEk6QJN0gCbpAE0yHSBfYKgaMcMG/YMjHeDfMB2g6iDtHB2gSTpAk3SAJukATdIBmvSvBcj/UUnfGwxWitCcKcNxhQ7QQRmOK1iIql50KFGG4wodoIMyHFfoAB2U4bhCB+igDMcVOkAHZTiu0AFK/md/Bw8XevIIyEqZAAAAAElFTkSuQmCC\"/>\n        </a>\n        <span class=\"tooltiptext doc-tooltip\">{{getSignificantItemDesc(event)}}</span>\n      </div>\n    </td>\n    <td tabindex=\"0\" attr.aria-label=\"{{getAriaLabelforColumn(event)}}\" (keydown.enter)=\"select(event)\"><div class=\"tooltip text-16\">{{event.timestamp | ccdDate : 'local'}}\n      <span class=\"tooltiptext\">{{'Local:' | rpxTranslate}} {{event.timestamp | ccdDate : 'local'}}</span>\n    </div></td>\n    <td tabindex=\"0\"><span class=\"text-16\">{{event.user_first_name | titlecase}} {{event.user_last_name | uppercase}}</span></td>\n  </tr>\n  </tbody>\n</table>\n", styles: ["#case-timeline a{cursor:pointer;text-decoration:underline;color:#005ea5}#case-timeline a:hover{color:#2b8cc4}#case-timeline a:visited{color:#4c2c92}.EventLogTable tbody>tr td:first-child{padding-left:10px}.EventLogTable tbody>tr.EventLogTable-Selected{border-left:8px solid #005ea5;background-color:#f8f8f8}.EventLogTable tbody>tr.EventLogTable-Selected td:first-child{padding-left:6px}.EventLogTable tbody>tr:not(.EventLogTable-Selected):hover{border-left:8px solid #2b8cc4;background-color:#f8f8f8;cursor:pointer;cursor:hand}.EventLogTable tbody>tr:not(.EventLogTable-Selected):hover td:first-child{padding-left:6px}.EventLogTable tbody>tr .event-link{float:left;padding-right:8px}.EventLogTable tbody>tr .doc-img{width:16px;float:left}.EventLogTable tbody>tr .doc-tooltip{left:35%;bottom:7px}.EventLogTable tbody>tr .doc-tooltip:after{border-color:transparent}\n"] }]
    }], null, { events: [{
            type: Input
        }], selected: [{
            type: Input
        }], onSelect: [{
            type: Output
        }], onCaseHistory: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtbG9nLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2hpc3RvcnkvZXZlbnQtbG9nL2V2ZW50LWxvZy10YWJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9oaXN0b3J5L2V2ZW50LWxvZy9ldmVudC1sb2ctdGFibGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7OztJQ1l6Qyw2QkFDaUg7SUFEOUcsd05BQVMsZUFBQSxzQ0FBNEIsQ0FBQSxJQUFDO0lBQ3dFLFlBQW9CO0lBQUEsaUJBQUk7Ozs7SUFBekUsa0VBQWdEO0lBQUMsZUFBb0I7SUFBcEIseUNBQW9COzs7SUFGdkksK0JBQTZDO0lBQzNDLGdGQUN5STtJQUN6SSxpQkFBTTs7O0lBREgsZUFBZ0M7SUFBaEMsb0RBQWdDOzs7O0lBR25DLDZCQUVtSDtJQUFBLFlBQW9CO0lBQUEsaUJBQUk7Ozs7SUFGeEksb0VBQW1ELG9CQUFBO0lBRVksbUVBQWdEO0lBQUMsZUFBb0I7SUFBcEIseUNBQW9COzs7SUFIekksMkJBQTJCO0lBQ3pCLGdGQUUySTtJQUM3SSxpQkFBTTs7O0lBREMsZUFBZ0M7SUFBaEMsb0RBQWdDOzs7SUFHekMsNEJBQXlDO0lB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VSxDQUFDO1NBQzFEO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVNLGtCQUFrQixDQUFDLEtBQW9CO1FBQzVDLE9BQU8sb0JBQW9CLEtBQUssQ0FBQyxVQUFVLDRDQUE0QyxDQUFDO0lBQzFGLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxLQUFvQjtRQUM3QyxPQUFPLGlDQUFpQyxLQUFLLENBQUMsVUFBVSwwQkFBMEIsQ0FBQztJQUNyRixDQUFDOzs0RkEvRFUsc0JBQXNCO3lFQUF0QixzQkFBc0I7UUNUbkMsZ0NBQTZCLGNBQUEsWUFBQTtRQUNLLFlBQTRCOztRQUFBLGlCQUFLLEVBQUE7UUFDakUsNkJBQU8sU0FBQSxTQUFBLGNBQUE7UUFFcUIsWUFBMEI7O1FBQUEsaUJBQU8sRUFBQTtRQUMzRCwyQkFBSSxlQUFBO1FBQXNCLGFBQXlCOztRQUFBLGlCQUFPLEVBQUE7UUFDMUQsMkJBQUksZUFBQTtRQUFzQixhQUEyQjs7UUFBQSxpQkFBTyxFQUFBLEVBQUEsRUFBQTtRQUc5RCw4QkFBTztRQUNQLHlFQXlCSztRQUNMLGlCQUFRLEVBQUE7O1FBbkN3QixlQUE0QjtRQUE1QixxREFBNEI7UUFHaEMsZUFBMEI7UUFBMUIsb0RBQTBCO1FBQzFCLGVBQXlCO1FBQXpCLG1EQUF5QjtRQUN6QixlQUEyQjtRQUEzQixzREFBMkI7UUFJakMsZUFBUztRQUFULG9DQUFTOzt1RkREcEIsc0JBQXNCO2NBTGxDLFNBQVM7MkJBQ0UscUJBQXFCO2dCQU94QixNQUFNO2tCQURaLEtBQUs7WUFJQyxRQUFRO2tCQURkLEtBQUs7WUFJQyxRQUFRO2tCQURkLE1BQU07WUFJQSxhQUFhO2tCQURuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlVmlld0V2ZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vZG9tYWluJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWV2ZW50LWxvZy10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ldmVudC1sb2ctdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ldmVudC1sb2ctdGFibGUuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEV2ZW50TG9nVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBldmVudHM6IENhc2VWaWV3RXZlbnRbXTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2VsZWN0ZWQ6IENhc2VWaWV3RXZlbnQ7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FzZVZpZXdFdmVudD4oKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uQ2FzZUhpc3RvcnkgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwdWJsaWMgaXNQYXJ0T2ZDYXNlVGltZWxpbmUgPSBmYWxzZTtcblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc1BhcnRPZkNhc2VUaW1lbGluZSA9IHRoaXMub25DYXNlSGlzdG9yeS5vYnNlcnZlcnMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3QoZXZlbnQ6IENhc2VWaWV3RXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gZXZlbnQ7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBzaWduaWZpY2FudEl0ZW1FeGlzdChldmVudDogQ2FzZVZpZXdFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoZXZlbnQuc2lnbmlmaWNhbnRfaXRlbSAmJlxuICAgICAgICBldmVudC5zaWduaWZpY2FudF9pdGVtLnR5cGUgPT09ICdET0NVTUVOVCcgJiZcbiAgICAgICAgZXZlbnQuc2lnbmlmaWNhbnRfaXRlbS51cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBldmVudC5zaWduaWZpY2FudF9pdGVtLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpO1xuICB9XG5cbiAgcHVibGljIGdldFNpZ25pZmljYW50SXRlbVVybChldmVudDogQ2FzZVZpZXdFdmVudCk6IHN0cmluZyB7XG4gICAgaWYgKGV2ZW50LnNpZ25pZmljYW50X2l0ZW0pIHtcbiAgICAgIHJldHVybiBldmVudC5zaWduaWZpY2FudF9pdGVtLnVybDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0U2lnbmlmaWNhbnRJdGVtRGVzYyhldmVudDogQ2FzZVZpZXdFdmVudCk6IHN0cmluZyB7XG4gICAgaWYgKGV2ZW50LnNpZ25pZmljYW50X2l0ZW0pIHtcbiAgICAgIHJldHVybiBldmVudC5zaWduaWZpY2FudF9pdGVtLmRlc2NyaXB0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjYXNlSGlzdG9yeUNsaWNrZWQoZXZlbnRJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5vbkNhc2VIaXN0b3J5LmVtaXQoZXZlbnRJZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXJpYUxhYmVsZm9yQ29sdW1uKGV2ZW50OiBDYXNlVmlld0V2ZW50KTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZCAhPT0gZXZlbnQpIHtcbiAgICAgIHJldHVybiBgZGF0ZSAke2Zvcm1hdERhdGUoZXZlbnQudGltZXN0YW1wLCAnZGQgTU1NIHl5eXkgaGg6bW06c3MgYScsICdlbi1HQicpfSxcbiAgICAgICAgcHJlc3MgZW50ZXIga2V5IGZvciBldmVudCAke2V2ZW50LmV2ZW50X25hbWV9IGRldGFpbHNgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldEFyaWFMYWJlbGZvclJvdyhldmVudDogQ2FzZVZpZXdFdmVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB5b3UgYXJlIG9uIGV2ZW50ICR7ZXZlbnQuZXZlbnRfbmFtZX0gcm93LCBwcmVzcyB0YWIga2V5IHRvIG5hdmlnYXRlIHRvIGNvbHVtbnNgO1xuICB9XG5cbiAgcHVibGljIGdldEFyaWFMYWJlbGZvckxpbmsoZXZlbnQ6IENhc2VWaWV3RXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBgcHJlc3MgZW50ZXIga2V5IHRvIG9wZW4gZXZlbnQgJHtldmVudC5ldmVudF9uYW1lfSBsaW5rIGluIHNlcGFyYXRlIHdpbmRvd2A7XG4gIH1cbn1cbiIsIjx0YWJsZSBjbGFzcz1cIkV2ZW50TG9nVGFibGVcIj5cbiAgPGNhcHRpb24+PGgyIGNsYXNzPVwiaGVhZGluZy1oMlwiPnt7J0hpc3RvcnknIHwgcnB4VHJhbnNsYXRlfX08L2gyPjwvY2FwdGlvbj5cbiAgPHRoZWFkPlxuICA8dHI+XG4gICAgPHRoPjxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7J0V2ZW50JyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPjwvdGg+XG4gICAgPHRoPjxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7J0RhdGUnIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+PC90aD5cbiAgICA8dGg+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3snQXV0aG9yJyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPjwvdGg+XG4gIDwvdHI+XG4gIDwvdGhlYWQ+XG4gIDx0Ym9keT5cbiAgPHRyICpuZ0Zvcj1cImxldCBldmVudCBvZiBldmVudHNcIiAoY2xpY2spPVwic2VsZWN0KGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsnRXZlbnRMb2dUYWJsZS1TZWxlY3RlZCc6IHNlbGVjdGVkID09PSBldmVudH1cIiB0YWJpbmRleD1cIjBcIiBhdHRyLmFyaWEtbGFiZWw9XCJ7e2dldEFyaWFMYWJlbGZvclJvdyhldmVudCl9fVwiPlxuICAgIDx0ZD5cbiAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImlzUGFydE9mQ2FzZVRpbWVsaW5lXCI+XG4gICAgICAgIDxkaXYgaWQ9XCJjYXNlLXRpbWVsaW5lXCIgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICAgICAgICA8YSAoY2xpY2spPVwiY2FzZUhpc3RvcnlDbGlja2VkKGV2ZW50LmlkKVwiXG4gICAgICAgICAgICAqbmdJZj1cImV2ZW50LnN0YXRlX2lkICE9PSAnRHJhZnQnXCIgY2xhc3M9XCJ0ZXh0LTE2IGV2ZW50LWxpbmtcIiBhdHRyLmFyaWEtbGFiZWw9XCJ7e2dldEFyaWFMYWJlbGZvckxpbmsoZXZlbnQpfX1cIj57e2V2ZW50LmV2ZW50X25hbWV9fTwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJy4vJywgJ2V2ZW50JywgZXZlbnQuaWQsICdoaXN0b3J5J11cIlxuICAgICAgICAgICAgICBbdGFyZ2V0XT1cIidfYmxhbmsnXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJldmVudC5zdGF0ZV9pZCAhPT0gJ0RyYWZ0J1wiIGNsYXNzPVwidGV4dC0xNiBldmVudC1saW5rXCIgYXR0ci5hcmlhLWxhYmVsPVwie3tnZXRBcmlhTGFiZWxmb3JMaW5rKGV2ZW50KX19XCI+e3tldmVudC5ldmVudF9uYW1lfX08L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8c3BhbiAqbmdJZj1cImV2ZW50LnN0YXRlX2lkID09PSAnRHJhZnQnXCI+e3tldmVudC5ldmVudF9uYW1lfX08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcFwiICpuZ0lmPVwic2lnbmlmaWNhbnRJdGVtRXhpc3QoZXZlbnQpXCI+XG4gICAgICAgIDxhIGhyZWY9XCJ7e2dldFNpZ25pZmljYW50SXRlbVVybChldmVudCl9fVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCIgYXR0ci5hcmlhLWxhYmVsPVwie3tnZXRBcmlhTGFiZWxmb3JMaW5rKGV2ZW50KX19XCI+XG4gICAgICAgICAgPGltZyBjbGFzcz1cImRvYy1pbWdcIiBhbHQ9XCJkb2N1bWVudCBpbWFnZVwiIHNyYz1cImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRkFBQUFCb0NBWUFBQUJtT0hkdEFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFBbHdTRmx6QUFBT3d3QUFEc01CeDIrb1pBQUFBQmwwUlZoMFUyOW1kSGRoY21VQWNHRnBiblF1Ym1WMElEUXVNQzR5TWZFZ2FaVUFBQWtvU1VSQlZIaGU3ZDMzYzVSRkhBWncvd0NLaUYwczJMQXdpaWdxOWw1Ry9VVi9VVWVGa0VBb1FxaVdvS0tJMURnNll4UVFiR21rWFFvSklRUWlhU1NoaGlRTWtnSXBoQ1NYa040YnVQdGNubkRHOWZYQ2ErRk45bVkrTTVMY2U3ZjNaUGIydS92dSszclJzS24rWjRleTRlN0JJQjRYblE4ZG9BN1FIQjJnU1RwQWszU0FKbGsrd09HOVZMLzdMK2dBVGJyZ0F4emxIZ0FNNnNrVmNURGh3Mmk0ZGFFTlh2YlpDWGQ5RUFVOGZxUmJBRGkvNWo5SkIyalNCUnZnMkhtaDhNQW5NYkFsL1RocytqVVBxaHZib0xhcEhYSktUa1BVL21LSTJGY0VkeXlKaE92bWhvTHF2Y3pRQVpwMHdRVTRZVkVBdVBuR3c1R1R0ZERkMHdPZFhkM1ExdUdRWFZJRC9IbFhkdyswdEhWQ1dVMHp2TE1oRlNaNVI0RHF2YytIRHRDa0N5YkFXOFJBSUhuNnhrSnB1UjNhT3JxZ3FxRVZQRGFud1p1K3U4SExMd1BZMWFkdVRBRjdmU3Z3dUxxbU5saXdlUmZjNngwSnFyWU14TjhGT053ajlDejBQcTgvSFdCdkVQMkRvMzg5d0ZIdWdURFJPeHFPbGRjRHUyaG1maVhjdWNRR044d0xneEhpV09uYzZ6aktuY3M5dDhEVnM0SWgra0F4RkZZMlFLMElVWHIxcTExd3ZSaFlKT2MyRFFTRDZCOGNEWE1MUEF1S1l5VWQ0UDhkNEVnM0I3K1VmT2dSQTRWMFhIeFlhZng3a2NDQ2VQVDBJSGh1ZFR5RVpaNkFsOVlsQUFPK2JFYlFIOFJsbllUNmxnNG9xVzZDRytlSHc3QXBmZzZLTmhyUkFWbzl3QWVYeGNLdTNESmdPVExuNTNTNGNtWXdNTGlBMUFJNFZkc0NqYTBkd0M1ZmVyb1pPS1hqY1dPOXdvREh0YlNMTWtmWW1IZ01WRzF6aFE3UTZnSHlnL0lEbmJBM0Fzc1JMaUxNL1NVRHl1dGFnYzh2cm1vRURqNHN1QXNxR3VDYTJTRnd1V2NRTEF6SWhKNmVNeENZVmdpM0xZNEFWUnVONkFDdEh1QUxheEtnb2JVVDhrVUkwdVJsTWNBeTUrZmtmT2pza3RPNW5yNHBIcnZtRzc1SlVGemRERTFpR2llOS9zMXV1SGlhUDd5NE5nSDRCOGd0cllGSkg4ZUFxbzFHZElCV0Q1QlRzNktxSm1DWk1XNVJCTEFnZm1kOU12RHhlZVJoWU5lN1FoVFBVcVdZdmtGZEMyeEsvQTM0Zmw5RUhZWjgwYjJsbXFaMkdQTnVLRGkzelJVNlFLc0h5QzdGNFBqQjd2c29CaTZlRmdDQmFRWFEwZGtOMmNXbjRWSlJKRXZzZ3R1elNxRmRQRWQ2WmxVOGNLcjMxQmZ4d04vekR6ZFpsRktTcW8xR2RJQldEM0Q4KzFIQVF2aFFVVFdjKy9KM0JMajFRREh3eXorendBNE1ob0gvZXVRVXNKemhGTzhTandDNFg0UXNjWmtzNldnNXZPS3pFMVJ0TktJRHRIcUFiMzZiQk9WaWVpWFZON2NEQjRjcloyNEJ0KzlUZ1FYd21wZ2M0R0REUXJtNm9SVXF4QUFpK2NUbXdBZzNmK0Fnd2lrZm56OW1kakNvMm1oRUIyajFBTi82TGduNGdWaFdqRnRrZzlFZWdiQThNZ3ZZTlczN2lvRlROUmJVSElSWW1FOFhKWkxFNVREK3UwRU1XTkxweGpiZzhhbzJHdEVCV2ozQW14ZUVBeDlaWWdDUjV2bGxBQWVSMkVNbDBORFNEbndlQnhHV0t6eXh6dE9iajYvWURpeDN1SHpHUWNTMnR3ZzQyS2phYUVRSGFQVUFILzljZkVDaFRnd2NVbTF6Qnp6ODJUWmdGMTRodnZnbExpWUU3U2tFZG1FdXpYTTVqSVc1NXc5cHdGTUhNOFIvUy8wTGQ4dDJZUjJnNG9jRDRiWXhCZllYVmdHLzNMbTVpRXY2N3B0U2dZOHZ0K1VDdDdkZCsyNG9zQnppbG81bDRRZUJDN09ydG1ZRHl4d3VlNDJaRXdLcU5oclJBVm85UUJiTXJlSUxYV0lYZkh0RENuQVFDVTQvRHB6SzdjbXJnTkhUUlJjWHVCaXdKNjhTK0hyUHJOb0JsNGl2QWVucGxkdUJpd21KdVdYQUtaNnFqVVowZ0lNbHdPYTJEaWlxYW9TMzF5ZERYNEJpd0pBWVlOcXhDbUI1d2tFbkk5OE9YSng0ZW1VOGpIS1gyei84VWVwSURIQlhUaG5vQUlkcWdBeUttNGg0b3Z4R3IxRG9HMFMrVHdFKzFva0JSTHBGRk9IU2RYUERnRXY2bkJvdURUMEFmTC9WMFlmaHo0TklLRGkzelJVNlFLc0grTkNuc2NCRkJCYlVMTEE1U0t5TXpnWXU2ZnVuRnNCVnM0TGg1Z1UyS0JHaFNYeTlLUnVTZ1lzSk0zL2NBeXlYOHNycllheFhPS2phYUVRSGFQVUFPWVhxRmhOL2lTZk1Gd2RtQWhjTHRoOHVCWGJ4Z3llcWdML25oVGJ4NGprU055bHhjT0FtbzRkRXFTTnhFQWtScFpIMHd0b0VVTFhSaUE3UTZnRys5blVpRkZZMkFpZjU0OStMQUpZcHE3Ym1BQmRVdDRpU1JycDZkZ2h3YVo4Yko5bUZ1ZVdEUy9xemYwcUh4dFpPc05lM0FEZG1xdHBvUkFkbzlRQjVPckZZZkdpSlpjV0VENk9BV3pzOGYwd0hubFJhSHBFRlhKQmx1Y00vQUtlRUg0VWRBQzRtckkzTkJTNDZjQXNJbDhWVWJUU2lBN1I2Z0Z5T1luQkh5K3BnbWlpYUpXNUwyNUY5RXJoSWtIeTBIUGo3SjFiRUFaZkZ1UEQ2NlBJNDRHRHo4S2RpeWllMGQzWkJncGpHU2MrSzZaMmthcU1SSGFEVkEzeE1mRGlKVzNXNU5mZVJ6N1lCUDNoNDVuSG9FS1dKdEsvUURpeTBuMXVkQVB4NVMzc1gzTHQwS3pEbzU5ZnNBQWJJUW5yaTBtaFF0ZEdJRHREcUFiSjhtTEloQmJpNW5GczZlS0UwcDJCOExBbmFDemZORHdkdWtPUUYyT3pLM01yQjkxc1htd01uN0EzQVJRWExEaUk2UU1VUHp3ZkxERTc2K1hNVzByeUVuNFBEVDBsNXdOT2VESnFEUkVoNklmQVB3ZE9hejY4V1hWamdsSkNEMWtUUnpTWG5OcmxDQnpoWUF2d3JuSUlsaUJKRzRwSStiekxCSlg4K240TU8veUE4bmdGeTBPS1VNUFZZQlhEcDMvbTlYYUVESE93QmNpckhEWldjeW4wc3BtY1NwM0NxWTUweFVGNHl4c0hqVkUwejhKWURxbU9ONkFBSGU0QzhnSVlYMWpCQW4yMjV3UEpGZGF3ekJzaWJWSEFSZ1VGeUVGSWRhMFFIT05nRHBLL2pjb0hsQjI4ZTRXb0JmS21ZN2tuY1V0elZMVy9TMDkxWEh2SGlSdFd4Um5TQWd6N0EzcHRCY05tTFMvYTgrVmpVL2lMZzdVNVl0dkI0YmlvYXR6QWNlSGtyYjI3Qmswb3NmLzd3M2k3UUFRNzZBSHR4QXlWUGxQTldUbHk2ejhpdmhEZDhkOE5MUGp2QlkxTXE4Q1psdkNsWlFYa2Q4T0pESGFBTzBEV1R2RzNndFRrUmVQcVNnd0pQbVBNU0xtNXpPM1BtREJSVzFJUEhlaEd1Y051aWNGQzlseXQwZ0VNdFFMcjdneWpnMWcwdUNyQ3Jjb3EydDhBT3liOVZBQmNUYmw5c0E5VnJENFFPVVBIYUEySFpBSWszRnhzeDFRL3U4WTRHQnN1Z2VWS0oyK0ZVcjNVK2RJQW1XVDdBLzVzTzBDUWRvRWs2UUpOMGdDYnBBRTB5SFNCZllLZ2FNY01HL1lNakhlRGZNQjJnNmlEdEhCMmdTVHBBazNTQUp1a0FUZElCbXZTdkJjai9VVW5mR3d4V2l0Q2NLY054aFE3UVFSbU9LMWlJcWw1MEtGR0c0d29kb0lNeUhGZm9BQjJVNGJoQ0IraWdETWNWT2tBSFpUaXUwQUZLL21kL0J3OFhldklJeUVxWkFBQUFBRWxGVGtTdVFtQ0NcIi8+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwdGV4dCBkb2MtdG9vbHRpcFwiPnt7Z2V0U2lnbmlmaWNhbnRJdGVtRGVzYyhldmVudCl9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvdGQ+XG4gICAgPHRkIHRhYmluZGV4PVwiMFwiIGF0dHIuYXJpYS1sYWJlbD1cInt7Z2V0QXJpYUxhYmVsZm9yQ29sdW1uKGV2ZW50KX19XCIgKGtleWRvd24uZW50ZXIpPVwic2VsZWN0KGV2ZW50KVwiPjxkaXYgY2xhc3M9XCJ0b29sdGlwIHRleHQtMTZcIj57e2V2ZW50LnRpbWVzdGFtcCB8IGNjZERhdGUgOiAnbG9jYWwnfX1cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcHRleHRcIj57eydMb2NhbDonIHwgcnB4VHJhbnNsYXRlfX0ge3tldmVudC50aW1lc3RhbXAgfCBjY2REYXRlIDogJ2xvY2FsJ319PC9zcGFuPlxuICAgIDwvZGl2PjwvdGQ+XG4gICAgPHRkIHRhYmluZGV4PVwiMFwiPjxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7ZXZlbnQudXNlcl9maXJzdF9uYW1lIHwgdGl0bGVjYXNlfX0ge3tldmVudC51c2VyX2xhc3RfbmFtZSB8IHVwcGVyY2FzZX19PC9zcGFuPjwvdGQ+XG4gIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuIl19