let xRotDeg=0
let xRotDegStep = 1


function setup() {
  createCanvas(400, 400, WEBGL);
    // Create the button elements and place them
  // beneath the canvas.
  startButton = createButton('▶');
  startButton.position(150, 10);
  startButton.size(50, 20);
  stopButton = createButton('◾');
  stopButton.position(200, 10);
  stopButton.size(50, 20);

  // Set functions to call when the buttons are pressed.
  startButton.mousePressed(loop);
  stopButton.mousePressed(noLoop);

  // Slow the frame rate.
  frameRate(5);
}

function draw() {
  background(200);
  angleMode(DEGREES);

  // Enable orbiting with the mouse.
  //orbitControl();
  
  rotateX(xRotDeg);
  xRotDeg = xRotDeg+xRotDegStep;

  // Draw the cylinder.
  cylinder();
  sphere();
}