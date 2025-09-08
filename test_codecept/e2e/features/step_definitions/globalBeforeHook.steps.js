const { setXUITestPage } = require('../../../helpers/globals');

console.log('[GlobalBeforeHook] 📦 File has been required');

// ✅ Dummy step to force file to be loaded
Given('setup has run', () => true);