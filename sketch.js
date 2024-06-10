// draw a brown wooden boat on water with a sun in the sky and a white sail
// the sun is on the top right of the canvas and the boat is on the bottom left
// the boat is brown with a white sail and the water is blue
// the boat has a black outline and the sail has a black outline
// the sun has a yellow outline
// the boat is drawn using 3 rectangles and 2 triangles
// the sail is drawn using 2 triangles
// the sun is drawn using an ellipse
// the water is drawn using a rectangle
// the boat is drawn first, then the sail, then the water, then the sun
// the boat is 100 pixels wide and 100 pixels tall
// the sail is 100 pixels wide and 100 pixels tall
// the sun is 50 pixels wide and 50 pixels tall
// the water is 400 pixels wide and 300 pixels tall
// the boat is 50 pixels from the left and 50 pixels from the bottom
// the sail is 50 pixels from the left and 50 pixels from the bottom
// the sun is 50 pixels from the right and 50 pixels from the top
// the water is 0 pixels from the left and 0 pixels from the top
// the boat has a width of 5 pixels
// the sail has a width of 5 pixels
// the sun has a width of 5 pixels
// the water has a width of 5 pixels
// the boat has a height of 5 pixels
// the sail has a height of 5 pixels
// the sun has a height of 5 pixels
// the water has a height of 5 pixels
// the boat has a fill of brown
// the sail has a fill of white
// the sun has a fill of yellow
// the water has a fill of blue
// the boat has a stroke of black
// the sail has a stroke of black
// the sun has a stroke of yellow
// the water has a stroke of blue
// the boat has a stroke weight of 5
// the sail has a stroke weight of 5
// the sun has a stroke weight of 5
// the water has a stroke weight of 5
// the boat has a rotation of 0 degrees
// the sail has a rotation of 0 degrees
// the sun has a rotation of 0 degrees
// the water has a rotation of 0 degrees
// the boat has a visibility of visible
// the sail has a visibility of
// the water is on the bottom of the canvas
// the boat is in the middle of the canvas
// the sail is white and is a triangle on the boat
// the boat is brown and is a rectangle with a white rectangle on top
// the water is blue and there a fish inside the water
// the fish is a circle with a triangle
 
function setup() {
    createCanvas(400, 400);
    background(220);
    noLoop();
    drawBoat();
}

function drawBoat() {
    // Draw the water
    fill(0, 0, 255);
    rect(0, 300, 400, 100);
    
    // Draw the sun
    fill(255, 255, 0);
    ellipse(350, 50, 50, 50);
    
    // Draw the boat
    fill(139, 69, 19);
    rect(50, 250, 100, 50);
    fill(255);
    rect(50, 250, 100, 25);
    
    // Draw the sail
    fill(255);
    triangle(100, 250, 100, 200, 150, 250);
    
    // Draw the fish
    fill(255, 0, 0);
    ellipse(50, 350, 50, 50);
}

function draw() {
    // Call the drawBoat function
    drawBoat();
}

