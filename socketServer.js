const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 8085; // Use port 8085

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Express server is running with Socket.io.');
});

// Setup Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Example of handling a disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(port, '127.0.0.1', () => {
    console.log(`Server is running on http://localhost:${port}`);
});