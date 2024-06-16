const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let lastMessages = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    // Send the last 5 messages to the new user
    socket.emit('load previous messages', lastMessages);

    socket.on('chat message', (msg) => {
        // Add the new message to the array
        lastMessages.push(msg);

        // Keep only the last 5 messages
        if (lastMessages.length > 5) {
            lastMessages.shift();
        }

        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
