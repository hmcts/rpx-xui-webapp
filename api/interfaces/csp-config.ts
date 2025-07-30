import { csp } from '@hmcts/rpx-xui-node-lib';

export const MC_CSP: Parameters<typeof csp>[0] = {
  /* ── hosts common to every MC environment ─────────────── */
  extraScript: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'az416426.vo.msecnd.net'
  ],

  extraStyle: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com'
  ],

  extraFont: [
    'https://fonts.gstatic.com'
  ],

  extraImg: [
    'https://stats.g.doubleclick.net',
    'https://ssl.gstatic.com',
    'https://www.gstatic.com',
    'https://raw.githubusercontent.com/hmcts/',
    'https://*.google-analytics.com',
    'https://*.googletagmanager.com',
    'https://fonts.gstatic.com'
  ],

  extraConnect: [
    '*.gov.uk',
    '*.hmcts.net',
    '*.launchdarkly.com',
    'dc.services.visualstudio.com',
    'https://*.google-analytics.com',
    'https://*.googletagmanager.com',
    'https://*.analytics.google.com',
    'https://*.monitor.azure.com',
    'https://*.in.applicationinsights.azure.com',
    'wss://*.webpubsub.azure.com',
    //below is put in in case the WEBPUBSUB_URL double dot causes issues
    'wss://em-icp-webpubsub.platform.hmcts.net',
    process.env.WEBPUBSUB_URL || ''
  ].filter(Boolean)
};