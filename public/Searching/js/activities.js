const activities = []

function addActivity(data){
   
    const activiy = {
        activityToken : data.activityToken,
        brand: data.brand,
        price : data.price,
        note : data.note,
        distance: data.distance,
        duration: data.duration,
        guestPosition : data.guestPosition,
        guestSocketID: data.guestSocketID,
        ownerPosition : data.ownerPosition,
        ownerSocketID: data.ownerSocketID
    }

    activities.push(activiy)
    return activiy
}

function addActivityCard(data){
    const activiy = addActivity(data)
    if(activiy){
        const container = document.getElementById('activities-recent-container')
        const brand = data.brand
        const price = data.price
        const note = data.note
        const distance = data.distance
        const duration = data.duration
        const activityToken = data.activityToken

        const template = activityCardTemplate(activityToken,'Phan Anh Tu',brand,'0932059267',price,note,distance,duration)
        container.insertAdjacentHTML('beforeend',template)
    }
}
function addGuestMessage(activityToken,message){
    console.log('Add message')
    const container = document.getElementById(activityToken + '-activities-message-container')
    const template = guestMessageTemplate(message)
    container.insertAdjacentHTML('beforeend',template)
    container.scrollTop = container.scrollHeight
}
function activityMessageSend(e){
    const activityToken = e.target.getAttribute('activityToken')
    
    const container = document.getElementById(activityToken + '-activities-message-container')
    const message = document.getElementById(activityToken + '-activities-message-input')
    const messageValue = message.value
    const template = ownerMessageTemplate(messageValue)
    container.insertAdjacentHTML('beforeend',template)
    message.value =''
    container.scrollTop = container.scrollHeight
    const index = getActivityIndex_by_activityToken(activityToken)

    if(index !== -1){
        var socketid 
        if (socketID == activities[index].ownerSocketID){
            socketid = activities[index].guestSocketID
        }
        else{
            socketid = activities[index].ownerSocketID
        }
        socket.emit('message', {
            socketID : socketid,
            activityToken : activityToken,
            message : messageValue
        })
    }
    
}
function activityMessageClick(e){
    e.stopPropagation();
    const target = e.target
    showActivityMessageByTarget(target)
}

function activityCardClick(e){
    showActivityDetailsByTarget(e.currentTarget)
}

function expandActivityCard(card){
    card.setAttribute('isClosed', 'false')
    card.style.pointerEvents = 'none'
    card.style.animationName = 'show-activities'
    card.addEventListener('animationend', ()=>{
        card.style.height = '300px'
        card.style.animationName = ''
        card.style.pointerEvents = 'auto'
    })
}

function collapseActivityCard(card){
    card.setAttribute('isClosed', 'true')
    card.style.pointerEvents = 'none'
    card.style.animationName = 'hide-activities'
    card.addEventListener('animationend', ()=>{
        card.style.height = '80px'
        card.style.animationName = ''
        card.style.pointerEvents = 'auto'
    })
}

function showActivityDetailsByTarget(target){
    const activityToken = target.getAttribute('activityToken')
    const card = document.getElementById(activityToken + '-activities-card')
    const message = document.getElementById(activityToken + '-activities-message')
    const detail  = document.getElementById(activityToken + '-activities-detail')
    if(card.getAttribute('isClosed') === 'true'){
        message.style.display = 'none'
        detail.style.display = 'flex'
        expandActivityCard(card)
    }
    else{
        collapseActivityCard(card)
    }
}

function showActivityMessageByTarget(target){
    const activityToken = target.getAttribute('activityToken')
    const card = document.getElementById(activityToken + '-activities-card')
    const message = document.getElementById(activityToken + '-activities-message')
    const detail  = document.getElementById(activityToken + '-activities-detail')
    if(card.getAttribute('isClosed') === 'true'){
        detail.style.display = 'none'
        message.style.display = 'flex'
        expandActivityCard(card)
    }
    else{
        collapseActivityCard(card)
    }
}

function getActivityIndex_by_activityToken(activityToken){
    for (let i = 0; i < activities.length; i++){
        
        if(activityToken === activities[i].activityToken){
            return i
        }
    }
    return -1
}