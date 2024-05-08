const io = require('socket.io')(process.env.PORT || 3000, {
    cors: { origin: "*" }
});

io.on('connection', socket => {
    socket.on("userJoin", (value) => {
        socket.broadcast.emit("userJoin", value);
    });
    socket.on("messageSend", (message, nickname) => {
        socket.broadcast.emit("messageSend", message, nickname);
    });
    socket.on("userDisconnect", (nickname) => {
        socket.broadcast.emit("userDisconnect", nickname);
    });
});