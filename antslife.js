/**
 * Ants Life Simulation
 * 
 * This simulation models the life of ants in a colony. The simulation includes the following features:
 * 
 * - Ants: The simulation includes worker ants and a queen ant. Each ant has properties for its position, size, type, whether it has food, and its birth time.
 * 
 * - Movement: Worker ants move randomly. If a worker ant has food, it moves towards the queen.
 * 
 * - Lifespan: Each worker ant has a lifespan. When a worker ant's lifespan ends, it is removed from the simulation and a food source is created at its position.
 * 
 * - Food: Food sources are displayed as green circles. Worker ants can collect food from these sources and bring it back to the queen.
 * 
 * - End of Simulation: The simulation ends when all food sources are collected and all worker ants have brought their food to the queen.
 * 
 * - Real-time Statistics: The number of worker ants and food sources are displayed in real time under the canvas in the HTML section.
 * 
 * - Color Change: At the quarter of life of a worker ant, the worker ant is colored in orange.
 */

// The canvas width
const CANVAS_WIDTH = 600;
// The canvas height
const CANVAS_HEIGHT = 600;
// The number of sources of food
const FOODSIZE = 200;
// The threshold for the lifetime of a worker ant
const ANT_LIFETIME_THRESHOLD = 80000;

let queenAnt = new Ant(300, 300, 10, 10, 'queen');
let ants = [queenAnt,new Ant(100, 100, 10, 10, 'worker')];

// Define the food array
let food = [];


let startTime = Date.now();
let foodCollected = 0;

function endSimulation() {
    let endTime = Date.now();
    let elapsedTime = (endTime - startTime) / 1000; // convert to seconds
    let foodCollectedPerMinute = foodCollected / (elapsedTime / 60);

    // stop animation & Hide the canvas
    let canvas = select('canvas');
    canvas.hide();

    // Display the statistics
    createP(`Simulation ended.`);
    createP(`Elapsed time: ${elapsedTime} seconds`);
    createP(`Food collected per minute: ${foodCollectedPerMinute}`);
}

function setup() {
    
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    frameRate(10);

    // Create food objects - randomly placed on the canvas and not overlapping
    for (let i = 0; i < FOODSIZE; i++) {
        let uniqueLocation = false;
        let x, y;
        while (!uniqueLocation) {
            x = random(width);
            y = random(height);
            uniqueLocation = food.every(f => dist(x, y, f.x, f.y) > 10);
        }
        food[i] = {
            x: x,
            y: y,
            display: function() {
                fill('green');
                ellipse(this.x, this.y, 10, 10);
            }
        };
    }
}


function draw() {
    background(200);

    // Move and display all ants
    for (let i = 0; i < ants.length; i++) {
        ants[i].move();
        ants[i].display();

        // Check if the ant is a worker and if its lifetime has ended
        if (ants[i].type === 'worker' && Date.now() - ants[i].birthTime > ANT_LIFETIME_THRESHOLD) {
            // If so, remove the ant from the array and create a food source instead
            food.push( {
                x: ants[i].x,
                y: ants[i].y,
                display: function() {
                    fill('green');
                    ellipse(this.x, this.y, 10, 10);
                }
            });
            ants.splice(i, 1);
        }
    }

    // Display the food
    for (let i = 0; i < food.length; i++) {
        food[i].display();
    }

    // Check if all food sources are collected
    if (food.length === 0 && ants.filter(ant => ant.type === 'worker' && ant.hasFood).length === 0) {
        endSimulation();
    }

    document.getElementById('workerAntsCount').textContent = 'Worker ants: ' + ants.filter(ant => ant.type === 'worker').length;
    document.getElementById('foodCount').textContent = 'Food sources: ' + food.length;
}

function Ant(x, y, w, h, type) {    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.hasFood = false;
    this.birthTime = Date.now();
    this.move = function() {
        if (this.type === 'worker' && this.hasFood) {
            // Calculate direction vector from the worker ant to the queen
            let dirX = queenAnt.x - this.x;
            let dirY = queenAnt.y - this.y;
            // Normalize the direction vector
            let mag = Math.sqrt(dirX * dirX + dirY * dirY);
            dirX /= mag;
            dirY /= mag;
            // Move the worker ant towards the queen
            this.x += dirX * 10;
            this.y += dirY * 10;
        } else if (this.type === 'queen') {
            // Calculate direction vector from the queen ant to the nearest food source
            let nearestFood = findNearestFood();
            if (nearestFood) {
            let dirX = nearestFood.x - this.x;
            let dirY = nearestFood.y - this.y;
            // Normalize the direction vector
            let mag = Math.sqrt(dirX * dirX + dirY * dirY);
            dirX /= mag;
            dirY /= mag;
            // Move the queen ant towards the food source
            this.x += dirX * 10;
            this.y += dirY * 10;
            } else {
            // Original random movement code for the queen ant
            this.x += random(-10, 10);
            this.y += random(-10, 10);
            }
        } else {
            // Original random movement code for the worker ants without food
            this.x += random(-10, 10);
            this.y += random(-10, 10);
        }

        // Check if the ant is outside the canvas
        if (this.x < 0) {
            this.x = width;
        } else if (this.x > width) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = height;
        } else if (this.y > height) {
            this.y = 0;
        }
        // Check if the worker ant is touching a food block
        if (this.type === 'worker' && !this.hasFood) {
            for (let i = 0; i < food.length; i++) {
                let d = dist(this.x, this.y, food[i].x, food[i].y);
                if (d < this.w / 2 + 5) {
                    this.hasFood = true;
                    foodCollected++;
                    food.splice(i, 1);
                    break;
                }
            }
        }
        // Check if the worker ant with food is touching the queen
        else if (this.type === 'worker' && this.hasFood) {
            let d = dist(this.x, this.y, queenAnt.x, queenAnt.y);
            if (d < this.w / 2 + queenAnt.w / 2) {
                this.hasFood = false;
                let newAnt = new Ant(queenAnt.x + random(-50, 50), queenAnt.y + random(-50, 50), 10, 10, 'worker');
                ants.push(newAnt);
            }
        }
    }
    this.display = function() {
        if (this.type === 'queen') {
            fill('yellow');
        } else if (this.type === 'worker') {
            fill(this.hasFood ? 'red' : (Date.now() - this.birthTime > ANT_LIFETIME_THRESHOLD / 4)? 'orange' : 'black');
        }
        rect(this.x, this.y, this.w, this.h);
    }
}

function findNearestFood() {
    let nearestFood = null;
    let minDist = Infinity;

    for (let i = 0; i < food.length; i++) {
        let dist = Math.sqrt(Math.pow(food[i].x - queenAnt.x, 2) + Math.pow(food[i].y - queenAnt.y, 2));

        if (dist < minDist) {
            minDist = dist;
            nearestFood = food[i];
        }
    }

    return nearestFood;
}