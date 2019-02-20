
// variables for gameboy
const jumpSpace = document.getElementById("buttons-B");
const keyTriggersRight = document.querySelector("#horizontal-right");
const keyTriggersLeft = document.querySelector("#horizontal-left");
const powerBtn = document.getElementById("power-btn");
const gameContainer = document.getElementById("gameboy-container");
const playButton = document.getElementById('bottom-button-2');
const screen = document.getElementById("content");
const introGameBoyLogo = document.getElementById("introGameBoyLogo");
const introNintendoLogo = document.getElementById("introNintendoLogo");

// variables for my game
let game;
let player;
let platforms;
let stars;
let poisons;
let cursors;
let jumpButton;
let scoreText;
let welcomeText;
let livesText;
let finalMessage;
let playAgainMessage;
let won = false;
let gameOver = false;
let currentScore = 0;
let lives = 3;
let winningScore = 140;

// functions to create individual pieces in the game
function createStars() {
    stars = game.add.physicsGroup();
    starCreate(266, 266, 'star');
    starCreate(280, 200, 'star');
    starCreate(285, 60, 'star');
    starCreate(105, 100, 'star');
    starCreate(70, 90, 'star');
    starCreate(5, 160, 'star');
    starCreate(5, 266, 'star');
}

function createPoisons() {
    poisons = game.add.physicsGroup();
    poisonCreate(120, 250, 'poison');
    poisonCreate(80, 75, 'poison');
    poisonCreate(255, 30, 'poison');
    poisonCreate(241, 252, 'poison');
}

function createPlatforms() {
    platforms = game.add.physicsGroup();
    door = platforms.create(40 , 230, 'door');
    trash = platforms.create(20, 270, 'trash');
    trash = platforms.create(73, 270, 'trash');
    trash = platforms.create(150, 270, 'trash');
    trash = platforms.create(240, 270, 'trash');
    redWindow = platforms.create(60, 165, 'redWindow');
    redWindow = platforms.create(175, 20, 'redWindow');
    purpleWindow = platforms.create(195, 165, 'purpleWindow');
    purpleWindow = platforms.create(60, 20, 'purpleWindow');
    platforms.create(30, 105, 'platform');
    platforms.create(10, 180, 'platform2');
    platforms.create(10, 20, 'platform3');
    platforms.create(150, 180, 'platform4');
    platforms.create(170, 105, 'platform2');
    platforms.create(150, 26, 'fireescape');
    platforms.create(280, 180, 'platform4');
    platforms.create(295, 105, 'platform4');
    platforms.create(280, 38, 'platform4');
    platforms.setAll('body.immovable', true);
}

function starCreate(left, top, starImage) {
    const star = stars.create(left, top, starImage);
    star.animations.add('spin');
    star.animations.play('spin', 12, true);
}

function poisonCreate(left, top, poisonImage) {
    const poison = poisons.create(left, top, poisonImage);
    poison.animations.add('bubble');
    poison.animations.play('bubble', 12, true);
}

function starCollect(player, star) {
    star.kill();
    currentScore = currentScore + 20;
    if (currentScore === winningScore) {
        won = true;
    }
}

function poisonCollect(player, poison) {
    poison.kill();
    lives = lives - 1;
    if (lives === 0) {
        player.kill();
        gameOver = true;
    }
}
// functions that allow a blast from the past with an old school nintendo

function powerUp(){
    powerBtn.style.backgroundColor = "rgb(255, 34, 34)";
}

function nintendoIntro(){
    introNintendoLogo.classList.add('intro-logo-nintendo');
    introNintendoLogo.innerHTML = "Nintendo &reg;";
}

function clearNin(){
    introNintendoLogo.remove();
}

function startGameIntro(){
    screen.classList.add("intro-background");
    playButton.removeEventListener('click', startGameIntro);
    stopGame();
    powerUp();
    setTimeout(nintendoIntro, 3000);
    introGameBoyLogo.classList.add('intro-logo');
    introGameBoyLogo.innerHTML = "GAME BOY";
    setTimeout(clearNin, 6225);
    setTimeout(startGame, 7000);
}

function stopGame(){
    clearTimeout(startGameIntro);
}

function startGame() {
    playButton.removeEventListener('click', startGame);
    stopGame();
    introGameBoyLogo.remove();
    introNintendoLogo.remove();
    game = new Phaser.Game(300, 300, Phaser.CANVAS, 'content', 
    { 
        preload: preload, 
        create: create, 
        update: update, 
        render: render 
    });


function preload() {

    // this.background.autoScroll(0,-100);
    this.load.image("background", "images/brick.jpg");           
    // Load images
    game.load.image('platform', 'images/escapeflower.png');
    game.load.image('platform2', 'images/escapeflower2.png');
    game.load.image('platform3', 'images/escapeflower3.png');
    game.load.image('platform4', 'images/platform4.png');
    game.load.image('fireescape', 'images/fireescape.png');
    game.load.image('redWindow', 'images/redwindowsmaller.png');
    game.load.image('purpleWindow', 'images/purplewindow.png');
    game.load.image('door', 'images/door.png');
    game.load.image('trash', 'images/trash.png');
    // Load spritesheets
    game.load.spritesheet('player', 'images/alex.png', 25.5, 25.5);
    game.load.spritesheet('poison', 'images/poison.png', 16, 16);
    game.load.spritesheet('star', 'images/star.png', 16, 16);
}

function create() {
    //this adds my background
    //this.backgroundColor = '#9E4C20';
    this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background'); 
    //this.background.autoScroll(0,-100); 

    player = game.add.sprite(150, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    createStars();
    createPoisons();
    createPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    scoreText = game.add.text(8, 8, "SCORE: " + currentScore, { font: "12px Arial", fill: "black" });
    //welcomeText = game.add.text(185, 8, "STUDENT'S QUEST", { font: "8px Arial", fill: "white" });
    livesText = game.add.text(245, 8, "LIVES: " + lives, { font: "12px Arial", fill: "black" });

    finalMessage = game.add.text(game.world.centerX, 165, "", { font: "30px Arial", fill: "black" });
    finalMessage.anchor.setTo(0.5, 1);
}


function update() {
    scoreText.text = "SCORE: " + currentScore;
    livesText.text = "LIVES: " + lives;
    //finalMessage.text = "GAME OVER!!! No internship for you!"

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, stars, starCollect);
    game.physics.arcade.overlap(player, poisons, poisonCollect);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.animations.play('walk', 2, true);
        player.body.velocity.x = -175;
        player.scale.x = - 1;
    }
    else if (cursors.right.isDown) {
        player.animations.play('walk', 2, true);
        player.body.velocity.x = 175;
        player.scale.x = 1;
    }
    else {
        player.animations.stop();
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
        player.body.velocity.y = -350;
    }
    if (won) {
        finalMessage.text = "YOU WON!!!";
    }
    if (gameOver) {
        // newGame();
        player.animations.stop();
        this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        finalMessage = game.add.text(game.world.centerX, 165, "", { font: "30px Arial", fill: "black" });
        finalMessage.anchor.setTo(0.5, 1);
        playAgainMessage = game.add.text(game.world.centerX, 250, "", { font: "15px Arial", fill: "black" });
        playAgainMessage.anchor.setTo(0.5, 0.5);
        finalMessage.text = ("GAME OVER!!!");
        playAgainMessage.text = ("Better luck next time. Try again next year.");
        }
    }

function render() {

}
};

playButton.addEventListener('click', startGameIntro);

const jumpButtonTrigger = window.addEventListener('keydown', function(e){
    e = e || window.event;
    if(e.keyCode === 32){
        jumpSpace.classList.add('grow');
    } else {
        jumpSpace.classList.remove('grow');
    }
});

const directionButtonTrigger = window.addEventListener('keydown', function(event) {
    let key = event.key; 
    if(key === "ArrowRight"){
        keyTriggersRight.classList.add('grow');
        keyTriggersLeft.classList.remove('grow');
    } else if(key === "ArrowLeft"){
        keyTriggersLeft.classList.add('grow');
        keyTriggersRight.classList.remove('grow');
    } else  {
        keyTriggersRight.classList.remove('grow');
        keyTriggersLeft.classList.remove('grow');
    }
});

//document.onload = removeGame();

// create an event timer for the click event
// allow player to go again
