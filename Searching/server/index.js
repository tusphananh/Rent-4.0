
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const searchs = []

io.on('connect', socket => {
    console.log(socket.id + ' has been connected');

    socket.on('disconnect', function () {
        console.log(socket.id + ' has been disconnected');

        const search = searchs[getIndex_by_socketID(socket.id)]
        if(search){
            search.isSearching = false
            io.emit('noti',search)
            removeSearchs_by_socketID(socket.id)
        }
    });

    for (let i = 0; i < searchs.length; i++){
        io.to(socket.id).emit('noti',searchs[i])
    }

    socket.on('search', data => {
        io.emit('noti',data)
        if(data.isSearching){
            addSearchs(data)
        }
        else{
            removeSearchs(data)
        }
    })
    
    socket.on('resend', data => {
       io.to(data.socketID).emit('noti',data.data)
    })

    socket.on('result',data => {
        io.to(data.search.socketID).emit('result',data.result)
    })
});

http.listen(3000, () => console.log('listening on http://localhost:3000') );

function getIndex(item){
    for (let i = 0; i < searchs.length; i++){
        if(item.activityToken === searchs[i].activityToken){
            return i
        }
    }
    return -1
}

function removeSearchs(item){
    var index = getIndex(item)
    if (index !== -1) {
        searchs.splice(index, 1);
        return true;
    }
    return false;
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

function removeSearchs_by_socketID(socketId){
    var index = getIndex_by_socketID(socketId)
    if (index !== -1) {
        searchs.splice(index, 1);
        return true;
    }
    return false;
}
