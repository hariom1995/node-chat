var socket = io();

socket.on('connect', function(){
    console.log('New user connect succesfully');
});
socket.on('disconnect', function(){
    console.log('User disconnected');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});