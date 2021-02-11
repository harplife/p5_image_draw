/*
for reference on filter():
https://editor.p5js.org/cs105/sketches/dMZbJ2JBa

for reference on Graphic:
https://stackoverflow.com/a/39393599/10570582
*/

var img;
var pg;
var eraseMode = false;
var filterMode = false;
var filterGray = 0;
var filterInvert = 0;
var filterThreshold = 0;
var filterDilate = 0;
var filterErode = 0;
var scrollWeight = 1;
var eraseWeight = 1;
var alphaWeight = 255;
var alphaMode = false;
var rgb;
var lb;
var imgWidth;
var imgHeight;
var cnv;
var notice;
var cc;

// function preload() {
//   img = loadImage("./imgs/lapislazuli.jpg");
// }

function setup(){
  pixelDensity(1);
  cnv = createCanvas(600, 740);
  cnv.parent('sketch-holder');
  //cnv.background(102);
  cnv.clear();
  pg = createGraphics(600, 660);
  lb = createGraphics(600, 40);
  cc = createGraphics(600, 40);
  pg.background(0);
  lb.background(0);
  rgb = [0,0,0, alphaWeight];
  cc.background(rgb);
}

function draw() {
  /*
  Section 1: Image Processing
  */
  if (keyIsPressed && key === '1') {
    filterGray = 1;
  } else {
    filterGray = 0;
  };
  if (keyIsPressed && key === '2') {
    filterInvert = 1;
  } else {
    filterInvert = 0;
  };
  if (keyIsPressed && key === '3') {
    filterThreshold = 1;
  } else {
    filterThreshold = 0;
  };
  // turns out Dilate is too heavy?
  if (keyIsPressed && key === '4') {
    filterDilate = 1;
  } else {
    filterDilate = 0;
  };
  // turns out Erode is too heavy too..
  if (keyIsPressed && key === '5') {
    filterErode = 1;
  } else {
    filterErode = 0;
  };
  if (img) {
    imgWidth = width;
    imgHeight = img.height*width/img.width;
    image(img, 0, 0, imgWidth, imgHeight);
    if (filterGray == 1) {
      filter(GRAY);
      label('GRAY');
    } else if (filterInvert == 1) {
      filter(INVERT);
      label('INVERT');
    } else if (filterThreshold == 1) {
      filter(THRESHOLD);
      label('THRESHOLD');
    } else if (filterDilate == 1) {
      filter(DILATE);
      label('DILATE');
    } else if (filterErode == 1) {
      filter(ERODE);
      label('ERODE');
    };
  };
  /*
  Section 2: Drawing
  */
  image(pg, 0, 0);
  image(lb, 0, 660);
  cc.background(rgb);
  ccLabel(rgb);
  image(cc, 0, 700);
  label('s' + scrollWeight + ',a' + alphaWeight + ',e' + eraseWeight);
  if (keyIsPressed && key == 'e') {
    eraseMode = true;
  } else {
    eraseMode = false;
  };
  if (keyIsPressed && key === 'a') {
    alphaMode = true;
  } else {
    alphaMode = false;
  };
  if (keyIsPressed && key === 'r') {
    rgb = [ceil(random(255)), round(random(255)), floor(random(255)), alphaWeight];
  };
  if (keyIsPressed && key === 'g') {
    if (img) {
      if (mouseX < imgWidth && mouseY < imgHeight) {
        rgb = get(mouseX, mouseY);
        rgb[3] = alphaWeight;
      }
    }
  };
  if (mouseIsPressed === true) {
    if (eraseMode) {
      pg.erase();
      pg.strokeWeight(eraseWeight);
      pg.line(mouseX, mouseY, pmouseX, pmouseY);
    } else {
      pg.noErase();
      pg.stroke(rgb);
      pg.strokeWeight(scrollWeight);
      pg.line(mouseX, mouseY, pmouseX, pmouseY);
    };
  };
}

function mouseWheel(event) {
  if (eraseMode) {
    eraseWeight += event.delta;
    if (eraseWeight < 1) {
      eraseWeight = 1;
    };
  } else if (alphaMode) {
    alphaWeight += event.delta;
    if (alphaWeight < 1) {
      alphaWeight = 1;
    } else if (alphaWeight > 255) {
      alphaWeight = 255;
    };
    rgb[3] = alphaWeight;
  } else {
    scrollWeight += event.delta;
    if (scrollWeight < 1) {
      scrollWeight = 1;
    };
  };
}

function get_image_src(src) {
  img = loadImage(src);
  pg.clear();
  clear();
}

function label(s) {
  lb.fill(0);
  lb.rectMode(CENTER);
  lb.rect(lb.width/2, lb.height - 20, 120, 20);
  lb.textAlign(CENTER, CENTER);
  lb.fill(255);
  lb.textSize(16);
  lb.text(s, lb.width/2, lb.height - 20);
}

function ccLabel(rgb) {
  cc.fill(0);
  cc.rectMode(CENTER);
  cc.rect(cc.width/2, cc.height - 20, 120, 20);
  cc.textAlign(CENTER, CENTER);
  cc.fill(255);
  cc.textSize(16);
  cc.text(rgb.join(), cc.width/2, cc.height - 20);
}