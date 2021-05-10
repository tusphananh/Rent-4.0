let searching = false;
let isEnmergency = false;
var activityToken 
const searchButton = document.getElementById('searchButton')


resultFrame.addEventListener('animationend', ()=>{
    searchButton.disabled =false
})

searchButton.onclick = function(event) {
  
    if(mapLoaded && checkItem()){
        searching = !searching
        if(searching){
            activityToken = Date.parse(new Date().toLocaleString())
            searchSubmit(activityToken)
        }
        else{
            cancelSubmit(activityToken)
            activityToken = ''
        }
    }
}

function isEnmergency_click(e){
    target = e.currentTarget
    isEnmergency = target.checked
}

function searchSubmit(){
    searchButton.disabled =true
    flyCurrent(12)
    resultFrame.style.animationName = "open";
    searchButton.innerText = 'CANCEL'
    if(mapLoaded){
        emitSearch_socket()
    }
   
}

function cancelSubmit(){
    searchButton.disabled =true
    flyCurrent(15)
    resultFrame.style.animationName = "close";
    searchButton.innerText = 'SEARCH'
    emitSearch_socket()
    clearResult()
    clearResultMarkers()
}


var suggestButtons = ''
const searchBox = document.getElementsByClassName('searchBox')
function sorted(e){
    target = e.currentTarget
    objectName = target.id
    buttons = document.getElementsByClassName(target.className)
    for ( var i = 0 ; i < buttons.length;i++){
        buttons[i].style.color = 'rgba(0,0,0,0.3)'
        buttons[i].style.border = '2px solid rgba(0,0,0,0.1)'
    }
    
    if (suggestButtons == objectName){
        suggestButtons = ''
        searchBox[0].value = ''
    }
    else{
        suggestButtons = objectName
        target.style.color = '#B8D8D8'
        target.style.border = '2px solid #B8D8D8'
        searchBox[0].value = target.value
    }
    
    
}

function emitSearch_socket(){
    socket.emit('search',{
        activityToken : activityToken,
        socketID: socketID,
        item : searchBox[0].value,
        position: currentPosition,
        isSearching: searching,
        isEnmergency : isEnmergency
    })

}

const itemError = document.getElementById('itemError')
function checkItem(){
    if (searchBox[0].value == ''){
        itemError.style.display = 'flex'
        return false
    }

    itemError.style.display = 'none'
    return true
}
