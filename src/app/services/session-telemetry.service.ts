// src/app/services/session-telemetry.service.ts
import { Injectable } from '@angular/core';

interface TelemetryPayload {
  trace_id: string;
  user_id: string | null;
  event: string;
  timestamp: string;
  timezone: string;
  details?: any;
}

@Injectable({ providedIn: 'root' })
export class SessionTelemetryService {
  public traceId: string = this.uuidv4();
  private LOG_ENDPOINT = '/internal/log';
  private TIMEZONE = 'Europe/London';

  // throttle map: event -> lastSentTimestamp (ms)
  private lastSent = new Map<string, number>();

  // default throttle: 5s (adjustable per-event via details._throttleMs)
  private DEFAULT_THROTTLE_MS = 5000;

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  private nowISO() { return new Date().toISOString(); }

  /**
   * log telemetry event
   * @param event - event name
   * @param userId - nullable user id
   * @param details - structured details; special fields:
   *    _throttleMs?: number  -> override throttle for this event (ms)
   *    _urgent?: boolean     -> bypass throttling and always send
   */
  public log(event: string, userId: string | null, details: any = {}): void {
    try {
      const now = Date.now();
      const throttleMs = details && typeof details._throttleMs === 'number'
        ? details._throttleMs
        : this.DEFAULT_THROTTLE_MS;
      const urgent = !!details && !!details._urgent;

      // allow bypass of throttle for urgent events
      if (!urgent) {
        const last = this.lastSent.get(event) || 0;
        if (now - last < throttleMs) {
          // skip emitting to reduce noise
          // keep a console.debug for dev
          // console.debug(`Telemetry throttled: ${event}`);
          return;
        }
        this.lastSent.set(event, now);
      } else {
        // still update lastSent for some basic rate protection
        this.lastSent.set(event, now);
      }

      const payload: TelemetryPayload = {
        trace_id: this.traceId,
        user_id: userId || 'anonymous',
        event,
        timestamp: this.nowISO(),
        timezone: this.TIMEZONE,
        details,
      };

      const body = JSON.stringify(payload);

      // sendBeacon is preferred for unload reliability. It cannot set headers.
      if (navigator.sendBeacon) {
        try {
          // sendBeacon returns boolean but we don't rely on it; assume best-effort
          navigator.sendBeacon(this.LOG_ENDPOINT, new Blob([body], { type: 'application/json' }));
        } catch (e) {
          // sendBeacon may throw in some older browsers - fallback to fetch
          this.fetchPost(body).catch(() => {/* swallow */});
        }
      } else {
        // fetch fallback: include credentials so same-site cookies go along
        this.fetchPost(body).catch(() => {/* swallow */});
      }

      // keep a dev console record (can be removed in prod)
      console.debug('SESSION_TELEMETRY', payload);
    } catch (e) {
      // make sure telemetry never breaks the app
      // eslint-disable-next-line no-console
      console.warn('telemetry error', e);
    }
  }

  private async fetchPost(body: string): Promise<void> {
    await fetch(this.LOG_ENDPOINT, {
      method: 'POST',
      credentials: 'include', // include cookies for same-origin auth
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  /** Useful in tests to reset throttles */
  public flush(): void {
    this.lastSent.clear();
  }
}
