# mgl-story
Mapbox GL JS Story Map Template

A cheesy story map I made for my ten year wedding anniversary, but you can use it for whatever you want! Yes there are personal details in here, but nothing you couldn't find on the internet. It's pretty self-explanatory, just look at the code. This is a rough version, and based on the original Mapbox story map example.

GeoJSON FeatureCollection Schema

```JavaScript
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "This is a heading",
        "story": "This is a story."
        "images": ["image1-link.jpg", "image2-link.jpg"]
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
