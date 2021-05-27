const noti = []
let notiInterator = noti.values()
const green = '#3cfa85'
const red = '#FE5F55'
const notiTab = document.getElementById('notiCard_container');


function sendNoti(data) {
    let guest_activityToken = data.activityToken
    let guest_socketID = data.socketID
    let guest_position = data.position
    let guest_isEnmergency = data.isEnmergency
    let item = data.item

    if(checkNear(guest_socketID,guest_position,6)){
        dis_dur = get_Dis_and_Dura(currentPosition,guest_position)
        if(dis_dur){
            const notification = {
            activityToken: guest_activityToken,
            socketID: guest_socketID,
            item: item,
            pos : guest_position,
            distance : dis_dur.distance,
            duration : dis_dur.duration, 
            isEnmergency : guest_isEnmergency
            }
            addNoti(notification)
        }
    }
}

function getIndex(item){
    for (let i = 0; i < noti.length; i++){
        if(item.activityToken === noti[i].activityToken){
            return i
        }
    }
    return -1
}

function getIndex_by_activityToken(activityToken){
    for (let i = 0; i < noti.length; i++){
        if(activityToken == noti[i].activityToken){
            return i
        }
    }
    return -1
}

function removeNoti_by_activityToken(activityToken){
    var index = getIndex_by_activityToken(activityToken)
   
    if (index !== -1) {
        hide_by_activityToken(activityToken)
        noti.splice(index, 1);
        notiInterator = noti.values()
        return true;
    }
    return false;
}

function removeNoti(item){
    var index = getIndex(item)
    if (index !== -1) {
        hide_by_activityToken(item.activityToken)
        noti.splice(index, 1);
        notiInterator = noti.values()
    
        return true;
    }
    return false;
}

function addNoti(item){
    noti.push(item);
    notiInterator = noti.values()
    reDraw_Noti()
}

function getNoti(){
    return notiInterator
}

function reDraw_Noti(){
    // socketID: guest_socketID,
    // pos : guest_position,
    // distance : dis_dur[0],
    // duration : dis_dur[1]

    notiTab.innerHTML = ''
    for (const i of getNoti()){
        let modeColor = green
        let item = i.item
        let distance = i.distance.toFixed(2)
        let activityToken = i.activityToken
        if(i.isEnmergency){
            modeColor = red
        }
        const template = notificationCardTemplate(activityToken,modeColor,item,distance)
        notiTab.insertAdjacentHTML('beforeend',template)
    }
}
function detailNonErrorAnimation(id){
    const object = document.getElementById(id)
    object.style.animationName = 'resize' 
    object.addEventListener('animationend' , ()=>{
        object.style.transform = 'scale(1)'
        object.style.color = 'rgba(0, 0, 0, 0.5)'
    })
}

function detailErrorAnimations(id){
    const object = document.getElementById(id)
    object.style.animationName = 'growing' 
    object.addEventListener('animationend' , ()=>{
        object.style.transform = 'scale(1.1)'
        object.style.color = '#FE5F55'
    })
}

function onInput_Price() {
    const target = document.getElementById('price')
    const input = parseFloat(target.value.replace(/,/g, ''))
    if(isNaN(input)){
        target.value = ''
    }
    else{
        target.value = input.toLocaleString()
    }
    
}

function checkBrand(brand){
    
    if( brand == '' ){
        detailErrorAnimations('brand-text')
        return false
    }
    
    detailNonErrorAnimation('brand-text')
    return true
}

function checkPrice(price){

    if( price == '' ){
        detailErrorAnimations('price-text')
        return false
    }
    detailNonErrorAnimation('price-text')
    return true
}
function checkNote(note){
  
    if(note.length > 50){
        detailErrorAnimations('note-text')
        return false
    }
    
    detailNonErrorAnimation('note-text')
    return true
}

function closeDetail(notiCard){
    notiCard.style.transform = 'scale(1)'
    notiCard.style.animationName = 'close-detail'
    notiCard.addEventListener('animationend', ()=>{
        notiCard.style.transform = 'scale(1)'
        notiCard.style.height = '90px'
        notiCard.style.marginBottom = '20px'
    })
}
function openDetail(notiCard){
    notiCard.style.transform = 'scale(1.1)'
    notiCard.style.animationName = 'expand-detail'
    notiCard.addEventListener('animationend', ()=>{
        notiCard.style.height = '300px'
        notiCard.style.transform = 'scale(1.1)'
        notiCard.style.marginBottom = '40px'
    })
}
function notiApprove(e){
    const activityToken = e.target.value
    const notiCard = document.getElementById(activityToken)
   
    if(notiCard.getAttribute('isClosed') == 'true'){
        
        openDetail(notiCard)
        notiCard.setAttribute('isClosed','false')
    }
    else{
        const brand = document.getElementById('brand').value
        const price = document.getElementById('price').value
        let note = document.getElementById('note').value
        if(note == ''){
            note = 'None'
        }
        if(checkBrand(brand) && checkPrice(price) && checkNote(note)){
            const activityToken = e.target.value
            const index = getIndex_by_activityToken(activityToken)
            if(index !== -1){
                search = noti[index]
                sendResult(search,{
                    activityToken : activityToken,
                    socketID : socketID,
                    position : currentPosition,
                    brand:brand,
                    price : parseFloat(price.replace(/,/g, '')),
                    note : note,
                    distance : search.distance,
                    duration : search.duration,
                })
                
                removeNoti_by_activityToken(activityToken)
            }
        }
    }
    
}

function notiDecline(e){
    const activityToken = e.target.value
    const notiCard = document.getElementById(activityToken)
    if(notiCard.getAttribute('isClosed') == 'true'){
        removeNoti_by_activityToken(e.target.value)
    }
    else{
        closeDetail(notiCard)
        notiCard.setAttribute('isClosed','true')
    }
    
}

// function hide(e){
//     const target = document.getElementById(e.target.value)
//     target.style.animationName = 'hide'
//     target.addEventListener('animationend' , ()=>{
//         target.remove()
//     })
// }

function hide_by_activityToken(activityToken){
    const target = document.getElementById(activityToken)
    target.style.animationName = 'hide'
    target.addEventListener('animationend' , ()=>{
        target.remove()
    })
}

function sendResult(search,result){
    socket.emit('result',{
        search: search,
        result: result,
    })
}

function removeSearch(search){

}
