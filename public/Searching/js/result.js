const resultSet = []
const resultFrame = document.getElementById('resultFrame')
const markerSet = []
function addResult(data){
    let brand = data.brand
    let price = data.price
    let note = data.note
    let distance = data.distance
    let duration = data.duration
    let guest_socketID = data.socketID
    let guest_position = data.position

    const result = {
        
        socketID: guest_socketID,
        position: guest_position,
        brand:brand,
        price : price,
        note : note,
        distance: distance,
        duration: duration,
    }

    resultSet.push(result)
    addResult_card(result)
}

function addResult_card(result){
    let brand = result.brand
    let price = result.price
    let note = result.note
    const socketID = result.socketID
    const position = result.position
    const distance = result.distance.toFixed(2)
    const duration = result.duration.toFixed(2)

    const template = 
    ` 
    <div class='resultCard' id=${socketID} onmouseenter = 'resultMouseEnter(event)' onmouseleave = 'resultMouseLeave(event)' >
        <div style='position: relative ; width: 100% ; height: 60px'>
            <p style='margin:10px;margin-top:10px;font-size: 20px;font-weight: 800;align-self: flex-end;'>${brand} </p>
            <p style='margin:10px;font-size: 15px;font-weight: 600 ;color:rgba(0, 0, 0, 0.5);align-self: flex-end;'>${price.toLocaleString()} VND</p>
        </div>
        <div style = 'height: 1px ;width:100%; background-color : rgba(0, 0, 0, 0.1) ; margin-bottom:10px;margin-top:10px;'></div>
        <div id='result-detail-card'>
        
            <p class='result-detail-header'>
                Note
            </p>
            <p style='margin:5px;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>${note}</p>
            <p  class='result-detail-header'>
                Distance 
            </p>
            <p style='margin:5px;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>Anout ${distance} km </p>
            <p  class='result-detail-header'>
                Duration
            </p>
            <p style='margin:5px;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>Take ${duration} minutes </p>
        
        </div>
        <div style = 'height: 1px ; width:100%; background-color : rgba(0, 0, 0, 0.1) ; margin-bottom:10px;margin-top:10px;'></div>
        <div style="display: flex; justify-content: center;align-items: center; width:100% ; height:20px">
            <button class="resultApprove" value=${socketID} onclick='resultApprove(event)'>Appove</button>
        </div>
        
    </div>
    `
    
    resultFrame.insertAdjacentHTML('beforeend',template)
    markerSet.push(addMarker_result(position))
}

function resultApprove(e){

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
    resultFrame.innerHTML = ''
}

function resultMouseEnter(e){
    console.log(e.target.value)
    const target = e.target
    const socketID = target.id
    const index = getResultIndex_by_Socket(socketID) 
    if ( index !== -1){
        const position = resultSet[index].position
        flyTo(position,14)
    }
    openResultDetail(target)
}

function resultMouseLeave(e){
    const target = e.target
    closeResultDetail(target)
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


