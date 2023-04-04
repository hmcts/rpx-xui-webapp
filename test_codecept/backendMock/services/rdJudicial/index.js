

const { v4 } = require('uuid');


class RDJudicialService{

    constructor(){
      this.methods = {
        OnFindperson:'ON_FIND_PERSON'
      }

      this.persons = []
      for(let i = 0 ; i< 10;i++){
        const personTemplate = this.getPersonTemplate();
        personTemplate.idamId = v4();
          personTemplate.fullName = `auto test ${i} judge ${i}`
          personTemplate.surname = `judge ${i}`
          personTemplate.emailId = `auto_test_judge_${i}@justice.gov.uk`
          personTemplate.knownAs = `auto testjudge ${i} judicial`
          personTemplate.title = `mockjudge`

          this.persons.push(personTemplate)

      }
    }

    findPerson(reqBody){
        return this.persons.filter(person => person.fullName.includes(reqBody.searchString))
    }

    getPersonTemplate(){
        return {
            "title": "string",
            "knownAs": "string",
            "surname": "string",
            "fullName": "string",
            "emailId": "string",
            "idamId": "string",
            "personalCode": "string"
        }
    }


}

module.exports = new RDJudicialService();
