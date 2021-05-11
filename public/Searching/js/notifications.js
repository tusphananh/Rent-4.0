const noti = []
let notiInterator = noti.values()
const green = '#3cfa85'
const red = '#FE5F55'
const notiTab = document.getElementById('notiCard_container');


function sendNoti(data) {
    let guest_activityToken = data.activityToken
    let guest_socketID = data.socketID
    let guest_position = data.position
    let isSearching = data.isSearching
    let guest_searching = data.isSearching
    let guest_isEnmergency = data.isEnmergency
    let item = data.item

    if(checkNear(guest_socketID,guest_position,6)){
        dis_dur = get_Dis_and_Dura(currentPosition,guest_position)
        console.log(dis_dur)
        if(dis_dur){
            const notification = {
            activityToken: guest_activityToken,
            socketID: guest_socketID,
            item: item,
            pos : guest_position,
            distance : dis_dur.distance,
            duration : dis_dur.duration, 
            isSearching: guest_searching,
            isEnmergency : guest_isEnmergency
            }
            if(isSearching){
                addNoti(notification)
            }
            else{
                removeNoti(notification)
            }
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
        <div class='notiCard' id=${activityToken}>
            <div class="enmergencyMode" style ='background-color: ${modeColor};' ></div>
            <div style='left: 25px;position: absolute;top:10px'>
                <p style='margin:5px;font-size: 20px;font-weight: 800'>${item}</p>
                <p style='margin:5px;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>About ${i.distance.toFixed(2)}km away</p>
            </div>
            <div style='height:100%;display: flex;flex-direction: column; justify-content: center; right:0 ;position: absolute;'>
                <button class="approve" value=${activityToken} onclick='notiApprove(event)'>Appove</button>
                <button class="decline" value=${activityToken} onclick='notiDecline(event)'>Decline</button>
            </div>
        </div>
        `

        notiTab.insertAdjacentHTML('beforeend',template)
    }
}
function openDetail(activityToken){
    const template = 
        ` 
        <div id='detail-container'>
        <div id='detail-card'>
          <button class="detail-close" onclick='detailDecline()'>x</button>
          <p style="font-size: 25px; color: #B8D8D8; font-weight: 800;">
            WE NEED MORE INFORMATION
          </p>
          <p style="font-size: 20px; color: rgba(0, 0, 0, 0.5) ; font-weight: 800; letter-spacing: 5px;margin-bottom:10px">
            PRICE
          </p>
          <input class="detail-input" type="text" id="price" placeholder="Price" />
  
          <div id="priceError" style="display: none; align-items: center; ">
            <div class="errorCircle" style ='background-color: lightcoral; margin:5px' ></div>
            <p style='color:lightcoral ;font-size:13px'>Please enter number type</p>
          </div>
  
          <p style="font-size: 10px; color: rgba(0, 0, 0, 0.5) ; font-weight: 400;">
            Your price will be compared in renter's result
          </p>
          <p style="font-size: 20px; color: rgba(0, 0, 0, 0.5) ; font-weight: 800; letter-spacing: 5px;margin-bottom:10px">
            NOTE
          </p>
          <input class="detail-input" type="text" id="note" placeholder="Note" />
          <div id="noteError" style="display: none; align-items: center; ">
            <div class="errorCircle" style ='background-color: lightcoral; margin:5px' ></div>
            <p style='color:lightcoral ;font-size:13px'>Please write less than 10 words</p>
          </div>
  
          <p style="font-size: 10px; color: rgba(0, 0, 0, 0.5) ; font-weight: 400;">
            Write less than 10 words
          </p>
          <button class="detail-approve" onclick='detailApprove(event)' value = ${activityToken}>SEND</button>
        </div>
      </div>
        `

    document.getElementsByTagName("BODY")[0].insertAdjacentHTML('beforeend',template)
}
function detailApprove(event){
    const price = document.getElementById('price').value
    const note = document.getElementById('note').value
    if(checkPrice(price) && checkNote(note)){
        const activityToken = event.target.value
        const index = getIndex_by_activityToken(activityToken)
        console.log(activityToken)
        console.log(index)
        if(index !== -1){
            search = noti[index]
            sendResult(search,{
                socketID : socketID,
                position : currentPosition,
                price : price,
                note : note,
                distance : search.distance,
                duration : search.duration,
            })
            closeDetail()
            removeNoti_by_activityToken(activityToken)
        }
    }
}
function detailDecline(event){
    closeDetail()
}

function closeDetail(){
    const container = document.getElementById('detail-container')
    const card = document.getElementById('detail-card')
    container.addEventListener('animationend',()=>{
        container.remove()
    })

    card.addEventListener('animationend',()=>{
        card.remove()
    })

    card.style.animationName = 'disappear'
    container.style.animationName = 'fadeOut'

}

function checkPrice(price){
    const error = document.getElementById('priceError')   
    if( price == '' || isNaN(Number(price))){
        error.style.display = 'flex'
        return false
    }
    error.style.display = 'none'
    return true
}
function checkNote(note){
    const error = document.getElementById('noteError')
    if(note.length > 50){
        error.style.display = 'flex'
        return false
    }
    error.style.display = 'none'
    return true
}

function notiApprove(e){
    const activityToken = e.target.value
    openDetail(activityToken)
    console.log('notiApprove')
    
}

function notiDecline(e){
    console.log('notiDecline')
    removeNoti_by_activityToken(e.target.value)
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
