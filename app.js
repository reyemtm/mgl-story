import {
  createStory
} from './mgl-story.js'

var params = new URLSearchParams(window.location.search);

var url = (!params) ? "./story.json" : (params && params.get("story")) ? params.get("story") : "./story.json";

mapboxgl.accessToken = (!params.get("token")) ? 'pk.eyJ1IjoicmV5ZW10bSIsImEiOiJjazV3dGF1NXkxejN0M2puNXR0dHl0bjl0In0.RArATVn7HIPmMCV373DHTw' : params.get("token");

var style = (!params.get("style")) ? 'mapbox://styles/mapbox/satellite-streets-v11' : style;

var center = (!params.get("center")) ? [-82.10116, 39.32739] : [Number(params.get("center").split(",")[0]),Number(params.get("center").split(",")[1])];

var zoom = (!params.get("zoom")) ? 13.6 : params.get("zoom")

var theme = (!params.get("theme")) ? "left" : params.get("theme")

/*
THEMES
right
left
offset-left
offset-right

maybe optional right-dark, etc.
*/

console.log(zoom, center, style, theme, zoom)

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: style, // stylesheet location
  center: center, // starting position [lng, lat]
  zoom: zoom, // starting zoom
  hash: true
});

map.on("load", function() {
  createStory(this, url, "story", theme, zoom)
})

map.on("click", function(e) {
  console.log(e.lngLat)
})