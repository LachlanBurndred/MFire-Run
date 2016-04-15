/*
 * Method Helpers  (static functions)
 */
function PlayRandomSound(soundList)
{
    // Generate random index into sound list.
    var randomIndex = Random(0, soundList.length);
    // Rounnd the random index to an int.
    randomIndex = Math.round(randomIndex);
    // Create the new audio using randomIndex.
    var sound = new Audio(soundList[randomIndex]);
    // Play the audio.
    sound.play();
}
// checks if function is within bounds of the canvas and returns True or False
function IsWithinBounds(position)
{
    // check if position argument is within canvas bounds
    if (position.x >= 0 && position.x <= canvas.clientWidth &&
       position.y >= 0 && position.y <= canvas.clientHeight)
    {
        // position is within canvas bounds
        return true;
    }
    // position is NOT within canvas bounds
    return false;
}

// Geets the direction between two vectors and returns it normalised
function GetNormalDirection(posA, posB)
{
    var result = Vector2.Subtract(posA, posB);
    result.Normalize();
    return result;
}


/*
 * Player
 */

var mouseX
var mouseY

//random Colour Generator
function randomRGBComponent()
{
    return Math.round(Math.random() * 200) + 56;  // keeps colours away from the extremes of 0 and 255
}
function randomRGBColor()
{
    return 'rgb(' + randomRGBComponent() + ', ' + randomRGBComponent() + ', ' + randomRGBComponent() + ')';
}
//for explosions - just do shades of red
function randomRedColor()
{
    return 'rgb(' + randomRGBComponent() + ', 0, 0)';
}
//End Random Colours

function RGB(r, g, b)
{
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

// List of game sounds.
var gameSounds = [];
gameSounds[0] = "resources/fire.wav";
gameSounds[1] = "resources.fire2.wav";


var c = 0   //colour #
//var up

var player = new GameObject('resources/yogi1.png');
player.name = "Player 1";
player.tag = "Player";
// starting position in the centre of the canvas
player.position = new Vector2(canvas.clientWidth / 2, canvas.clientHeight / 2);
player.health = 100.0;//float
player.shootSpeed = 400;
player.shootRate = 0.5;
player.shootTimer = 0.0;
player.Shoot = function (speed)
{
    // calculate direction from mouose to player
    var mousePos = Input.GetMousePosition();
    var direction = GetNormalDirection(mousePos, this.position);

    //create new bullet
    var bullet = new Bullet();
    bullet.position = new Vector2(this.position.x, this.position.y);
    bullet.rotation = this.rotation;
    bullet.scale = 0.5;
    bullet.velocity.x = direction.x * speed;
    bullet.velocity.y = direction.y * speed;

    //Fire a bullet sound here
    var fireSound = new Audio("resources/lazer.wav");
    fireSound.play();

    //Muzzle flash explosion here

    //Set velocity to calculated direction and x by speed

}

//update the position of the object EVERY FRAME
player.Update = function (deltaTime)
{
    var speed = 100 // Player speed!!!
    c += 1;
    if (c >= 256) { c = 0 };

    // move player with the 4 keys
    if (Input.GetKeyDown("a"))
    {
        player.position.x -= speed * deltaTime;
    }
    if (Input.GetKeyDown("d"))
    {
        player.position.x += speed * deltaTime;
    }
    if (Input.GetKeyDown("w"))
    {
        player.position.y -= speed * deltaTime;
    }
    if (Input.GetKeyDown("s"))
    {
        player.position.y += speed * deltaTime;
    }

    var direction = GetNormalDirection(Input.GetMousePosition(), this.position);
    this.rotation = Vector2.ToAngle(direction);

    // Count up shootTimer
    this.shootTimer += deltaTime;

    // check if we can shoot
    if (this.shootTimer >= this.shootRate)
    {
        // check if the left mouse button was pressed (LMB)
        if (Input.GetMouseButtonDown('left'))
        {
            // Call the shoot function
            this.Shoot(this.shootSpeed);

            // Reset the timer
            this.shootTimer = 0;
        }
    }


    //if (Input.GetMouseButtonDown("left")) {
    //    // rotate player clockwise
    //    player.rotation += 0.1;
    //}
    //if (Input.GetMouseButtonDown("right")) {        
    //    // rotate player anticlockwise
    //    player.rotation -= 0.1;
    //}
    //    // Scale the player
    //if (Input.GetMouseButtonDown("middle")) {
    //    player.scale += .1;
    //}


    //player.color = RGB(c, 85, 170);
    player.color = RGB(c, 256 - c, 256 - c);
    //player.color = randomRGBColor()
    // moving the player
}

/*
 * Bullet
 */
function Bullet()
{
    var bullet = new GameObject();
    bullet.Update = function (deltaTime)
    {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        if (IsWithinBounds(this.position) == false)
        {
            //Play an explosion sound
            //var explosionSound = new Audio ('resources/explosion.wav');
            // explosionSound.play();

            //Destroy Bullet
            Destroy(this);
        }
    };

    bullet.OnCollisionStay = function (col)
    {
        //Check if the collider is of tag "Enemy"
        if (col.tag == "Enemy")
        {

            // Create a Nuke
            CreateNuke(this.position, 3.0);

            // Play an explosion sound here

            // Adding 1 to score variable

            // Destroy both objects (col & this)
            Destroy(col);

            this.isExploding = true;

            var explosionSound = new Audio("resources/explosion.wav");
            explosionSound.play();
        }
    };

    return bullet;
}



/*
 * Enemy Object
 */
function FollowPlayer(deltaTime)
{
    // 1. Get the direction vectore between the player & this enemy GameObject()
    // vector maths    ratio of up:across
    var direction = Vector2.Subtract(player.position, this.position);
    direction.Normalize();          //reduces the ratio

    // 2. Set teh rotation of GameObject to be that direction
    this.rotation = Vector2.ToAngle(direction);

    // 3. Move this enemy object in that direction
    this.position.x += direction.x * this.speed * deltaTime;
    this.position.y += direction.y * this.speed * deltaTime;

    // 4. Count up the attach timer
    this.attackTimer += deltaTime;
}

//Enemy Object
var enemyCount = 0;
function Enemy()
{
    // will make multiple enemies
    var enemy = new GameObject();
    enemy.name = "Enemy " + enemyCount;

    //Count up the enemy count by 1
    //   If enemy dies, new one will have a new number  (possibly the same number as a dead one)
    enemyCount++;

    enemy.tag = "Enemy";

    //enemy specific parameters
    enemy.speed = 20.0;  //decimal point to indicate "float"
    enemy.damage = 1.0;
    enemy.attackRate = 1.0;
    enemy.attackTimer = 0.0;
    enemy.Update = FollowPlayer;

    enemy.OnCollisionStay = function (col)
    {
        // Check if the collider that was hit was of type "Player" using it's tag
        if (col.tag == "Player")
        {
            // Check if attackTimer is >= attackRate
            if (this.attackTimer >= this.attackRate)
            {
                // Decrease the health of the player
                col.health -= this.damage;

                CreateExplosion(this.position, 10, 20, randomRedColor());

                // Print the player's health
                //console.log("Player's Health: " + col.health);// shows health in Chrome dev window

                // Reset attack Timer
                this.attackTimer = 0.0;
            }

        }
    }

    return enemy;
}

/*
 * Nuke
 */
//function Nuke() {
//    var nuke = new GameObject();

//    // Nuke Controllers.
//    nuke.scaleSpeed = 3.0;
//    nuke.explosionDuration = 4.0;
//    nuke.explosionTimer = 0.0;

//    nuke.Update = function (deltaTime)
//    {
//        // Scale explosion up over time.
//        this.scale += this.scaleSpeed * deltaTime;
//        // Increase explosionTimer
//        this.explosionTimer += deltaTime;
//        // Check if explosionTimer > explosion Duration
//        if (this.explosionTimer >= this.explosionDuration)
//        {
//            Destroy(this);
//        }
//    };
//    nuke.OnCollisionStay = function (col) {
//        //Check if the collider is of tag "Enemy"
//        if (col.tag == "Enemy") {

//            Destroy(col);

//            var explosionSound = new Audio("resources/explosion.wav");
//            explosionSound.play
//        }
//    };

//    return nuke;
//}


//Enemy Manager
var enemyManager = new GameObject();
enemyManager.name = "Enemy Manager";
enemyManager.isVisible = false;
enemyManager.spawnRate = 1;
enemyManager.spawnTimer = 0.0;
enemyManager.Update = function (deltaTime)
{
    this.spawnTimer += deltaTime;

    if (this.spawnTimer >= this.spawnRate)
    {
        //spawn enemies

        // 1. generate a new enemy and position to spawn an enemy in
        var randomPosition = new Vector2();
        randomPosition.x = Random(0, canvas.clientWidth);
        randomPosition.y = Random(0, canvas.clientHeight);
        //can be done but we will leave out at this stage
        //enemy.speed = Random(5, 10)


        // 2. create a new enemy and position to the random position
        var enemy = new Enemy();
        enemy.position = randomPosition;

        // 3. reset the timer (spawnTimer)
        this.spawnTimer = 0.0;
    }
}


// below won't work due to screen clearing

////click DOWN to insert a green dot!
//$(canvas).mousedown(function (event) {
//    var offset = $(this).offset();  //canvas is 100px below top of page, so circles drew 100px down
//    //thse variables are local and do NOT pick up the x and y above!!!
//    var x = event.pageX - offset.left;
//    var y = event.pageY - offset.top;
//    context.beginPath();
//    context.arc(x, y, 10, 0, Math.PI * 2);
//    //context.stroke();
//    //context.closePath();          //empty circle
//    context.fillStyle = "green";
//    //randomColor();
//    context.fill();                 //filled green circle
//});