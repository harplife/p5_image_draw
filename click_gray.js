let img;
let clicked = false;
let clickedColor;

function preload() {
  img = loadImage('./imgs/lapislazuli.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  background(157);
}

function draw() {
  if (clicked) {
    image(img, 0, 0, img.width, img.height);
    filter(GRAY);
  }
  else {
    image(img, 0, 0, img.width, img.height);
  };
  let pickedColor = get(mouseX, mouseY);
  noStroke;
  fill(pickedColor);
  ellipse(mouseX+50, mouseY+50, 50, 50)
}

function mousePressed() {
  clicked = !clicked;
  clickedColor = get(mouseX, mouseY);
  createElement('h2', `clicked on ${clickedColor}`);
}