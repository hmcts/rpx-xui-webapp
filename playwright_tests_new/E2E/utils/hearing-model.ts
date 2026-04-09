export type YesNo = 'Yes' | 'No';

export type AdditionalFacility = "Children's Room" | 'Custody Cell' | 'Laptop' | 'Projector' | 'Witness Room';

export type HearingStage = 'allocation' | 'appeal' | 'application' | 'breach' | 'committal' | 'costs' | 'judgment';

export interface HearingFacilitiesData {
  additionalSecurity?: YesNo;
  additionalFacilities?: AdditionalFacility[];
}

export interface HearingStageData {
  stage?: HearingStage;
}

// Add more page interfaces here as you build them out, e.g.:
// export interface HearingDetailsData { ... }

// ─── Page key registry ────────────────────────────────────────────────────

export interface JourneyPages {
  hearingFacilities: HearingFacilitiesData;
  hearingStage: HearingStageData;
  // hearingDetails: HearingDetailsData;
}

export type PageKey = keyof JourneyPages;

// ─── Model ────────────────────────────────────────────────────────────────

export class HearingJourneyModel {
  private data: JourneyPages = {
    hearingFacilities: {},
    hearingStage: {},
    // hearingDetails: HearingDetailsData;
  };

  private snapshots: Record<string, JourneyPages> = {};

  /** Set a single field on a page */
  set<P extends PageKey, F extends keyof JourneyPages[P]>(page: P, field: F, value: JourneyPages[P][F]): this {
    this.data[page][field] = value;
    return this;
  }

  /** Get a single field from a page */
  get<P extends PageKey, F extends keyof JourneyPages[P]>(page: P, field: F): JourneyPages[P][F] {
    return this.data[page][field];
  }

  /** Get all data for a page */
  getPage<P extends PageKey>(page: P): JourneyPages[P] {
    return this.data[page];
  }

  /** Assert a single value (throws if mismatch) */
  assert<P extends PageKey, F extends keyof JourneyPages[P]>(page: P, field: F, expected: JourneyPages[P][F]): void {
    const actual = this.data[page][field];
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`[${page}.${String(field)}] expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
  }

  /** Assert all set fields on a page using a Playwright expect callback */
  async assertPage<P extends PageKey>(page: P, assertFn: (field: string, expected: unknown) => Promise<void>): Promise<void> {
    const pageData = this.data[page] as Record<string, unknown>;
    for (const [field, value] of Object.entries(pageData)) {
      if (value !== undefined) {
        await assertFn(field, value);
      }
    }
  }

  /** Save a named snapshot of the current state */
  snapshot(label: string): this {
    this.snapshots[label] = JSON.parse(JSON.stringify(this.data));
    return this;
  }

  /** Restore a named snapshot */
  restore(label: string): this {
    const snap = this.snapshots[label];
    if (!snap) throw new Error(`No snapshot found with label: "${label}"`);
    this.data = JSON.parse(JSON.stringify(snap));
    return this;
  }

  /** Return full state as plain object (e.g. for logging) */
  toJSON(): JourneyPages {
    return JSON.parse(JSON.stringify(this.data));
  }

  /** Reset all data back to empty */
  reset(): this {
    this.data = { hearingFacilities: {}, hearingStage: {} }; // other model objects that are added in the Page Registry.
    return this;
  }
}
