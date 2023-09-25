
const { v4 } = require('uuid');
const userApiData = require('../userApiData')

const categoriesAndDocumentsResponse = require('./categoriesAndDocuments')

class CategoriesAndDocumentsApi{
    

    constructor(){

    }

    getCategoriesAndDocumentsForCase(){
        return categoriesAndDocumentsResponse;
    }

}

module.exports = new CategoriesAndDocumentsApi()



