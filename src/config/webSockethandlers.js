


// function handleConnection(ws) {
    
//     ws.send('Welcome to the WebSocket server!');

    
//     ws.on('message', (message) => {
//         console.log(`Received message: ${message}`);

   
//         ws.send(`Server received: ${message}`);
//     });


//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });

//     // Handle errors
//     ws.on('error', (error) => {
//         console.error('WebSocket error:', error,error.message);
//     });
// }

// module.exports = {
//     handleConnection
// };

// socket.js
const setupConnection = (io) => {

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

  
        socket.on('message', (msg) => {
            console.log('Message received:', msg);
            
            io.emit('message', msg);
        });

        
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

module.exports=setupConnection;
