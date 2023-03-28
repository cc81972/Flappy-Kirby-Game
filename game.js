const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");
// Use game contianer to make background blurry when display end
const gameContainer = document.getElementById('game-container');

const flappyImg = new Image();
flappyImg.src = 'backgrounds/flappy_dunk.png'

// Game Constants
const FLAP_SPEED = -5;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;

// Bird Variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

// Pipe Variables
let pipeX = 400;
let pipeY = canvas.height - 200;

//Score and highscore variabels
let scoreDiv = document.getElementById('score-display');
let score = 0;
let highScore = 0;

document.body.onkeyup = function(e) {
    if (e.code == 'Space') {
        birdVelocity = FLAP_SPEED
    }
}

// Restart the game 
document.getElementById('restart-button').addEventListener('click',function () {
    hideEndMenu();
    resetGame();
    loop();
})
function increaseScore() {

}

function collisionCheck() {
    const birdBox = {
        x: birdX,
        y: birdY,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT
    }

    const topPipeBox = {
        x: pipeX,
        y: pipeY - PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: pipeY
    }

    const bottomPipeBox = {
        x: pipeX,
        y: pipeY + PIPE_GAP + BIRD_HEIGHT,
        height: canvas.height - pipeY - PIPE_GAP
    }
    // Checking for collision with upper piep
    if (birdBox.x + birdBox.width > topPipeBox.x &&
        birdAccelerationBox.X < topPipeBox.x + topPipeBox.width &&
        birdBox.y < topPipeBox.y) {
            return true;
    }

    // check for collision with lower pipe
    if (birdBox.x + birdBox.width > bottomPipeBox.x &&
        birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
        birdBox.y + birdBox.height > bottomPipeBox.y) {
            return true
    }

    // check to see if bird hits the boundaries
    if (birdY < 0 || birdY + BIRD_HEIGHT > canvas.height) {
        return true;
    }

    return false;
}

function hideEndMenu() {
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
}

function showEndMenu() {
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;
    if (highScore < score) {
        highScore = score;
    }
    document.getElementById('best-score').innerHTML = highScore;
}
function resetGame() {
    birdX = 50;
    birdY = 50;
    birdVelocity = 0;
    birdAcceleration = 0.1;


    pipeX = 400;
    pipeY = canvas.height - 200;
    score = 0;
}



function endGame() {
    showEndMenu();
}

function loop() {
    // reset the ctx after every loop iteration
    ctx.clearRect(0,0,canvas.width, canvas.height);

    // draw Kirby
    ctx.drawImage(flappyImg, birdX, birdY);

    // draw pipes
    ctx.fillStyle = '333';
    ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);

    // collision check
    if (collisionCheck()) {
        endGame();
        return;
    }
    pipeX -= 1.5;
    // reset pipe when move out of frame
    if (pipeX < -50) {
        pipeX = 400;
        pipeY = Math.random() *(canvas.height - PIPE_GAP) + PIPE_WIDTH;
    }

    // gravity for kirby
    birdVelocity += birdAcceleration;
    birdY += birdVelocity;

    requestAnimationFrame(loop);
}

loop()

