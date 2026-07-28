import { brotliCompressSync, gzipSync } from 'node:zlib';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const outputDirectory = resolve(process.argv[2] || 'dist/rpx-exui/browser');
let buildMetadata = {};
try {
  buildMetadata = JSON.parse(await readFile(join(outputDirectory, 'stats.json'), 'utf8'));
} catch {
  // A report can still be generated for builds created without --stats-json.
}

const outputMetadata = new Map(
  Object.entries(buildMetadata.outputs || {}).map(([output, metadata]) => [output.split('/').pop(), metadata])
);
const files = (await readdir(outputDirectory)).filter((file) => file.endsWith('.js')).sort();

const bundles = await Promise.all(
  files.map(async (file) => {
    const contents = await readFile(join(outputDirectory, file));
    const metadata = outputMetadata.get(file);
    return {
      file,
      logicalEntryPoint: metadata?.entryPoint || null,
      importedBy: metadata?.imports?.map((dependency) => dependency.path) || [],
      bytes: contents.byteLength,
      gzipBytes: gzipSync(contents).byteLength,
      brotliBytes: brotliCompressSync(contents).byteLength,
    };
  })
);

bundles.sort((left, right) => right.bytes - left.bytes);

const format = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;
console.table(
  bundles.slice(0, 30).map((bundle) => ({
    file: bundle.file,
    entryPoint: bundle.logicalEntryPoint || 'shared/lazy',
    size: format(bundle.bytes),
    gzip: format(bundle.gzipBytes),
    brotli: format(bundle.brotliBytes),
  }))
);

const report = {
  generatedAt: new Date().toISOString(),
  outputDirectory,
  bundles,
};
await writeFile(join(outputDirectory, 'bundle-report.json'), `${JSON.stringify(report, null, 2)}\n`);
