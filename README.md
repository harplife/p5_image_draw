# Image Processing

Goal:

1. Load images with Promise
2. Click an image to put on Canvas
3. Draw on top of image (Draw on Graphic)
4. Change image on canvas without affecting the Graphic

## Load images with Promise

Problem:

1. Due to CORS issue, `p5.loadImage()` does not work with external image src