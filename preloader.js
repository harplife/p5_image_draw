/*
Idea here is to populate, preload, and load images concurrently.

1) generate a list of images (urls)
2) start concurrency
3) each process starts preload() and consumes an image from the list
4) preload() triggers imageLoad(), which will return an <img> with Promise
5) recurive (preload -> promise -> load -> preload) until the list is empty
*/

var preloadImages = new Array(50); // list of image urls
var totalImages = preloadImages.length;
var promisedImages = []; // actual image objects are stored here

for (var i=0; i < preloadImages.length; i++) {
  // generating a bunch of images
  // it's neat that placeholder images are available! So simple and brilliant.
  preloadImages[i] = "https://via.placeholder.com/420x320/ffffff/333333?text=Sample_" + i.toString();
}

for (var x=0;x<5;x++) {
  /*
  This spawns concurrent processes.
  doesn't seem like there's any improvement after five processes though,
  since it doesn't take too long for an image to download.
  There's definitely an improvement compared to just 1 process,
  since using 4 takes ~2.67 seconds, and using 1 takes ~8.52 seconds.
  */
  console.log(`Concurrent Process ${x.toString()} initiated`);
  preload(x);
}

function preload(cpid) {
  // if list of image urls is not empty,
  if (preloadImages.length) {
    // create promise from the first image in the list
    loadImage(preloadImages.shift()).then(function(img) {
      console.log(`Process ${cpid} is in charge of: ${img.src}`);
      // load the image when promise is complete
      imageReady(img, cpid);
    });
  }
}

function imageReady(img, cpid) {
  // store image object in list
  promisedImages.push(img);
  // 100% completion when length of promisedImages matches that of preloadImages
  console.log("Progress", (promisedImages.length / totalImages));
  // create <img> element
  document.body.appendChild(img);
  // preload calls imageReady, which calls preload again.
  // this is a recurive call.
  preload(cpid);
}

function loadImage(src) {
  // creates a promise of the image
  return new Promise(function(resolve, reject) {

    var img = new Image();
    /*
    No idea what's going on;
    wrapping resolve() with function seems to change its behavior.
    resolve() alone is faster.
    with 5 "processes",
    with function takes 1.87 seconds,
    whereas resolve alone takes 1.54 seconds.
    */
    //img.onload = function(){resolve(img);};
    img.onload = resolve(img);
    img.src = src;
  });
}