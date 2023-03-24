const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");
// Use game contianer to make background blurry when display end
const gameContainer = document.getElementById('game-container');

const flappyImg = new Image();
flappyImg.src = 'backgrounds/kirby.png'

// Game Constants
const FLAP_SPEED = -5;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;

// Bird Variabels
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