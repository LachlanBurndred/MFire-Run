
/*
 * Extra Maths function
 */
function Random(min, max)
{
    return min + Math.random() * (max - min);
}
var instanceId = 0

/*
 * Game Object
 */
function GameObject(src)
{
    var gameObject = {
        name: "GameObject " + instanceId,
        tag: "null",
        position: new Vector2(),
        velocity: new Vector2(),
        rotation: 0,
        radius: 5,
        width: 32,
        height: 16,
        scale: 1,
        color: 'blue',
        isVisible: true,
        image: new Image(),
        GetWidth: function ()
        {
            return this.width * this.scale;
        },
        GetHeight: function ()
        {
            return this.height * this.scale;
        },
        Update: function (deltaTime)
        {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            //Vector2.ToAngle()
        },
        Draw: function ()
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
                context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

                // Draw the image the same way we did 'fillRect' as well as the '-width / 2 & -height / 2'
                // Remember to use the 'this' keyword to reference variables inside of gameObject.

                // Restore the context to the last save
                context.restore();
            }
        },
        //use this function to handle collision response
        OnCollisionStay: function (col)
        {

        }
    };

    instanceId++;           // Id of opbect

    gameObjects.push(gameObject);

    return gameObject;
}


function Destroy(gameObject)
{
    //filter the game objects, removing the game objects passed in from the list
    gameObjects = gameObjects.filter(function (object)
    {
        // IF the objec is not the same, return true
        return Object.is(gameObject, object) == false;  //if object is still in the list
    });

}