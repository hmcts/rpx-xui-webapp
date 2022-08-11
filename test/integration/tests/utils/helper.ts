
import * as addContext from 'mochawesome/addContext'
let testContext;
export const mochaHooks = {
   beforeEach(){
       testContext = this;
   } 
}

export const setTestContext = (testObj) => {
   console.log("******************** .  SET context called ");
   testContext = testObj;
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

export const testWithRetry = async (fn) => {
   let i = 0;
   while (i < 3) {
      i++;
      try {
         await fn();
         break;
      }
      catch (err) {
         reporterMsg(err);
      }

   }

}

