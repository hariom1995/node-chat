const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

console.log(publicPath);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('new user is connected');

    socket.emit('newMessage', {
        to:'send by server.js',
        text: 'this is send by server',
        createdAt: 123456
    });

    socket.on('createMessage', (message)=>{
       console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});


server.listen(port, () => {
    console.log('local host 3000 is working');
});