import { expect } from 'chai';
import { addNonceToExternalScripts } from './csp-nonce';

describe('addNonceToExternalScripts', () => {
  const nonce = 'bXktcmFuZG9tLW5vbmNl';

  it('adds the request nonce to Angular-generated external scripts', () => {
    const html = '<script src="polyfills-ABC.js" type="module"></script>' + '<script src="main-XYZ.js" type="module"></script>';

    expect(addNonceToExternalScripts(html, nonce)).to.equal(
      `<script nonce="${nonce}" src="polyfills-ABC.js" type="module"></script>` +
        `<script nonce="${nonce}" src="main-XYZ.js" type="module"></script>`
    );
  });

  it('preserves scripts that already have a nonce', () => {
    const html = '<script nonce="existing-nonce" src="main-XYZ.js" type="module"></script>';

    expect(addNonceToExternalScripts(html, nonce)).to.equal(html);
  });

  it('does not add a nonce to inline scripts', () => {
    const html = '<script>window.applicationStarted = true;</script>';

    expect(addNonceToExternalScripts(html, nonce)).to.equal(html);
  });

  it('does not alter script-like strings inside inline scripts', () => {
    const html = '<script>const example = \'<script src="example.js"></script>\';</script>';

    expect(addNonceToExternalScripts(html, nonce)).to.equal(html);
  });

  it('returns the HTML unchanged when no nonce is available', () => {
    const html = '<script src="main-XYZ.js" type="module"></script>';

    expect(addNonceToExternalScripts(html, '')).to.equal(html);
  });
});