const express = require('express');
const bodyparser = require('body-parser');
let app = express();
var socket = require('socket.io');

app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var server = app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});

app.get('/', (req, res) => {
    res.send(express.static('views'));
});

var io = socket(server);

io.on('connection', (socket) => {
    console.log("Made a socket connection ", socket.id);

    socket.on('message', function (data) { //listen from client
        console.log(data);
        io.sockets.emit('message', data); //send to client

    });

    socket.on('typing', function (data) {
        io.sockets.emit('typing', data);
    });
});

module.exports = app;