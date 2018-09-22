const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var {generateMessage, generateLocationMessage} = require('./utility/message');
var server = http.createServer(app);
var io = socketIO(server);

console.log(publicPath);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('new user is connected');


    //socket.emit from admin text welcome to the chat app
    // socket.on('newCreateMessage', (message) => {
    //     console.log('newCreateMessage', message);
    //     io.emit('newMessage',{
    //         from: message.from,
    //         text: message.text,
    //         createAt: new Date().getTime()
    //     });
    // });
    socket.emit('newMessage', generateMessage('Admin', 'welcome to the Node based chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','Welcome new user'));
    //socket.broadcast.emit from admin text New user join


    socket.on('createMessage', (message, callback)=>{
       console.log('createMessage', message);
       io.emit('newMessage', generateMessage(message.from, message.text));
    //     socket.broadcast.emit('newMessage',{
    //         from: message.from,
    //         text: message.text,
    //         createAt: new Date().getTime()
    //     });
    callback('this is from server');
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin: ',coords.latitude,coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});


server.listen(port, () => {
    console.log('local host 3000 is working');
});