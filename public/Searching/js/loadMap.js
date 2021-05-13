mapboxgl.accessToken = 'pk.eyJ1IjoidHVzcGhhbmFuaCIsImEiOiJja244eDFyMGkwM3R5MnVvbzI1eWZsYzNuIn0.jm4MGKDtKDMBpLz8IUXyAA';

var map
let mapLoaded = false

var currentPosition

var loading = document.getElementsByClassName('lds-ellipsis')

if ("geolocation" in navigator) { 
    navigator.geolocation.getCurrentPosition(position => { 
        currentPosition = new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude)

        createMap()

        flyCurrent(15)
        addMarker(currentPosition)
        loading[0].style.display = 'none'
        mapLoaded= true;
    }); 

} else { /* geolocation IS NOT available, handle it */ }

function getDistance(start,end) {
    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start.lng + ',' + start.lat + ';' + end.lng + ',' + end.lat + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
    var receivedData; // store your value here
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        async: false,
        success: function(data){
            receivedData = data;
        }
    }); 

    return receivedData.routes[0].distance / 1000;
}

function getDuration(start,end) {
    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start.lng + ',' + start.lat + ';' + end.lng + ',' + end.lat + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
    var receivedData; // store your value here
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        async: false,
        success: function(data){
            receivedData = data;
        }
    }); 

    return receivedData.routes[0].duration / 60;
}

function get_Dis_and_Dura(start,end) {
    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start.lng + ',' + start.lat + ';' + end.lng + ',' + end.lat + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
    var receivedData; // store your value here
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        async: false,
        success: function(data){
            receivedData = data;
        }
    }); 

    return{   
        distance : (receivedData.routes[0].distance / 1000 ),
        duration: (receivedData.routes[0].duration / 60)
    }
}

function addMarker(lnglat){ 
    var markerPoint = document.createElement('div');
    markerPoint.className = 'markerPoint';
    var markerRadar = document.createElement('div');
    markerRadar.className = 'markerRadar';

    new mapboxgl.Marker(markerPoint)
    .setLngLat(lnglat)
    .addTo(map);

    new mapboxgl.Marker(markerRadar)
    .setLngLat(lnglat)
    .addTo(map);
}
function addMarker_result(lnglat){ 
    var markerPoint = document.createElement('div');
    markerPoint.className = 'resultPoint';
    var markerRadar = document.createElement('div');
    markerRadar.className = 'markerRadar';

    return {
        markerPoint: new mapboxgl.Marker(markerPoint)
        .setLngLat(lnglat)
        .addTo(map),

        markerRadar:new mapboxgl.Marker(markerRadar)
        .setLngLat(lnglat)
        .addTo(map)
    }
}

function flyCurrent(zoomLevel){
    map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        zoom: zoomLevel,
        center: currentPosition,
    })
}
function flyTo(position,zoomLevel){
    map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        zoom: zoomLevel,
        center: position,
    })
}

function createMap(){
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 15
          
    })


    map.on('click', function(e) {
        // The event object (e) contains information like the
        // coordinates of the point on the map that was clicked.
        // if (socketID != null){
        //     socket.emit('search',{
        //         socketID: socketID,
        //         position: e.lngLat
        //      })
        // }

    })
}

function checkNear(socket_id,pos,distance){
    return !isCurrent(socket_id) && ( getDistance(currentPosition,pos) <= distance )
}

function isCurrent(socket_id){
    if(socket_id == socketID){
        console.log('It\'s you')
        return true
    }
    return false
}