// minimalServer.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

const PORT = 8085; // Change to your desired port

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
