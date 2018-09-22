var socket = io();

socket.on('connect', function(){
    console.log('New user connect succesfully');
});
socket.on('disconnect', function(){
    console.log('User disconnected');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});
var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('your browser is not supported geolocation');
    }
    navigator.geolocation.getCurrentPosition( function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        return alert('Unable to fatch your geolocation');
    });
});

socket.on('newLocationMessage', function(message){
    var li = $('<li></li>');
    var a = $('<a target ="_blank">my current location</a>');

    li.text(`${message.from} : `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});