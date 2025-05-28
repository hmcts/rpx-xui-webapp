// src/app/services/csp-nonce/csp-nonce.service.ts
import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

declare global {
  interface Window {
    CSP_NONCE?: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CspNonceService {
  private nonce: string | null = null;
  private readonly logger: NGXLogger;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    logger: NGXLogger
  ) {
    this.logger = logger;
    this.initializeNonce();
  }

  private initializeNonce(): void {
    // Try to get nonce from multiple sources in order of preference
    this.nonce = this.getNonceFromWindow() ||
                 this.getNonceFromMeta() ||
                 this.getNonceFromHeader();

    if (this.nonce) {
      this.logger.info('CSP nonce initialized successfully', { nonce: this.nonce.substring(0, 8) + '...' });
      this.setupAngularStyleNonce();
    } else {
      this.logger.warn('CSP nonce not found - styles may be blocked by Content Security Policy');
    }
  }

  private getNonceFromWindow(): string | null {
    try {
      return (window as any).CSP_NONCE || null;
    } catch (error) {
      this.logger.debug('Could not get nonce from window object', error);
      return null;
    }
  }

  private getNonceFromMeta(): string | null {
    try {
      const metaTag = this.document.querySelector('meta[name="csp-nonce"]') as HTMLMetaElement;
      return metaTag ? metaTag.content : null;
    } catch (error) {
      this.logger.debug('Could not get nonce from meta tag', error);
      return null;
    }
  }

  private getNonceFromHeader(): string | null {
    // In browser environment, this is not accessible
    // Kept for completeness and potential future use
    return null;
  }

  private setupAngularStyleNonce(): void {
    if (!this.nonce) {
      return;
    }

    try {
      // Override Angular's style injection to include nonce
      const originalAppendChild = HTMLHeadElement.prototype.appendChild;
      const nonce = this.nonce;
      const logger = this.logger;

      HTMLHeadElement.prototype.appendChild = function<T extends Node>(newChild: T): T {
        if (newChild.nodeName === 'STYLE' && newChild instanceof Element) {
          if (!newChild.hasAttribute('nonce')) {
            try {
              newChild.setAttribute('nonce', nonce);
              logger.debug('Added nonce to dynamically created style element');
            } catch (error) {
              logger.warn('Failed to add nonce to style element', error);
            }
          }
        }
        return originalAppendChild.call(this, newChild);
      };

      this.logger.info('Angular style nonce setup completed');
    } catch (error) {
      this.logger.error('Failed to setup Angular style nonce', error);
    }
  }

  public getNonce(): string | null {
    return this.nonce;
  }

  public createStyleElement(css: string): HTMLStyleElement {
    const styleElement = this.document.createElement('style');
    styleElement.textContent = css;

    if (this.nonce) {
      styleElement.setAttribute('nonce', this.nonce);
      this.logger.debug('Created style element with nonce');
    } else {
      this.logger.warn('Created style element without nonce - may be blocked by CSP');
    }

    return styleElement;
  }

  public addGlobalStyle(css: string, identifier?: string): void {
    try {
      const styleElement = this.createStyleElement(css);

      if (identifier) {
        styleElement.setAttribute('data-style-id', identifier);
      }

      this.document.head.appendChild(styleElement);
      this.logger.debug('Added global style', { identifier });
    } catch (error) {
      this.logger.error('Failed to add global style', error);
    }
  }

  public addScopedStyle(css: string, scope: string, identifier?: string): void {
    try {
      const scopedCss = this.scopeCSS(css, scope);
      this.addGlobalStyle(scopedCss, identifier);
      this.logger.debug('Added scoped style', { scope, identifier });
    } catch (error) {
      this.logger.error('Failed to add scoped style', error);
    }
  }

  private scopeCSS(css: string, scope: string): string {
    if (!css || typeof css !== 'string' || css.length > 100000) {
      this.logger.warn('Invalid CSS input for scoping');
      return '';
    }

    if (!scope || typeof scope !== 'string') {
      this.logger.warn('Invalid scope for CSS scoping');
      return css;
    }

    try {
      const lines = css.split('\n');
      const scopedLines = lines.map((line) => {
        const trimmed = line.trim();

        // Match lines that look like selectors
        if (trimmed.length > 0 && trimmed.includes('{') && !trimmed.startsWith('@')) {
          const parts = trimmed.split('{');
          if (parts.length > 1) {
            const selector = parts[0].trim();
            return `${scope} ${selector} {${parts.slice(1).join('{')}`;
          }
        }

        return line;
      });

      return scopedLines.join('\n');
    } catch (error) {
      this.logger.error('Error during CSS scoping, returning original CSS', error);
      return css;
    }
  }

  public removeStyle(identifier: string): void {
    try {
      const styleElement = this.document.querySelector(`style[data-style-id="${identifier}"]`);
      if (styleElement) {
        styleElement.remove();
        this.logger.debug('Removed style', { identifier });
      }
    } catch (error) {
      this.logger.error('Failed to remove style', error);
    }
  }
}
