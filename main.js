// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 550;

// EVENT STUFF

// Reset Variables
let circles;
let rectangles;
let mouseIsPressed = false;
let mouseX;
let mouseY;
let gameState;

reset();

// Event Stuff
document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousemoveHandler(e) {
  // Get rectangle info about canvas location
  let cnvRect = cnv.getBoundingClientRect();

  // Calc mouse coordinates using mouse event and canvas location info
  mouseX = Math.round(e.clientX - cnvRect.left);
  mouseY = Math.round(e.clientY - cnvRect.top);
}

function mousedownHandler() {
    mouseIsPressed = true;
}

function mouseupHandler() {
    mouseIsPressed = false;
}



// Animation
requestAnimationFrame(animate);
function animate() {
    // Fill Background
    ctx.fillStyle = `rgb(50, 50, 50)`;
    ctx.fillRect(0, 0, cnv.width, cnv. height);
    
    // Rectangle Helper Functions
    for (let i = 0; i < rectangles.length; i++) {
        drawRectangles(i);
        shapeMovement(rectangles, i);

        if (mouseIsPressed === true) {
            shapeClicked(rectangles, i)
        }
    }

    // Circle Helper Functions
    for (let i = 0; i < circles.length; i++) {
        drawCircle(i);
        shapeMovement(circles, i);
        
        if (mouseIsPressed === true) {
            shapeClicked(circles, i)
        }
    }
    
    // Win/Lose
    if (circles.length === 0) {
        alert("Awesome");
        reset();
    } else if (gameState === "gameOver") {
        alert("try again");
        reset();
    }

    // Request Animation Frame
    requestAnimationFrame(animate);
}

function drawRectangles(n) {
    ctx.strokeStyle = rectangles[n].color;
    ctx.lineWidth = rectangles[n].lineWidth;
    ctx.strokeRect(rectangles[n].x, rectangles[n].y, rectangles[n].w, rectangles[n].h);
}

function drawCircle(n) {
    ctx.strokeStyle = circles[n].color;
    ctx.lineWidth = circles[n].lineWidth;
    ctx.beginPath();
    ctx.arc(circles[n].x, circles[n].y, circles[n].r, circles[n].startAngle, circles[n].endAngle * Math.PI);
    ctx.stroke();
}

function shapeMovement(shape, n) {
    shape[n].x += shape[n].xVelocity;
    shape[n].y += shape[n].yVelocity;

    if (shape === rectangles) {
        if (shape[n].x > cnv.width + shape[n].w) {
            shape[n].x = -shape[n].w;
        } else if (shape[n].x + shape[n].w < -5) {
            shape[n].x = cnv.width;
        }
        if (shape[n].y > cnv.height + shape[n].h) {
            shape[n].y = -shape[n].h;
        } else if (shape[n].y + shape[n].w < -5) {
            shape[n].y = cnv.height;
        }
    }

    if (shape === circles) {
        if (shape[n].x > cnv.width || shape[n].x < 0) {
            shape[n].xVelocity = shape[n].xVelocity * -1;
        }
        if (shape[n].y > cnv.height || shape[n].y < 0) {
            shape[n].yVelocity = shape[n].yVelocity * -1;
        }
    }
}

function shapeClicked(shape, n) {
    if (shape === rectangles) {
        if (mouseX > shape[n].x && mouseX < shape[n].x + shape[n].w && mouseY > shape[n].y && mouseY < shape[n].y + shape[n].h) {
            gameState = "gameOver";

        }
    }

    if (shape === circles) {
        if (Math.sqrt(Math.pow((mouseX - circles[n].x), 2) + Math.pow((mouseY - circles[n].y), 2)) <= circles[n].r) {
            circles.splice(n, 1);
          }
    }
}

function newCircle(x1, y1, r1, lineWidth1, startAngle1, endAngle1, xVelocity1, yVelocity1, color1) {
    return {
            x: x1,
            y: y1,
            r: r1,
            lineWidth: lineWidth1,
            startAngle: startAngle1,
            endAngle: endAngle1,
            xVelocity: xVelocity1,
            yVelocity: yVelocity1,
            color: color1,
        };
}

function newRectangle(x1, y1, w1, h1, lineWidth1, xVelocity1, yVelocity1, color1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            lineWidth: lineWidth1,
            xVelocity: xVelocity1,
            yVelocity: yVelocity1,
            color: color1,
        }
}

function reset() {
    gameState = "play";

    rectangles = [];
    for (let i = 0; i < 10; i++) {
        rectangles.push(newRectangle(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(25, 50), randomInt(25, 50), 3, randomInt(-5, 5), randomInt(-5, 5), "red"));
    }

    circles = [];
    for (let i = 0; i < 15; i++) {
        circles.push(newCircle(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(15, 30), 3, 0, 2, randomInt(-5, 5), randomInt(-5, 5), "green"));
    }
}