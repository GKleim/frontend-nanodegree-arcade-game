var x_px = 101;
var y_px = 83;
var y_offset = 101/4;

// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Allowable y values: 1-3, integer
    this.x = -1;
    this.y = this.random_row();

    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x >= 6){
        this.x = -1;
        // respawn enemy at a random row
        this.y = this.random_row();
    }
    else{
        this.x = this.x + this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    var x_pos = this.x * x_px;
    var y_pos = this.y * y_px - y_offset;
    ctx.drawImage(Resources.get(this.sprite), x_pos, y_pos);
};

Enemy.prototype.random_row = function() {
    return Math.floor((Math.random() * 3) + 1);
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
Player.prototype.update = function(allEnemies) {
    if (this.y < 1 || this.is_collision(allEnemies)) {
        this.x = 2;
        this.y = 5;
    }
};

Player.prototype.is_collision = function(list) {
    for (e in list) {
        if (this.y == list[e].y) {
            if (list[e].x > this.x - 0.75 && list[e].x < this.x + 0.75) {
                return true;
            }
        }
    }
    return false;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    var x_pos = this.x * x_px;
    var y_pos = this.y * y_px - y_offset;
    ctx.drawImage(Resources.get(this.sprite), x_pos, y_pos);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 0){
        this.x = --this.x;
    } else if (key == 'up' && this.y > 0) {
        this.y = --this.y;
    } else if (key == 'right' && this.x < 4) {
        this.x = ++this.x;
    } else if (key == 'down' && this.y < 5) {
        this.y = ++this.y;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(1);
var enemy2 = new Enemy(2);
var enemy3 = new Enemy(1.5);

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