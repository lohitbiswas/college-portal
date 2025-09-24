const app = require('./src/app'); 
// const http=require('http');
// const initializeWebSocket = require('./src/ws');
const {createServer}=require('node:http');
const {Server}=require('socket.io');
const setupSocket=require('./src/config/webSockethandlers');

const server = createServer(app);
const  io = new Server(server);
setupSocket(io);

const port = process.env.PORT || 3000;
const start= async()=>{
    try{
       await server.listen(port, '127.0.0.1',() => {
            
            console.log(`Server is running on http://localhost:${port}`);
          });
    }
    catch(error){
        console.log("Error"+ error.message);
    }
};

start();


/*
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = require('./src/app');
const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 8085; // Use port 8085

// Basic route for testing
// app.get('/', (req, res) => {
//     res.send('Express server is running with Socket.io.');
// });

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
*/