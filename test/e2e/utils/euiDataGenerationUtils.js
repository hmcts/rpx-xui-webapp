class EuiDataGenerationUtils {


    /**
     * Generate random String
     * @returns string
     */
    static async generateRandomString(){
        let string = await Math.random().toString(36).substring(7);
        return string;
      }


    /**
     * Generate a random number for a given range
     * @param min value
     * @param max max value
     * @returns Integer
     */
    static async generateRandomInt(min, max){
        let trueMin = ((max - min) +1);
        return await Math.floor(Math.random() * trueMin) + min;
      }


    /**
     * Generates a random Bool
     * @returns {Promise<boolean>}
     */
    static async generateRandomBoolean(){
          return await Math.random() >= 0.5;
      }

    static async generateRandomPhoneNumber(){
        let number = '0';
        for (let i=0 ; i < 10 ; i++){
             number += await this.generateRandomInt(0,9)
        }
        return number;
    }
}

module.exports = EuiDataGenerationUtils;

