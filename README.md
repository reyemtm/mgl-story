# mgl-story
## Mapbox GL JS Story Map Template

This app reads the points from a GeoJSON and creates a story map. It works on mobile and desktop, and can have one or more images, with a field called ``image`` or ``images``. The images can be a string or an object of images. It would be nice to have multiple images turn into a slideshow but right now they just append to story before the title. This app is based on the original Mapbox example for scrolling to a location.

### Query Parameters

```JavaScript
/*
url, token, style, center, zoom, theme, sort
*/

var url = (!params) ? "./story.json" : (!params.get("story")) ? "./story.json" : params.get("story");
mapboxgl.accessToken = (!params.get("token")) ? 'my token will only work on this url' : params.get("token");
var style = (!params.get("style")) ? 'mapbox://styles/mapbox/light-v10' : style;
var center = (!params.get("center")) ? [-82.10116, 39.32739] : [Number(params.get("center").split(",")[0]),Number(params.get("center").split(",")[1])];
var zoom = (!params.get("zoom")) ? 13.6 : params.get("zoom")
var theme = (!params.get("theme")) ? "left" : params.get("theme")
var sort = (!params.get("sort")) ? null : params.get("sort") // sort the geojson by a feature property before creating the story

```

### GeoJSON FeatureCollection Schema

```JavaScript
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "This is the title", 
        "story": "This is a story body." //can use story or description for the field name
        "images": ["image1-link.jpg", "image2-link.jpg"] //image or images
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -82.10116267204285,
          39.32739287379205
        ]
      }
    }
}

```
## Other Cool Story Maps

- https://mappingmay4.kent.edu/

### Current Mapbox style reference

``mapbox://styles/mapbox/light-v10``

``mapbox://styles/mapbox/dark-v10``

``mapbox://styles/mapbox/street-v11``

``mapbox://styles/mapbox/satellite-streets-v11``

``mapbox://styles/mapbox/outdoors-v11``

``mapbox://styles/mapbox/satellite-v9``

I published this story map template a few weeks before the 'official' Mapbox Solutions template. That template is more fully-featured but is also more complicated.
