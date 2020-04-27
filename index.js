function setup() {
    createCanvas(window.innerHeight / 2, window.innerHeight / 2);
}

let points = [];

let theta = [0, 0];

let alpha = 0.01;

function h(x) {
    return theta[0] + (x * theta[1]);
}


function cost() {
    let sum = 0;
    for (let p of points) {
        let diff = (p[1] - h(p[0])) / 10;
        sum += diff ** 2;
    }
    return sum / 2;
}

function partialTheta1(p) {
    let sum = 0;
        
    sum += p[0] * (-p[0] * theta[1] + p[1] - theta[0]);
    sum *= -1 / 50;

    return sum;
}

function partialTheta0(p) {
    let sum = 0;
    sum += p[0] * theta[1] - p[1] + theta[0];
    sum *= 1 / 50;
    return sum;
}

function update() {
    for (let p of points) {
        theta[1] -= 0.0001 * partialTheta1(p);
        theta[0] -= 1 * partialTheta0(p);
    }
}


function draw() {
    // translate(0, height);
    // scale(1, -1)
    frameRate(30);
    background(33);

    stroke(255, 255, 255);
    fill(255, 255, 255);

    for (let p of points) {
        ellipse(p[0], height - p[1], 2);
    }

    update();
    line(0, height - theta[0], width, height - h(width));
    if (frameCount % 10 === 0) {
        console.log(theta, cost());
    }

    // update();

}

function mouseClicked() {
    if (mouseX < width && mouseY < height)
        points.push([mouseX, height - mouseY]);
}