import { Flags } from '../../components/palette/case-flag';
import { CaseField } from '../definition';
import { CaseTab } from './case-tab.model';
import { CaseViewEvent } from './case-view-event.model';
import { CaseViewTrigger } from './case-view-trigger.model';
export declare class CaseView {
    case_id?: string;
    case_type: {
        id: string;
        name: string;
        description?: string;
        jurisdiction: {
            id: string;
            name: string;
            description?: string;
        };
        printEnabled?: boolean;
    };
    state: {
        id: string;
        name: string;
        description?: string;
        title_display?: string;
    };
    channels: string[];
    tabs: CaseTab[];
    triggers: CaseViewTrigger[];
    events: CaseViewEvent[];
    metadataFields?: CaseField[];
    basicFields?: {
        caseNameHmctsInternal?: string;
        caseManagementLocation?: {
            baseLocation?: number;
        };
    };
    case_flag?: Flags;
}
//# sourceMappingURL=case-view.model.d.ts.map