
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const markers = []
io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('marker', data =>{
        markers.push(data)
        console.log(markers);
        socket.emit('marker',data)
        io.emit('marker', data)
    });
});

http.listen(3000, () => console.log('listening on http://localhost:8080') );


// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => { 

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });


 
