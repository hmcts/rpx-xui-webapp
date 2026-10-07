const fs = require('node:fs');
const path = require('node:path');

function loadSpecs(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      loadSpecs(entryPath);
    } else if (entry.name.endsWith('.spec.ts')) {
      require(entryPath);
    }
  }
}

loadSpecs(__dirname);
