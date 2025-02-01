let webcam;
let webcam2;
let webcam3;
let webcam4;
let nipperSystem = [];
let nipperSystem2=[];

function setup() {
    createCanvas(800, 800);
    pixelDensity(1);

    // Create webcam captures
    webcam = createCapture(VIDEO);
    webcam.hide();
    webcam.size(400, 400);

    webcam2 = createCapture(VIDEO);
    webcam2.hide();
    webcam2.size(400, 400);

    webcam3 = createCapture(VIDEO);
    webcam3.hide();
    webcam3.size(400, 400);

    webcam4 = createCapture(VIDEO);
    webcam4.hide();
    webcam4.size(400, 400);

    // Create Nipper objects
    for (let x = 0; x < 120; x++) {
        let rx = random(15, width - 15);
        let ry = random(15, height - 15);
        nipperSystem[x] = new Nipper(rx, ry);
    }
}

function draw() {
    background(225);

    // Display webcam feeds in a grid
    image(webcam, 0, 0, 400, 400); // Top-left
    image(webcam2, 400, 0, 400, 400); // Top-right
    image(webcam3, 0, 400, 400, 400); // Bottom-left
    image(webcam4, 400, 400, 400, 400); // Bottom-right

    // Update and display Nipper objects
    for (let nipper of nipperSystem) {
        nipper.move();
        nipper.checkEdges();

        // Sample color from the webcam feed at the Nipper's position
        let webcamColor;
        if (nipper.x < 400 && nipper.y < 400) {
            webcamColor = webcam.get(int(nipper.x), int(nipper.y));
        } else if (nipper.x >= 400 && nipper.y < 400) {
            webcamColor = webcam2.get(int(nipper.x - 400), int(nipper.y));
        } else if (nipper.x < 400 && nipper.y >= 400) {
            webcamColor = webcam3.get(int(nipper.x), int(nipper.y - 400));
        } else {
            webcamColor = webcam4.get(int(nipper.x - 400), int(nipper.y - 400));
        }

        nipper.show(webcamColor);
        nipper.step();
    }


}

class Nipper {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move() {
        this.x = this.x + random(-20, 20);
        this.y = this.y + random(-20, 20);
    }

    step() {
        strokeWeight(2);
        stroke(0);
        point(this.x, this.y);
    }

    show(color) {
        fill(color);
        noStroke();
        triangle(this.x - 90, this.y, this.x + 100, this.y + 160, this.x, this.y + 20);
    }

    checkEdges() {
        if (this.x < 15) {
            this.x = 15;
        } else if (this.x > width - 15) {
            this.x = width - 15;
        }

        if (this.y < 15) {
            this.y = 15;
        } else if (this.y > height - 15) {
            this.y = height - 15;
        }
    }
}