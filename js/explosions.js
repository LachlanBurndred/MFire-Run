/*
 * Create Nuke
 * position: the position at which the nuke is created.
 * scaleSpeed: speed at which the nuke scales.
 */
function CreateNuke(position, scaleSpeed)
{
    var nuke = new Nuke();
    this.velocity = new Vector2(0, 0);
    nuke.position = new Vector2(position.x, position.y);
    nuke.scaleSpeed = scaleSpeed;
    nuke.GetWidth = function ()
    {
        return this.radius * this.scale;
    };
    nuke.GetHeight = function ()
    {
        return this.radius * this.scale;
    };
    nuke.Draw = function ()
    {
        if (this.isVisible)
        {
            //Save the context
            context.save();
            //Draw the element i.e. as a box, circle or image
            // 1. translate to desired position
            context.translate(this.position.x, this.position.y);
            // 2. Scale the object
            context.scale(this.scale, this.scale);
            // 3. rotate
            context.rotate(this.rotation);
            // 4. draw the object
            context.fillStyle = this.color;

            context.beginPath();
            context.arc(-this.radius / 4, -this.radius / 4, this.radius, 0, Math.PI * 2);
            context.closePath();

            context.fill();

            // Draw the image the same way we did 'fillRect' as well as the '-width / 2 & -height / 2'
            // Remember to use the 'this' keyword to reference variables inside of gameObject.

            // Restore the context to the last save
            context.restore();
        }
    }
}
// Nuke
function Nuke()
{
    var nuke = new GameObject();

    // Nuke Controllers.
    nuke.scaleSpeed = 3.0;
    nuke.explosionDuration = 4.0;
    nuke.explosionTimer = 0.0;

    nuke.Update = function (deltaTime)
    {
        // Scale explosion up over time.
        this.scale += this.scaleSpeed * deltaTime;
        // Increase explosionTimer
        this.explosionTimer += deltaTime;
        // Check if explosionTimer > explosion Duration
        if (this.explosionTimer >= this.explosionDuration)
        {
            Destroy(this);
        }
    };
    nuke.OnCollisionStay = function (col)
    {
        //Check if the collider is of tag "Enemy"
        if (col.tag == "Enemy")
        {

            Destroy(col);

            var explosionSound = new Audio("resources/explosion.wav");
            explosionSound.play
        }
    };

    return nuke;
}

// Expanding circles
/*
 * Explosions
 *   Position: is the position of spawning particles
 *   Count: amound of particles to spawn
 *   Speed: Speed of particles
 *   Colour: color of particles
 */
function CreateExplosion(position, count, speed, colour)
{
    // Create a loop thtat loops through 'count' amount of times
    for (var i = 0; i < count; i++)
    {
        // Create new particles
        var particle = new Particle();
        particle.speed = speed;
        particle.color = colour;

        //Change particle velicity to random direction
        particle.position = new Vector2(position.x, position.y);
        particle.velocity.x = Random(-particle.speed, particle.speed);
        particle.velocity.y = Random(-particle.speed, particle.speed);
    }
}

/*
 * Particles
 */
function Particle()
{
    var particle = new GameObject();
    particle.scaleSpeed = 1.0;
    particle.speed = 100.0;
    particle.scale = 1.0
    particle.Update = function (deltaTime)
    {
        // Shrink the particle over speed & time
        this.scale -= this.scaleSpeed * deltaTime;

        // check if scale is < or = to 0 and destroy if yes
        if (this.scale <= 0)
        {
            //Destroy this particle
            Destroy(this);
        }

        // Move particke in direction with velicity & deltaTime
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    };   // needed because we've changed a variable

    particle.Draw = function ()
    {
        if (this.isVisible)
        {
            //Save the context
            context.save();
            //Draw the element i.e. as a box, circle or image
            // 1. translate to desired position
            context.translate(this.position.x, this.position.y);
            // 2. Scale the object
            context.scale(this.scale, this.scale);
            // 3. rotate
            context.rotate(this.rotation);
            // 4. draw the object
            context.beginPath();
            context.arc(-this.width / 2, -this.height / 2, 32, 0, Math.PI * 2);
            context.closePath();

            context.fillStyle = this.color;
            context.fill();

            context.restore();
        }
    };
    return particle;
}