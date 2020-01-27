/**
 * Create a story map using a GeoJSON in Mapbox GL JS
 * 
 * @param {object} map mapbox map object
 * @param {json} geojson GeoJSON with TITLE and INFO fields
 * @param {element} id id of element where to create the story
 */

function createStory(map, dataUrl, id, theme, zoom) {
  var mapZoom = (!zoom) ? 13.6 : zoom;
  var storyContainer = document.getElementById(id);
  storyContainer.classList.add("mgl-story")

  if (theme) {
    storyContainer.classList.add(theme);
    console.log(map)
    map._container.classList.add(theme)
  }

  var activeChapterName = "chapter0";

  /**
   * main function
   */

  fetch(dataUrl)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      storyInit(data)
    })

  function storyInit(geojson) {

    map.flyTo({
      center: geojson.features[0].geometry.coordinates,
      zoom: mapZoom
    })

    var chapters = [];
    geojson.features.map(function (feature) {
      // add check if geojson is polygon or point
      // var center = turf.center(feature);
      var p = feature.properties;
      var story = (!p.story) ? p.description : p.story;

      if (p.image) {
        p["images"] = p.image
      }

      if (p.images && typeof(p.images) != "object") p.images = [p.images]

      chapters.push({
        title: p.title,
        body: story,
        center: feature.geometry.coordinates,
        bearing: (p.bearing != null) ? p.bearing : 0,
        pitch: (p.pitch != null) ? p.pitch : 0,
        zoom: (p.zoom != null) ? p.zoom : 13.6,
        images: (!p.images) ? null : p.images,
        speed: 0.8
      });
    });

    for (var i = 0; i < chapters.length; i++) {
      var next = i + 1;
      var prev = i - 1;
      if (i === (chapters.length - 1)) {
        // next = 0;
        next = null
      }
      if (i === 0) {
        // prev = chapters.length - 1;
        prev = null
      }

      createChapterList(id, chapters[i], i, next, prev);

      // storyContainer.setAttribute('style','height:' + (firstChapter.clientHeight) + "px");

      storyContainer.onscroll = function () {
        for (var i = 0; i < chapters.length; i++) {
          var chapterName = "chapter" + i;
//           console.log(chapterName)
          if (isElementOnScreen(chapterName)) {
//             console.log("active", chapterName)
            setActiveChapter(chapterName, i);
            break;
          }
        }
      };
      if (i === chapters.length - 1) {
        storyContainer.lastChild.style.marginBottom = (story.clientHeight - storyContainer.lastChild.scrollHeight) + "px"
      }
    }

    function createChapterList(div, p, index, next, prev) {
      console.log(prev, next)
      var chapter = document.createElement('section');
      chapter.id = "chapter" + index;
      chapter.classList.add("chapter");
      
      if (index === 0) {
        chapter.classList.add("active")
      }

      //IMAGES - EXPECTING AN ARRAY OR COMMA SEPARATED STRING
      var imgSource = (!p.images) ? null : p.images;
      // console.log(imgSource)
      if (imgSource) {
        var split = (Array.isArray(imgSource)) ? imgSource : imgSource.split(",");
        // console.log(split)
        split.map(function(url) {
          // console.log(url);
          var img = document.createElement("img");
          img.src = url;
          img.style.width = "100%";
          img.style.marginTop = "20px";
          chapter.appendChild(img)
        })
      }

      
      //TITLE
      var title = document.createElement('h2');
      title.textContent = p.title;
      title.classList.add('story-title');
      chapter.appendChild(title);

      //BODY
      var body = document.createElement('div');
      body.classList.add('story-body');
      body.innerText = p.body;
      chapter.appendChild(body);

      //BUTTONS
      var nextlink = document.createElement('button');
      nextlink.textContent = ">";
      nextlink.classList.add("btn");
      nextlink.classList.add("btn-secondary")
      nextlink.classList.add("mgl-story-btn");
      nextlink.setAttribute("data-scroll", "");
      nextlink.style.float = "right";
      if (!next) {
        nextlink.style.opacity = 0;
        nextlink.style.cursor = "inherit"
      }else{
        nextlink.onclick = function() {
          window.location.hash = "#chapter" + next;
          if (isElementOnScreen("chapter" + next)) {
            setActiveChapter("chapter" + next);
          }
        }
      }

      var prevlink = document.createElement('button');
      prevlink.classList.add("btn");
      prevlink.classList.add("btn-secondary");
      prevlink.classList.add("mgl-story-btn");
      prevlink.setAttribute("data-scroll", "");
      prevlink.textContent = "<";
      if (!prev && prev != 0) {
        prevlink.style.opacity = 0;
        prevlink.style.cursor = "inherit"     
      }else{
        prevlink.onclick = function() {
          window.location.hash = "#chapter" + prev;
          if (isElementOnScreen("chapter" + prev)) {
            setActiveChapter("chapter" + prev);
          }
        }
      }
     
      chapter.appendChild(prevlink);
      chapter.appendChild(nextlink);

      var div = document.getElementById(div);
      div.appendChild(chapter)
    }

    // function setActiveChapter(chapterName, number) {
    //   if (chapterName === activeChapter) return;
    //   // var p = document.getElementById(chapterName);
    //   // f.setAttribute('style','height:' + (p.clientHeight - 10) + "px");
    //   map.flyTo(chapters[number].center);
    //   document.getElementById(chapterName).setAttribute('class', 'active');
    //   document.getElementById(activeChapter).setAttribute('class', '');

    //   activeChapter = chapterName;
    // }

    // function isElementOnScreen(id) {
    //   var element = document.getElementById(id);
    //   var bounds = element.getBoundingClientRect();
    //   return bounds.top < window.innerHeight && bounds.bottom > 20;
    // }

    function setActiveChapter(chapterName) {
      if (chapterName === activeChapterName) return;

      var chapterNumber = Number(chapterName.replace("chapter", ""));
      map.flyTo(chapters[chapterNumber]);

      document.getElementById(chapterName).setAttribute('class', 'active');
      document.getElementById(activeChapterName).setAttribute('class', '');

      activeChapterName = chapterName;
    }

    function isElementOnScreen(id) {
      var boolean = false;
      var element = document.getElementById(id);
      var bounds = element.getBoundingClientRect();
      var storyBounds = story.getBoundingClientRect();
      if (window.innerWidth < 961) {
        boolean = bounds.bottom > storyBounds.top; 
      }else{
        boolean = bounds.top < window.innerHeight && bounds.bottom > 0;
      }
//       console.log("t:", bounds.top, "b:", bounds.bottom, "h:", storyBounds)
      return boolean
    }
  }

}

export {
  createStory
}
