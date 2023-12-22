
const jsonpath = require('jsonpath')
const reportLogger = require('../../codeceptCommon/reportLogger')

class JSONUtil{

  updateJsonWithJsonPath(updatePaths, updateJson){
    for (const row of updatePaths) {
      const actualVal = jsonpath.query(updateJson, row.jsonpath);

      let val = row.value;
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.replace('[', '').replace(']', '')
        val = val !== "" ? val.split(','): []
      }
      const updatedValue = jsonpath.value(updateJson, row.jsonpath, val);

      reportLogger.AddMessage(`Updated ${row.jsonpath} =>${actualVal} to  ${updatedValue}`);
    }

  }

}

module.exports = new JSONUtil()
