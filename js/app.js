// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Allowable values: x-->0-4 (5 total), y-->1-3 (3 total, integer)
    this.x = -101;
    this.y = y * 83 - 83/3;

    this.speed = speed * 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x >= 606){
        this.x = -101;
        this.y = Math.floor((Math.random() * 3) + 1) * 83 - 83/3;
    }
    else{
        this.x = this.x + this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 2;
    this.y = 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    x = this.x * 101;
    y = this.y * 83 - 83/3;
    ctx.drawImage(Resources.get(this.sprite), x, y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(1,1);
var enemy2 = new Enemy(2,2);
var enemy3 = new Enemy(3,1.5);

var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});