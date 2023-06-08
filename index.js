const express = require('express');
const app = express();

const server = require('http').createServer(app);

var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

io.on('connection', function (client){
    console.log('Client connected...');
    client.on('join', function(data){
        console.log(data);
    });
    client.on('messages', function(data){
        client.emit('thread', data);
        client.broadcast.emit('thread', data);
    })
});

server.listen(8000);