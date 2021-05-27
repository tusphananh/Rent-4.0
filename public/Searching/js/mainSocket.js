
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

socket.on('remove-search',data=>{
    if( typeof currentPosition !== "undefined"){
        removeNoti_by_activityToken(data.activityToken)
    }
    
})


socket.on('result',data =>{
    addResult(data)
})

socket.on('message',data =>{
    addGuestMessage(data.activityToken , data.message)
})

socket.on('remove-result',data =>{
    hideResultCardBySocketID(data.socketID)
})

socket.on('activities',data =>{
    addActivityCard(data)
})