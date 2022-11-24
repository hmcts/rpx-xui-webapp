const globalSearchMockData = require('./mockData');

module.exports = {

    get: {
      
        '/api/globalsearch/services':(req,res)=>{
            res.send(globalSearchMockData.getServices());
        }

    },
    post: {
        '/api/globalsearch/results': (req,res) => {
            res.send(globalSearchMockData.getResults());
        }
    }
}
