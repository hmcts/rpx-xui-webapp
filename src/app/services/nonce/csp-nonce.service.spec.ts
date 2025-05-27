// src/app/services/csp-nonce/csp-nonce.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { NGXLogger } from 'ngx-logger';
import { CspNonceService } from './csp-nonce.service';

describe('CspNonceService', () => {
  let service: CspNonceService;
  let mockDocument: any;
  let mockLogger: jasmine.SpyObj<NGXLogger>;

  beforeEach(() => {
    // Create mock logger
    mockLogger = jasmine.createSpyObj('NGXLogger', [
      'info', 'warn', 'error', 'debug'
    ]);

    // Create a more complete mock document
    mockDocument = {
      createElement: jasmine.createSpy('createElement').and.callFake((tagName: string) => {
        return document.createElement(tagName);
      }),
      querySelector: jasmine.createSpy('querySelector'),
      querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([]),
      head: {
        appendChild: jasmine.createSpy('appendChild'),
        children: [],
        childNodes: []
      },
      body: {
        children: [],
        childNodes: []
      },
      documentElement: {
        children: [],
        childNodes: []
      }
    };

    TestBed.configureTestingModule({
      providers: [
        CspNonceService,
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: NGXLogger, useValue: mockLogger }
      ]
    });
  });

  afterEach(() => {
    // Clean up window CSP_NONCE
    delete (window as any).CSP_NONCE;
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      service = TestBed.inject(CspNonceService);
      expect(service).toBeTruthy();
    });
  });

  describe('Nonce Initialization', () => {
    it('should get nonce from window object', () => {
      // Arrange
      (window as any).CSP_NONCE = 'test-nonce-123';

      // Act
      service = TestBed.inject(CspNonceService);

      // Assert
      expect(service.getNonce()).toBe('test-nonce-123');
      expect(mockLogger.info).toHaveBeenCalledWith(
        'CSP nonce initialized successfully',
        jasmine.objectContaining({ nonce: jasmine.any(String) })
      );
    });

    it('should get nonce from meta tag when window is unavailable', () => {
      // Arrange
      delete (window as any).CSP_NONCE;
      const mockMetaElement = { content: 'meta-nonce-456' };
      mockDocument.querySelector.and.returnValue(mockMetaElement);

      // Act
      service = TestBed.inject(CspNonceService);

      // Assert
      expect(service.getNonce()).toBe('meta-nonce-456');
      expect(mockDocument.querySelector).toHaveBeenCalledWith('meta[name="csp-nonce"]');
    });

    it('should warn when no nonce is found', () => {
      // Arrange
      delete (window as any).CSP_NONCE;
      mockDocument.querySelector.and.returnValue(null);

      // Act
      service = TestBed.inject(CspNonceService);

      // Assert
      expect(service.getNonce()).toBeNull();
      expect(mockLogger.warn).toHaveBeenCalledWith(
        'CSP nonce not found - styles may be blocked by Content Security Policy'
      );
    });
  });

  describe('Style Element Creation', () => {
    beforeEach(() => {
      (window as any).CSP_NONCE = 'test-nonce-789';
      service = TestBed.inject(CspNonceService);
    });

    it('should create style element with nonce', () => {
      // Act
      const styleElement = service.createStyleElement('.test { color: red; }');

      // Assert
      expect(styleElement.tagName).toBe('STYLE');
      expect(styleElement.textContent).toBe('.test { color: red; }');
      expect(styleElement.getAttribute('nonce')).toBe('test-nonce-789');
      expect(mockLogger.debug).toHaveBeenCalledWith('Created style element with nonce');
    });

    it('should create style element without nonce when unavailable', () => {
      // Arrange
      (service as any).nonce = null;

      // Act
      const styleElement = service.createStyleElement('.test { color: blue; }');

      // Assert
      expect(styleElement.tagName).toBe('STYLE');
      expect(styleElement.getAttribute('nonce')).toBeNull();
      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Created style element without nonce - may be blocked by CSP'
      );
    });
  });

  describe('Global Style Management', () => {
    beforeEach(() => {
      (window as any).CSP_NONCE = 'test-nonce-global';
      service = TestBed.inject(CspNonceService);
    });

    it('should add global style with identifier', () => {
      // Act
      service.addGlobalStyle('.global { margin: 0; }', 'reset-styles');

      // Assert
      expect(mockDocument.head.appendChild).toHaveBeenCalled();
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Added global style',
        { identifier: 'reset-styles' }
      );
    });

    it('should handle errors when adding global style', () => {
      // Arrange
      mockDocument.head.appendChild.and.throwError('DOM Error');

      // Act
      service.addGlobalStyle('.error { color: red; }');

      // Assert
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to add global style',
        jasmine.any(Error)
      );
    });
  });

  describe('Style Removal', () => {
    beforeEach(() => {
      (window as any).CSP_NONCE = 'test-nonce-removal';
      service = TestBed.inject(CspNonceService);
    });

    it('should remove style by identifier', () => {
      // Arrange
      const mockStyleElement = {
        remove: jasmine.createSpy('remove')
      };
      mockDocument.querySelector.and.returnValue(mockStyleElement);

      // Act
      service.removeStyle('test-style-id');

      // Assert
      expect(mockDocument.querySelector).toHaveBeenCalledWith('style[data-style-id="test-style-id"]');
      expect(mockStyleElement.remove).toHaveBeenCalled();
    });

    it('should handle missing style element gracefully', () => {
      // Arrange
      mockDocument.querySelector.and.returnValue(null);

      // Act
      service.removeStyle('nonexistent-style');

      // Assert
      expect(mockDocument.querySelector).toHaveBeenCalledWith('style[data-style-id="nonexistent-style"]');
      // Should not throw error
    });
  });

  describe('CSS Scoping', () => {
    beforeEach(() => {
      (window as any).CSP_NONCE = 'test-nonce-scoping';
      service = TestBed.inject(CspNonceService);
    });

    it('should scope simple CSS rules', () => {
      // Arrange
      const css = '.button { padding: 10px; }';
      const scope = '.my-component';
      const createStyleSpy = spyOn(service, 'createStyleElement').and.callThrough();

      // Act
      service.addScopedStyle(css, scope);

      // Assert - Allow for extra spaces in regex
      expect(createStyleSpy).toHaveBeenCalledWith(
        jasmine.stringMatching(/\.my-component\s+\.button\s*{\s*padding:\s*10px;\s*}/)
      );
    });

    it('should scope multiple CSS rules', () => {
      // Arrange
      const css = '.btn { color: blue; } .link { text-decoration: none; }';
      const scope = '.card';
      const createStyleSpy = spyOn(service, 'createStyleElement').and.callThrough();

      // Act
      service.addScopedStyle(css, scope);

      // Assert - Check that scoping was applied
      expect(createStyleSpy).toHaveBeenCalled();
      const calledWith = createStyleSpy.calls.mostRecent().args[0];
      expect(calledWith).toContain('.card');
      expect(calledWith).toContain('.btn');
      expect(calledWith).toContain('.link');
    });
  });

  describe('Error Handling', () => {
    it('should handle window access errors', () => {
      // Arrange - Mock window access failure
      const originalDescriptor = Object.getOwnPropertyDescriptor(window, 'CSP_NONCE');
      Object.defineProperty(window, 'CSP_NONCE', {
        get() {
          throw new Error('Access denied');
        },
        configurable: true
      });

      // Act
      service = TestBed.inject(CspNonceService);

      // Assert
      expect(service.getNonce()).toBeNull();
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Could not get nonce from window object',
        jasmine.any(Error)
      );

      // Cleanup
      if (originalDescriptor) {
        Object.defineProperty(window, 'CSP_NONCE', originalDescriptor);
      } else {
        delete (window as any).CSP_NONCE;
      }
    });

    it('should handle meta tag query errors', () => {
      // Arrange
      delete (window as any).CSP_NONCE;
      mockDocument.querySelector.and.throwError('Query Error');

      // Act
      service = TestBed.inject(CspNonceService);

      // Assert
      expect(service.getNonce()).toBeNull();
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Could not get nonce from meta tag',
        jasmine.any(Error)
      );
    });
  });

  describe('Service State', () => {
    it('should maintain consistent nonce', () => {
      // Arrange
      (window as any).CSP_NONCE = 'consistent-nonce';

      // Act
      service = TestBed.inject(CspNonceService);
      const nonce1 = service.getNonce();
      const nonce2 = service.getNonce();

      // Assert
      expect(nonce1).toBe('consistent-nonce');
      expect(nonce2).toBe('consistent-nonce');
      expect(nonce1).toBe(nonce2);
    });

    it('should initialize only once', () => {
      // Arrange
      (window as any).CSP_NONCE = 'init-once';

      // Act
      service = TestBed.inject(CspNonceService);
      service.getNonce(); // Multiple calls
      service.getNonce();

      // Assert
      expect(mockLogger.info).toHaveBeenCalledTimes(2); // Init + Angular setup
    });
  });
});
