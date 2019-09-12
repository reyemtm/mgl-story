import {
  createStory
} from './mgl-story.js'

mapboxgl.accessToken = 'pk.eyJ1IjoicmV5ZW10bSIsImEiOiJCTHUxSVZ3In0.Q-qbg_jG0JcT6bfBeiwXQg';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [-74.50, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

map.on("load", function() {
  createStory(this, "./story.geojson", "story")
})