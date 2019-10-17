var http = require("http");

var port = process.env.PORT || 3000;

http.createServer(function (request, response) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // Send the response body as "Hello World"
    response.end('Hello World\n');
}).listen(port);

// Console will print the message
console.log('Server running on port: ' + port);
