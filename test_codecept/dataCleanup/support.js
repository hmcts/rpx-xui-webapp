const axios = require('axios')

const env = process.env.TEST_ENV ? process.env.TEST_ENV : 'aat';

async function getS2SToken(){
    const http = axios.create({
        baseURL: `http://rpe-service-auth-provider-${env}.service.core-compute-${env}.internal`,
        timeout: 20000,
    })
    const response = await http.post(`/testing-support/lease`,
    { "microservice": "xui_webapp" },
    {
        headers:{
                "accept": "*/*",
                "Content-Type": "application/json" 
        }
    } );
    return response.data; 
}


module.exports = { getS2SToken }

