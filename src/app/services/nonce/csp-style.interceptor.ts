// src/app/services/csp-nonce/csp-style.interceptor.ts
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { CspNonceService } from './csp-nonce.service';

@Injectable({
  providedIn: 'root'
})
export class CspStyleInterceptor {
  private interceptorsInitialized = false;

  constructor(
    private cspNonceService: CspNonceService,
    private logger: NGXLogger
  ) {
    this.initializeStyleInterception();
  }

  private initializeStyleInterception(): void {
    if (this.interceptorsInitialized) {
      return;
    }

    const nonce = this.cspNonceService.getNonce();

    if (!nonce) {
      this.logger.warn('No CSP nonce available - style interception disabled');
      return;
    }

    try {
      this.interceptDocumentMethods(nonce);
      this.interceptElementMethods(nonce);
      this.interceptorsInitialized = true;
      this.logger.info('CSP style interception initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize CSP style interception', error);
    }
  }

  private interceptDocumentMethods(nonce: string): void {
    const logger = this.logger;

    // Intercept document.createElement for style elements
    const originalCreateElement = document.createElement.bind(document);
    document.createElement = function(tagName: string, options?: ElementCreationOptions): HTMLElement {
      const element = originalCreateElement(tagName, options);

      if (tagName.toLowerCase() === 'style') {
        try {
          element.setAttribute('nonce', nonce);
          logger.debug('Added nonce to createElement style element');
        } catch (error) {
          logger.warn('Failed to add nonce to createElement style element', error);
        }
      }

      return element;
    };

    // Intercept insertAdjacentHTML for style tags
    const originalInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;
    Element.prototype.insertAdjacentHTML = function(position: InsertPosition, text: string): void {
      if (text.includes('<style')) {
        try {
          // Add nonce to any style tags in the HTML string
          text = text.replace(/<style(\s[^>]*)?>/gi, (match, attributes) => {
            if (attributes && attributes.includes('nonce=')) {
              return match; // Already has nonce
            }
            const nonceAttr = ` nonce="${nonce}"`;
            return attributes ? `<style${attributes}${nonceAttr}>` : `<style${nonceAttr}>`;
          });
          logger.debug('Added nonce to insertAdjacentHTML style elements');
        } catch (error) {
          logger.warn('Failed to add nonce to insertAdjacentHTML style elements', error);
        }
      }
      return originalInsertAdjacentHTML.call(this, position, text);
    };
  }

  private interceptElementMethods(nonce: string): void {
    const logger = this.logger;

    // Intercept appendChild for head element
    const originalAppendChild = HTMLHeadElement.prototype.appendChild;
    HTMLHeadElement.prototype.appendChild = function<T extends Node>(newChild: T): T {
      if (newChild.nodeName === 'STYLE' && newChild instanceof Element) {
        if (!newChild.hasAttribute('nonce')) {
          try {
            newChild.setAttribute('nonce', nonce);
            logger.debug('Added nonce to appendChild style element');
          } catch (error) {
            logger.warn('Failed to add nonce to appendChild style element', error);
          }
        }
      }
      return originalAppendChild.call(this, newChild);
    };

    // Intercept insertBefore for head element
    const originalInsertBefore = HTMLHeadElement.prototype.insertBefore;
    HTMLHeadElement.prototype.insertBefore = function<T extends Node>(newChild: T, refChild: Node | null): T {
      if (newChild.nodeName === 'STYLE' && newChild instanceof Element) {
        if (!newChild.hasAttribute('nonce')) {
          try {
            newChild.setAttribute('nonce', nonce);
            logger.debug('Added nonce to insertBefore style element');
          } catch (error) {
            logger.warn('Failed to add nonce to insertBefore style element', error);
          }
        }
      }
      return originalInsertBefore.call(this, newChild, refChild);
    };

    // Intercept replaceChild for head element
    const originalReplaceChild = HTMLHeadElement.prototype.replaceChild;
    HTMLHeadElement.prototype.replaceChild = function<T extends Node>(newChild: Node, oldChild: T): T {
      if (newChild.nodeName === 'STYLE' && newChild instanceof Element) {
        if (!newChild.hasAttribute('nonce')) {
          try {
            newChild.setAttribute('nonce', nonce);
            logger.debug('Added nonce to replaceChild style element');
          } catch (error) {
            logger.warn('Failed to add nonce to replaceChild style element', error);
          }
        }
      }
      return originalReplaceChild.call(this, newChild, oldChild);
    };
  }

  /**
   * Force re-initialization of interceptors (useful for testing or dynamic scenarios)
   */
  public reinitialize(): void {
    this.interceptorsInitialized = false;
    this.initializeStyleInterception();
  }

  /**
   * Check if interceptors are properly initialized
   */
  public isInitialized(): boolean {
    return this.interceptorsInitialized;
  }
}
