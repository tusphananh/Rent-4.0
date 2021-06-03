let searching = false;
let isEnmergency = false;
var activityToken 
const searchButton = document.getElementById('searchButton')

searchSuggestions = ['Car','Bike','Phone','Batery','Backup','Book']

function getMatchSearch(text){
  const result = []
  if (text != ''){
    console.log('no empty')
    for ( i = 0; i < searchSuggestions.length; i++ ){
      let suggestText = searchSuggestions[i]
      console.log(suggestText)
      if(suggestText.toLowerCase().includes(text.toLowerCase())){
        console.log('true')
        result.push(suggestText)
      }
    }
  }
  return result
}

function expandSuggestions(e){
  const suggestionContainer = document.getElementById('suggestions-container')
  const suggestions = getMatchSearch(e.target.value)
  const length = suggestions.length
  console.log(suggestions)
  suggestionContainer.innerHTML = ''
  if (length > 0){
     suggestionContainer.style.display = 'flex'
     for (i = 0; i < length; i++ ){
        suggestionContainer.insertAdjacentHTML('beforeend',suggestionTemplate(suggestions[i]))
      }
  }
  else{
    suggestionContainer.style.display = 'none'
  }
}


function sugesstionClick(e){
  const searchBox = document.getElementById('search-box')
  searchBox.value = e.target.value
  const suggestionContainer = document.getElementById('suggestions-container')
  suggestionContainer.style.display = 'none'
}

resultFrame.addEventListener('animationend', ()=>{
    searchButton.disabled =false
})

searchButton.onclick = function(event) {
  
    if(mapLoaded && checkItem()){
        searching = !searching
        if(searching){
            token = new Date().getTime()
            activityToken = token.toString()
            searchSubmit()
        }
        else{
            cancelSubmit()
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
    removeSearch_socket()
    clearResult()
    clearResultMarkers()
}


var suggestButtons = ''
const searchBox = document.getElementById('search-box')
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
        searchBox.value = ''
    }
    else{
        suggestButtons = objectName
        target.style.color = '#B8D8D8'
        target.style.border = '2px solid #B8D8D8'
        searchBox.value = target.value
    }
    
    
}

function emitSearch_socket(){
    socket.emit('search',{
        activityToken : activityToken,
        socketID: socketID,
        item : searchBox.value,
        position: currentPosition,
        isEnmergency : isEnmergency
    })

}

function removeSearch_socket(){
    socket.emit('remove-search',{
        activityToken : activityToken
    })

}

const itemError = document.getElementById('itemError')
function checkItem(){
    if (searchBox.value == ''){
        itemError.style.display = 'flex'
        return false
    }

    itemError.style.display = 'none'
    return true
}
