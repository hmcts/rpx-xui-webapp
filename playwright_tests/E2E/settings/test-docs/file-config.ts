import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const url = require('url');

const file1 = 'file://testPdf.pdf'
const file2 = 'file://testPdf2.pdf'


//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

interface testFiles {}

interface FileConfig {
  [key: string]: testFiles | string;
}

const fileConfig: FileConfig = {
  // testPdfFile: join(    __dirname,    '../test-docs/testPdf.pdf'),
  // testPdfFile2: join(    __dirname, '../test-docs/testPdf2.pdf')

  testPdfFile:  file1 , //  join(    __dirname,    '../test-docs/testPdf.pdf'),
  testPdfFile2: file2, // join(    __dirname, '../test-docs/testPdf2.pdf')


};

export default fileConfig as {
  testPdfFile: string;
  testPdfFile2: string;
};
