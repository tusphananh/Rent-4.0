
const socket = io('ws://localhost:3000');

mapboxgl.accessToken = 'pk.eyJ1IjoidHVzcGhhbmFuaCIsImEiOiJja244eDFyMGkwM3R5MnVvbzI1eWZsYzNuIn0.jm4MGKDtKDMBpLz8IUXyAA';

var currentPosition
var markerPoint = document.createElement('div');
markerPoint.className = 'markerPoint';
var markerRadar = document.createElement('div');
markerRadar.className = 'markerRadar';
var loading = document.getElementsByClassName('lds-ellipsis')

if ("geolocation" in navigator) { 
    navigator.geolocation.getCurrentPosition(position => { 
        currentPosition = position
        var map = new mapboxgl.Map({
        // container id specified in the HTML
          container: 'map',

           // style URL
          style: 'mapbox://styles/mapbox/streets-v11',

         // initial position in [lon, lat] format
          center: [position.coords.longitude, position.coords.latitude],

         // initial zoom

         zoom: 14
        });
        if (map.getSource('my-data') && map.isSourceLoaded('my-data')) {
            console.log('source loaded!');
        }
        new mapboxgl.Marker(markerPoint)
      .setLngLat([position.coords.longitude, position.coords.latitude])
      .addTo(map);

      new mapboxgl.Marker(markerRadar)
      .setLngLat([position.coords.longitude, position.coords.latitude])
      .addTo(map);

      loading[0].style.display = 'none'
    }); 
} else { /* geolocation IS NOT available, handle it */ }