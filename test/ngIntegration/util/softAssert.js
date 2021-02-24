
const addContext = require('mochawesome/addContext');

class SoftAssert{

    constructor(testContext){
        this.testContext = testContext;
        this.assertCount = 0;
        this.isPassed = true;
        this.assertions = [];
    }



    async assert(expectCallBack){
        this.assertCount++;
        try{
            await expectCallBack();
        }catch(assertError){
            addContext(this.testContext, { title: "Screenshot path" , value: "../../"});
            this.isPassed = false; 
            this.assertions.push(assertError.message);

        }
    }

    finally(){
        if (!this.isPassed){
            let errors = "\n";
            let errCounter = 0;
            for (const error of this.assertions){
                errCounter++;
                errors = `${errors} \n (${errCounter}) ${error}`;
            }
            errors = errors +"\n\n";
            expect(false, `${this.assertions.length} of ${this.assertCount} assertions failed => Error(s) :` + errors).to.be.true

       } 
    }


}

module.exports = SoftAssert;
