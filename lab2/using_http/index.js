const http = require("http");
const fs = require('fs');

let statusCode;
let bufferCache;

function readHtmlFile(filename, res) {
    fs.readFile(__dirname + '/' + filename, function(err, buffer) {
        if (err) {
            statusCode = 404;
            bufferCache = "Page Not Found";
        } else {
            statusCode = 200;
            bufferCache = buffer;
        }
        res.setHeader("Content-Type", "text/html");
        res.writeHead(statusCode);
        res.end(bufferCache);
    });
}

const serveGETRequest = function(req, res) {
    if (req.method == "POST") {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end('{"message": "Your POST request has been received."}');
    } else if (req.method == "GET") {
        switch(req.url) {
            case "/json":
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end('{"message": "Hello world"}');
                break;
            case "/":
                readHtmlFile("index.html", res);
                break;
            case "/index.html":
                readHtmlFile("index.html", res);
                break;
            case "/page1.html":
                readHtmlFile("page1.html", res);
                break;
            case "/page2.html":
                readHtmlFile("page2.html", res);
                break;
        }
    } else {
        res.writeHead(405);
        res.end('{"error": "Method not supported"}');
    }
}

const server = http.createServer(serveGETRequest);

server.listen(4444, "localhost", function() {
    console.log("server is running on http://localhost:4444");
});
