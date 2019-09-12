/**
 * Create a story map using a GeoJSON in Mapbox GL JS
 * 
 * @param {object} map mapbox map object
 * @param {json} geojson GeoJSON with TITLE and INFO fields
 * @param {element} id id of element where to create the story
 */

function createStory(map, dataUrl, id) {

  var storyContainer = document.getElementById(id);
  storyContainer.classList.add("mgl-story")

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

    var chapters = [];
    geojson.features.map(function (feature) {
      // add check if geojson is polygon or point
      // var center = turf.center(feature);
      var p = feature.properties;
      var info = (p.INFO != null) ? p.INFO : "";
      chapters.push({
        title: p.title,
        body: info,
        center: feature.geometry.coordinates,
        bearing: (p.bearing != null) ? p.bearing : 0,
        pitch: (p.pitch != null) ? p.pitch : 0,
        zoom: (p.zoom != null) ? p.zoom : 16,
        speed: 0.8
      });
    });

    console.log(chapters)
    for (var i = 0; i < chapters.length; i++) {
      var next = i + 1;
      var prev = i - 1;
      if (i === (chapters.length - 1)) {
        var next = 0;
      }
      if (i === 0) {
        var prev = chapters.length - 1;
      }
      createChapterList(id, chapters[i], i, next, prev);

      var firstChapter = storyContainer.children[0];
      firstChapter.classList.add('active')
      // storyContainer.setAttribute('style','height:' + (firstChapter.clientHeight) + "px");

      storyContainer.onscroll = function () {
        for (var i = 0; i < chapters.length; i++) {
          var chapterName = "chapter" + i;
          if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName, i);
            break;
          }
        }
      };
    }

    /*
    helper functions
    */

    function createChapterList(div, p, id, next, prev) {
      var chapter = document.createElement('section');
      chapter.id = "chapter" + id;
      chapter.classList.add("chapter");
      var title = document.createElement('h3');
      title.textContent = p.title;
      title.classList.add('story-title');
      var body = document.createElement('div');
      body.classList.add('story-body');
      body.innerHTML = p.body;
      var nextlink = document.createElement('a');
      nextlink.href = "#chapter" + next;
      nextlink.textContent = ">";
      nextlink.classList.add("btn");
      nextlink.classList.add("btn-secondary");
      nextlink.setAttribute("data-scroll", "");

      if (prev != null) {
        nextlink.style.float = "right";
        var prevlink = document.createElement('a');
        prevlink.classList.add("btn");
        prevlink.classList.add("btn-secondary");
        prevlink.setAttribute("data-scroll", "");
        prevlink.href = "#chapter" + prev;
        prevlink.textContent = "<";
      }

      chapter.appendChild(title);
      chapter.appendChild(body);
      if (prev != null) {
        chapter.appendChild(prevlink);
      }
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
      var element = document.getElementById(id);
      var bounds = element.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 20;
    }
  }

}

export {
  createStory
}