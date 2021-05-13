const activites = []

function addActivity(data){
    let brand = data.brand
    let price = data.price
    let note = data.note
    let distance = data.distance
    let duration = data.duration
    let guestSocketID = data.socketID
    let guestPosition = data.position
    let ownerSocketID = socketID
    let activityToken = data.activityToken

    const activiy = {
        activityToken : activityToken,
        socketID: guestSocketID,
        position: guestPosition,
        brand:brand,
        price : price,
        note : note,
        distance: distance,
        duration: duration,
    }

    activites.push(activiy)

    return activiy
}

function addActivityCard(activity){

}