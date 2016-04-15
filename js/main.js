var FPS = 60  //60 frames Per Second

// get the canvas from the document
var canvas = document.getElementById('GameCanvas');   //could be double quotes

canvas.clientWidth = window.innerWidth;
canvas.clientHeight = window.innerHeight;

//get the context from the canvas
var context = canvas.getContext('2d');

var gameObjects = [];  //put all objects into an array
var prevTime = Date.now();
var currTime = 0;
var deltaTime = 0;


//calculate 'deltaTime'
// to stop the jitter in movement!!!
//makes the speed the same across all machines, regardless of CPU speed
function CalculateDeltaTime()
{
    currTime = Date.now()
    deltaTime = (currTime - prevTime) / 1000;
    prevTime = currTime;
}

function Intersects(colA, colB)
{
    // Check if the boxes are intersecting in x
    if (Math.abs(colA.position.x - colB.position.x) < colA.GetWidth() / 2 + colB.GetWidth() / 2)
    {
        // AND Check if the boxes are intersecting in y
        if (Math.abs(colA.position.y - colB.position.y) < colA.GetHeight() / 2 + colB.GetHeight() / 2)
        {
            // Both intersecting
            return true;
        }
    }
    // Both axes are NOT intersecting
    return false
}

function HandleCollisions()
{
    // Loop through all the game objects  x 2 - factorial operation - not the most efficient!
    for (var x = 0; x < gameObjects.length; x++)
    {
        for (var y = 0; y < gameObjects.length; y++)
        {
            // Grab ColA & ColB from list
            var colA = gameObjects[x];
            var colB = gameObjects[y];

            // TEST data for OR which is in FOR loops

            // Detect if they are NOT the saem & they are visible
            if (colA != y && colA.isVisible && colB.isVisible)
            {
                //check if both objects are colliding
                if (Intersects(colA, colB))
                {
                    //Call "OnCollisionStay" for both objects
                    colA.OnCollisionStay(colB)
                    colB.OnCollisionStay(colA)
                }
            }
        }
    }
}


function Update()   //Mannie's library has upperCase for Functions
{
    // Ca
    CalculateDeltaTime();

    // Loop through and update each object
    for (var i = 0; i < gameObjects.length; i++)
    {
        gameObjects[i].Update(deltaTime);
    }
    //Perform collision detection math on all game objects
    HandleCollisions();
}
function Draw()
{
    // Wipe Canvas
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    //Loop through  and draw all GameObjects
    for (var i = 0; i < gameObjects.length; i++)
    {
        gameObjects[i].Draw();
    }
}

$(window).ready(function ()
{
    setInterval(function ()
    {
        Update();
        Draw();
    }, 1000 / FPS);
});

