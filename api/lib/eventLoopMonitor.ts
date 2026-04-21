import type { Application, NextFunction, Request, Response } from 'express';
import { monitorEventLoopDelay, performance } from 'perf_hooks';
import { getConfigValue } from '../configuration';
import {
  EVENT_LOOP_MONITOR_DEBUG_ENABLED,
  EVENT_LOOP_MONITOR_ENABLED,
  EVENT_LOOP_MONITOR_MAX_TRACKED_REQUESTS,
  EVENT_LOOP_MONITOR_RESOLUTION_MS,
  EVENT_LOOP_MONITOR_SAMPLE_INTERVAL_MS,
  EVENT_LOOP_MONITOR_SLOW_REQUEST_THRESHOLD_MS,
  EVENT_LOOP_MONITOR_WARN_THRESHOLD_MS,
} from '../configuration/references';
import * as log4jui from './log4jui';

interface TrackedRequest {
  id: string;
  method: string;
  route: string;
  startedAt: number;
}

interface EventLoopMonitorConfig {
  debugEnabled: boolean;
  enabled: boolean;
  maxTrackedRequests: number;
  resolutionMs: number;
  sampleIntervalMs: number;
  slowRequestThresholdMs: number;
  warnThresholdMs: number;
}

const logger = log4jui.getLogger('EventLoop');
const activeRequests = new Map<string, TrackedRequest>();

let requestSequence = 0;
let monitorStarted = false;

function getMonitorConfig(): EventLoopMonitorConfig {
  return {
    debugEnabled: getConfigValue<boolean>(EVENT_LOOP_MONITOR_DEBUG_ENABLED),
    enabled: getConfigValue<boolean>(EVENT_LOOP_MONITOR_ENABLED),
    maxTrackedRequests: getConfigValue<number>(EVENT_LOOP_MONITOR_MAX_TRACKED_REQUESTS),
    resolutionMs: getConfigValue<number>(EVENT_LOOP_MONITOR_RESOLUTION_MS),
    sampleIntervalMs: getConfigValue<number>(EVENT_LOOP_MONITOR_SAMPLE_INTERVAL_MS),
    slowRequestThresholdMs: getConfigValue<number>(EVENT_LOOP_MONITOR_SLOW_REQUEST_THRESHOLD_MS),
    warnThresholdMs: getConfigValue<number>(EVENT_LOOP_MONITOR_WARN_THRESHOLD_MS),
  };
}

function toMilliseconds(valueInNanoseconds: number): number {
  return Number((valueInNanoseconds / 1_000_000).toFixed(1));
}

function summariseActiveRequests(maxTrackedRequests: number) {
  return [...activeRequests.values()]
    .sort((left, right) => left.startedAt - right.startedAt)
    .slice(0, maxTrackedRequests)
    .map((request) => ({
      durationMs: Math.round(performance.now() - request.startedAt),
      id: request.id,
      method: request.method,
      route: request.route,
    }));
}

function buildRequestLabel(req: Request): string {
  return req.baseUrl ? `${req.baseUrl}${req.path}` : req.originalUrl || req.url;
}

function logSlowRequest(req: Request, durationMs: number) {
  const config = getMonitorConfig();
  if (!config.debugEnabled || durationMs < config.slowRequestThresholdMs) {
    return;
  }

  logger.info(
    JSON.stringify({
      durationMs: Math.round(durationMs),
      event: 'node_slow_request',
      method: req.method,
      route: buildRequestLabel(req),
      thresholdMs: config.slowRequestThresholdMs,
    })
  );
}

function startEventLoopMonitor(config: EventLoopMonitorConfig) {
  if (monitorStarted) {
    return;
  }

  const histogram = monitorEventLoopDelay({ resolution: config.resolutionMs });
  let lastElu = performance.eventLoopUtilization();

  histogram.enable();
  monitorStarted = true;

  setInterval(() => {
    const maxMs = toMilliseconds(histogram.max);
    const p99Ms = toMilliseconds(histogram.percentile(99));
    const meanMs = toMilliseconds(histogram.mean);
    const elu = performance.eventLoopUtilization(lastElu);
    lastElu = elu;

    if (maxMs >= config.warnThresholdMs || p99Ms >= config.warnThresholdMs) {
      const payload: Record<string, unknown> = {
        activeRequestCount: activeRequests.size,
        event: 'node_event_loop_latency',
        eventLoopUtilization: Number(elu.utilization.toFixed(3)),
        maxMs,
        meanMs,
        p99Ms,
        sampleIntervalMs: config.sampleIntervalMs,
        thresholdMs: config.warnThresholdMs,
      };

      if (config.debugEnabled) {
        payload.activeRequests = summariseActiveRequests(config.maxTrackedRequests);
      }

      logger.warn(JSON.stringify(payload));
    }

    histogram.reset();
  }, config.sampleIntervalMs).unref();
}

export function initialiseEventLoopMonitor(app: Application) {
  const config = getMonitorConfig();
  if (!config.enabled) {
    return;
  }

  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = `elm-${Date.now()}-${++requestSequence}`;
    const trackedRequest: TrackedRequest = {
      id: requestId,
      method: req.method,
      route: buildRequestLabel(req),
      startedAt: performance.now(),
    };
    let cleared = false;

    activeRequests.set(requestId, trackedRequest);

    const clearTrackedRequest = () => {
      if (cleared) {
        return;
      }
      cleared = true;
      activeRequests.delete(requestId);
      logSlowRequest(req, performance.now() - trackedRequest.startedAt);
    };

    res.once('finish', clearTrackedRequest);
    res.once('close', clearTrackedRequest);

    next();
  });

  startEventLoopMonitor(config);

  logger.info(
    JSON.stringify({
      debugEnabled: config.debugEnabled,
      event: 'node_event_loop_monitor_started',
      resolutionMs: config.resolutionMs,
      sampleIntervalMs: config.sampleIntervalMs,
      warnThresholdMs: config.warnThresholdMs,
    })
  );
}
