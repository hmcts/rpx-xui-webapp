/* eslint-env node */
const chai = require('chai');

/**
 * When Mocha loads TypeScript specs as native ES modules, importing CommonJS
 * plugins (e.g. sinon-chai) returns a namespace object instead of a function.
 * Patch chai.use so it unwraps the default export before registering the plugin.
 */
const originalUse = chai.use.bind(chai);

chai.use = (plugin) => {
  const resolvedPlugin =
    plugin && typeof plugin === 'object' && 'default' in plugin
      ? plugin.default
      : plugin;

  return originalUse(resolvedPlugin);
};
