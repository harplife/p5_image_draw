var img;

function preload() {
  var imgs = img_find();
  img = loadImage(imgs[0].src);
  //img = loadImage('./imgs/lapislazuli.jpg');
}

function setup() {
  createCanvas(600, 600);
  //img = createImg('./imgs/lapislazuli.jpg');
}

function draw() {
  background(220);
  image(img, 0, 0, width, img.height*width/img.width);
}

function img_replace() {
  var imgs = img_find();
  for (var i = 0; i < imgs.length; i++) {
  
  imgs[i].src = "https://api.time.com/wp-content/uploads/2019/08/caveman-spongebob-spongegar.png";
  
  };
}

function img_find() {
  var imgs = document.getElementsByTagName("img");
  return imgs;
}