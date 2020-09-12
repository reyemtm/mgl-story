import {
  createStory
} from './mgl-story.js'

var params = new URLSearchParams(window.location.search);

var url = (!params) ? "./story.json" : (params && params.get("story")) ? params.get("story") : "./story.json";

mapboxgl.accessToken = (!params.get("token")) ? 'pk.eyJ1IjoicmV5ZW10bSIsImEiOiJjazV3dGF1NXkxejN0M2puNXR0dHl0bjl0In0.RArATVn7HIPmMCV373DHTw' : params.get("token");

var style = (!params.get("style")) ? 'mapbox://styles/mapbox/light-v10' : params.get("style");

console.log(style)

var center = (!params.get("center")) ? [-82.10116, 39.32739] : [Number(params.get("center").split(",")[0]),Number(params.get("center").split(",")[1])];

var zoom = (!params.get("zoom")) ? 13.6 : params.get("zoom")

var theme = (!params.get("theme")) ? "left" : params.get("theme")

var sort = (!params.get("sort")) ? null : params.get("sort")

/*
THEMES
right
left
offset-left
offset-right

maybe optional right-dark, etc.
*/

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: style, // stylesheet location
  center: center, // starting position [lng, lat]
  zoom: zoom, // starting zoom
  hash: false
});

map.on("load", function() {
  createStory(this, url, "story", theme, zoom, sort)
})

map.on("click", function(e) {
  console.log(e.lngLat);
  console.log(map.getZoom())
})

map.on("zoomend", function() {
  console.log(map.getZoom())
});
