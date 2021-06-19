const resultSet = []
const resultFrame = document.getElementById('resultFrame')

resultFrame.addEventListener('animationend',()=>{
    if(resultFrame.clientHeight == 0){ 
        resultFrame.innerHTML = ''
    }
})
const markerSet = []
function addResult(data){
    let brand = data.brand
    let price = data.price
    let note = data.note
    let distance = data.distance
    let duration = data.duration
    let guestSocketID = data.socketID
    let guestPosition = data.position
    let activityToken = data.activityToken

    const result = {
        activityToken : activityToken,
        brand:brand,
        price : price,
        note : note,
        distance: distance,
        duration: duration,
        guestPosition : guestPosition,
        guestSocketID: guestSocketID,
        ownerPosition : currentPosition,
        ownerSocketID: socketID,
        
    }

    resultSet.push(result)
    addResult_card(result)
}

function addResult_card(result){
    let brand = result.brand
    let price = result.price
    let note = result.note
    const socketID = result.guestSocketID
    const position = result.guestPosition
    const distance = result.distance.toFixed(2)
    const duration = result.duration.toFixed(2)
    const activityToken = result.activityToken

    const template = resultCardTemplate(activityToken,socketID,brand,price,note,distance,duration) 
    resultFrame.insertAdjacentHTML('beforeend',template)
    markerSet.push(addMarker_result(position))
}

function resultApprove(e){
    searching = false;
    const activityToken = e.target.getAttribute('activityToken')
    const data = resultSet[getResultIndex_by_ActivityToken(activityToken)]
    if(data){
        addActivityCard(data)
        socket.emit('activities',data)
        cancelSubmit()
    }
    
}
function closeResultDetail(target){
    target.style.animationName = 'result-resize'
        target.addEventListener('animationend', ()=>{
            target.style.transform = 'scale(1)'
            target.style.height = '80px'
            target.style.marginLeft = '20px'
            
        })
    
}
function openResultDetail(target){
    target.style.animationName = 'result-expand'
        target.addEventListener('animationend', ()=>{
            target.style.height = '290px'
            target.style.transform = 'scale(1.1)'
            target.style.marginLeft = '30px'
           
        })
}

function clearResult(){
    resultSet.splice(0, resultSet.length)
}

function resultMouseEnter(e){
    const target = e.target
    const socketID = target.id
    const index = getResultIndex_by_Socket(socketID) 
    
    if ( index !== -1){
        const position = resultSet[index].guestPosition
        console.log(position)
        flyTo(position,14)
    }
    openResultDetail(target)
}

function resultMouseLeave(e){
    const target = e.target
    closeResultDetail(target)
    flyCurrent(12)
}
function getResultIndex_by_ActivityToken(activityToken){
    for(let i = 0; i < resultSet.length; i++){
        if(resultSet[i].activityToken == activityToken){
            return i
        }
    }

    return -1
}

function getResultIndex_by_Socket(socketID){
    for(let i = 0; i < resultSet.length; i++){
        if(resultSet[i].guestSocketID == socketID){
            return i
        }
    }

    return -1
}

function clearResultMarkers(){
    while(markerSet.length > 0){
        const marker = markerSet.pop()
        marker.markerPoint.remove()
        marker.markerRadar.remove()
    }
}

function removeResultBySocketID(socketID){
    const index = getResultIndex_by_Socket(socketID)
    if ( index !== -1){
        resultSet.slice(index,1)
        return true
    }
    return false
}

function hideResultCardBySocketID(socketID){
    if(removeResultBySocketID(socketID)){
        const object = document.getElementById(socketID)
        object.addEventListener('animationend',()=>{
            object.remove()
        })
        object.style.animationName = 'hide'
    }
}