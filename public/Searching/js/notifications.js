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
        let activityToken = i.activityToken
        if(i.isEnmergency){
            modeColor = red
        }
        const template = 
        ` 
        <div class='notiCard' isClosed="true" id=${activityToken}>
            <div class="enmergencyMode" style ='background-color: ${modeColor};'> </div>
            <div style = 'width:300px ; height: 80px ; display: flex ;justify-content: center; position: relative; top:15px;left:15px; align: center'>
                <div style='width:200px;position: relative; display: flex ; flex-direction : column;  align: center;justify-content: left'>
                    <p style='margin:5px;font-size: 20px;font-weight: 800'>${item}</p>
                    <p style='margin:5px;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>About ${i.distance.toFixed(2)}km away</p>
                </div>
                <div style='height:100%;display: flex;flex-direction: column; justify-content: right; align: center;position: relative; margin-right:0;margin-top:5px'>
                    <button class="approve" value=${activityToken} onclick='notiApprove(event)'>Appove</button>
                    <button class="decline" value=${activityToken} onclick='notiDecline(event)'>Decline</button>
                </div>
            </div>

            <div id='detail-card'>
                <div style = 'height: 1px ; width:300px; background-color : rgba(0, 0, 0, 0.1) ; margin-bottom:10px;margin-left:-20px'></div>
                <p id='brand-text' class='detail-header'>
                    Brand
                </p>
                <input class="detail-input" type="text" id="brand" placeholder="Product's Brand" />

                <p id='price-text' class='detail-header'>
                    Price per a hour
                </p>
                <input class="detail-input" type="text" id="price" placeholder="Price" oninput='onInput_Price()'/>
        
                <p id='note-text' class='detail-header'>
                    Note
                </p>
                <input class="detail-input" type="text" id="note" placeholder="Less than 50 Characters" />
            </div>
        </div>
        `
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
