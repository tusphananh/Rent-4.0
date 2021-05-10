
var HOST = location.origin.replace(/^http/, 'ws')
const socket = io.connect(HOST);

var socketID

socket.on('connect', data =>{
    socketID = socket.id 
})

socket.on('noti',data => {
    if( typeof currentPosition !== "undefined"){
        sendNoti(data)
    }
    else{
        socket.emit('resend',{ 
            data: data,
            socketID:socketID
        })
    }
})


socket.on('result',data =>{
    addResult(data)
})