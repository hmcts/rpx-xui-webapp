const chai            = require('chai');
const chaiAsPromised  = require('chai-as-promised');
const minimist        = require('minimist');

chai.use(chaiAsPromised);

const argv = minimist(process.argv.slice(2));

const specFilesFilter = ['../features/**/*.feature'];

module.exports = {
  chai: chai,
  chaiAsPromised: chaiAsPromised,
  minimist: minimist,
  argv: argv,
  specFilesFilter: specFilesFilter
}
