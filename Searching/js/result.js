const resultSet = []
const resultFrame = document.getElementById('resultFrame')
const markerSet = []
function addResult(data){
    let distance = data.distance
    let duration = data.duration
    let guest_socketID = data.socketID
    let guest_position = data.position

    const result = {
        socketID: guest_socketID,
        position: guest_position,
        distance: distance,
        duration: duration,
    }

    resultSet.push(result)
    addResult_card(result)
}

function addResult_card(result){
    const socketID = result.socketID
    const position = result.position
    const distance = result.distance
    const duration = result.duration

    const template = 
    ` 
    <div class='resultCard' id=${socketID} onmouseenter = resultMouseEnter(event) onmouseleave = resultMouseLeave(event)>
        <div style='left: 25px;position: absolute;top:10px'>
            <p style='margin:5px;font-size: 20px;font-weight: 800'>About ${distance} km</p>
             <p style='margin:5px;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>Take ${duration} minute</p>
         </div>
         <div style='height:100%;display: flex;flex-direction: column; justify-content: center; right:0 ;position: absolute;'>
             <button class="resultApprove" value=${socketID} onclick='resultApprove(event)'>Appove</button>
        </div>
    </div>
    `
    
    resultFrame.insertAdjacentHTML('beforeend',template)
    markerSet.push(addMarker_result(position))
}

function resultApprove(e){

}

function clearResult(){
    resultSet.splice(0, resultSet.length)
    resultFrame.innerHTML = ''
}

function resultMouseEnter(e){
    const socketID = e.target.id
    const index = getResultIndex_by_Socket(socketID) 
    if ( index !== -1){
        const position = resultSet[index].position
        flyTo(position,14)
    }
    
}

function resultMouseLeave(e){
    flyCurrent(12)
}

function getResultIndex_by_Socket(socketID){
    for(let i = 0; i < resultSet.length; i++){
        if(resultSet[i].socketID == socketID){
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


