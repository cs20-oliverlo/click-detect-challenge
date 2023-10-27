// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 550;

// EVENT STUFF

// Reset Variables
let circles = [];
let rectangles = [];

reset();

// Animation
requestAnimationFrame(animate);
function animate() {
    ctx.fillStyle = `rgb(50, 50, 50)`;
    ctx.fillRect(0, 0, cnv.width, cnv. height);

    for (let i = 0; i < walls.length; i++) {
        drawWalls(i);
        checkCollision(i);
    }

    drawPlayer();
    playerMovement();

    // Request Animation Frame
    requestAnimationFrame(animate);
}

function drawWalls(n) {
    ctx.fillStyle = `${walls[n].color}`;
    ctx.fillRect(walls[n].x, walls[n].y, walls[n].w, walls[n].h);
}

function drawPlayer() {
    ctx.fillStyle = `${player[0].color}`;
    ctx.fillRect(player[0].x, player[0].y, player[0].w, player[0].h);
}

function playerMovement() {
    if (player[0].up === true) {
        player[0].y -= player[0].v;
    }
    if (player[0].left === true) {
        player[0].x -= player[0].v;
    }
    if (player[0].right === true) {
        player[0].x += player[0].v;
    }
    if (player[0].down === true) {
        player[0].y += player[0].v;
    }
}

function checkCollision(n) {
    // Top Detection
    if (player[0].y < walls[n].y + walls[n].h && player[0].y > walls[n].y && player[0].x + player[0].v < walls[n].x + walls[n].w && player[0].x + player[0].w - player[0].v > walls[n].x) {
        player[0].y = walls[n].y + walls[n].h;
    }
    // Bottom Detection
    if (player[0].y + player[0].h > walls[n].y && player[0].y + player[0].h < walls[n].y + walls[n].h && player[0].x + player[0].v < walls[n].x + walls[n].w && player[0].x + player[0].w - player[0].v > walls[n].x) {
        player[0].y = walls[n].y - player[0].h;
    }
    // Left Detection
    if (player[0].x < walls[n]. x + walls[n].w && player[0].x > walls[n].x && player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x + walls[n].w;
    }
    // Right Detection
    if (player[0].x + player[0].w > walls[n]. x && player[0].x + player[0].w  < walls[n].x + walls[n].w && player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x - player[0].w;
    }
}

function newPlayer(x1, y1, w1, h1, v1, color1, up1, left1, right1, down1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            v: v1,
            color: color1,
            up: up1,
            left: left1,
            right: right1,
            down: down1
        } 
}

function newWall(x1, y1, w1, h1, color1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1,
        }
}

function reset() {
    walls = [];
    walls.push(newWall(0, 0, cnv.width, 20, "grey"));
    walls.push(newWall(0, 0, 20, cnv.height, "grey"));
    walls.push(newWall(cnv.width - 20, 0, 20, cnv.height, "grey"));
    walls.push(newWall(0, cnv.height - 20, cnv.width, 20, "grey"));
    walls.push(newWall(0, cnv.height - 20, cnv.width, 20, "grey"));
    walls.push(newWall(125, 175, 100, 20, "grey"));
    walls.push(newWall(500, 20, 20, 100, "grey"));
    walls.push(newWall(300, 100, 20, 225, "grey"));
    walls.push(newWall(400, 150, 150, 20, "grey"));
    walls.push(newWall(450, 250, 20, 150, "grey"));
    walls.push(newWall(600, 200, 150, 20, "grey"));
    walls.push(newWall(200, 325, 20, 175, "grey"));
    walls.push(newWall(600, 300, 20, 150, "grey"));
    walls.push(newWall(250, 400, 150, 20, "grey"));
    walls.push(newWall(380, 450, 20, 100, "grey"));

    player = [];
    player.push(newPlayer(50, cnv.height / 2, 20, 20, 5, "blue", false, false, false, false,));
}