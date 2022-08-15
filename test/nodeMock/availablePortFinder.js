

const fs = require('fs');
const path = require('path');
var portfinder = require('portfinder');

portfinder.basePort = 3001;    // default: 8000
portfinder.highestPort = 3200; // default: 65535


function getAvailablePort(){
    const portData = fs.readFileSync(`${__dirname}/NODEMOCK_PORT.txt`, "utf8");
    console.log(`${portData}`);
    return portData; 
}


function updateAngularProxyTestConfig(availablePort){
    const proxyFilePath = path.resolve(__dirname,"../../proxy.config.json")
    const proxyTestPath = path.resolve(__dirname, "../../proxyTest.config.json")

    fs.readFile(proxyFilePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // const availablePort = getAvailablePort();
        var result = data.replace(/3001/g, availablePort);

        fs.writeFile(proxyTestPath, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

function configureTestProxyPort(){
    return portfinder.getPort(function (err, port) {
        if (err) {
            throw Error("No free port available")
        }
        console.log(`************ First port available in range: ${port} of [${portfinder.basePort} - ${portfinder.highestPort}] ************`);
        fs.writeFileSync(`${__dirname}/NODEMOCK_PORT.txt`, port+"");
        // getAvailablePort();
        updateAngularProxyTestConfig(port);

    });

}

module.exports = { configureTestProxyPort, getAvailablePort };

