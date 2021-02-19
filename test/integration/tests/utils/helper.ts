
import * as addContext from 'mochawesome/addContext'
let testContext;
export const mochaHooks = {
   beforeEach(){
      testContext = this;
   } 
}

export const reporterMsg = (msg) => {
   const reportMsg = new Date().toTimeString() + " : "+msg
   console.log(reportMsg);
   addContext(testContext, reportMsg );
}

export const reporterJson = (jsonMsg) => {
   const reportMsg = new Date().toTimeString() + " : " + JSON.stringify(jsonMsg)
   console.log(reportMsg);
   addContext(testContext, reportMsg);
}


