const express = require('express')
const app = express();
const http = require('http').Server(app)
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/public/Searching/html/searching.html')
})

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const searchs = []

io.on('connect', socket => {
    console.log(socket.id + ' has been connected');
    for (let i = 0; i < searchs.length; i++){
        io.to(socket.id ).emit('noti',searchs[i])
    }
    socket.on('remove-search',data =>{
        removeSearchs_by_activityToken(data.activityToken)
        io.emit('remove-search',data)
    })

    

    socket.on('disconnect', function () {
        console.log(socket.id + ' has been disconnected');

        const search = searchs[getIndex_by_socketID(socket.id)]
        if(search){
            removeSearchs_by_socketID(socket.id)
            io.emit('remove-search',search)
        }

        io.emit('remove-result',{
            socketID : socket.id
        })
    });

    socket.on('search', data => {
        addSearchs(data)
        io.emit('noti',data)
    })
    
    socket.on('resend', data => {
        io.to(data.socketID).emit('noti',data.data)
    })

    socket.on('result',data => {
        io.to(data.search.socketID).emit('result',data.result)
    })

});

http.listen(PORT, () => console.log(`listening on ${PORT}`));



function getIndex(item){
    for (let i = 0; i < searchs.length; i++){
        if(item.activityToken === searchs[i].activityToken){
            return i
        }
    }
    return -1
}


function addSearchs(item){
    searchs.push(item);
}

function getIndex_by_socketID(socketId){
    for (let i = 0; i < searchs.length; i++){
        if(searchs[i].socketID === socketId){
            return i
        }
    }
    return -1
}
function getIndex_by_activityToken(activityToken){
    for (let i = 0; i < searchs.length; i++){
        if(searchs[i].activityToken === activityToken){
            return i
        }
    }
    return -1
}

function removeSearchs_by_socketID(socketId){
    var index = getIndex_by_socketID(socketId)
    if (index !== -1) {
        searchs.splice(index, 1);
        return true;
    }
    return false;
}

function removeSearchs_by_activityToken(activityToken){
    var index = getIndex_by_activityToken(activityToken)
    if (index !== -1) {
        searchs.splice(index, 1);
        return true;
    }
    return false;
}

