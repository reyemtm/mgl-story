import {
  createStory
} from './mgl-story.js'

mapboxgl.accessToken = 'pk.eyJ1IjoicmV5ZW10bSIsImEiOiJCTHUxSVZ3In0.Q-qbg_jG0JcT6bfBeiwXQg';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/reyemtm/cjxf2ijea17wy1cp9omvl6oby', // stylesheet location
  center: [-82.10116, 39.32739], // starting position [lng, lat]
  zoom: 13.6, // starting zoom
  hash: false
});

var params = new URLSearchParams(window.location.search);

var url = (!params) ? "./story.json" : (params && params.get("story")) ? params.get("story") : "./story.json";

map.on("load", function() {
  createStory(this, url, "story")
})

map.on("click", function(e) {
  console.log(e.lngLat)
})
