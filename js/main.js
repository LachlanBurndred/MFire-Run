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


////Yogi Image 1
//var y1 = new Image(200, 200);
//y1.src = "../resources/yogi1.png";
////not finished loading, so need to use function to allow load time
//y1.onload = function () {
//    //context.drawImage(img, 10, 10);
//    context.drawImage(y1, 300, 40, 188, 268);
//}
////Yogi Image 2
//var y2 = new Image(200, 200);
//y2.src = "../resources/yogi2.png";
////not finished loading, so need to use function to allow load time
//y2.onload = function () {
//    //context.drawImage(img, 10, 10);
//    context.drawImage(y2, 300, 340, 173, 231);
//}
//var x = 50;
//var y = 50;
//var width = 80;
//var height = 60
//var angle = 0

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

////Mouse UP to insert a green dot!
//$(canvas).mouseup(function (event) {
//    var offset = $(this).offset();  //canvas is 100px below top of page, so circles drew 100px down
//    //thse variables are local and do NOT pick up the x and y above!!!
//    var x = event.pageX - offset.left;
//    var y = event.pageY - offset.top;
//    context.beginPath();
//    context.arc(x, y, 10, 0, Math.PI * 2);
//    //context.stroke();
//    //context.closePath();          //empty circle
//    context.fillStyle = "red";
//    context.fill();                 //filled green circle
//});

//$("#buttonid")

//$(canvas).scroll(function (event) {
//    var offset = $(this).offset();  //canvas is 100px below top of page, so circles drew 100px down
//    //thse variables are local and do NOT pick up the x and y above!!!
//    var x = event.pageX - offset.left;
//    var y = event.pageY - offset.top;
//    context.beginPath();
//    context.arc(x, y, 10, 0, Math.PI * 2);
//    //context.stroke();
//    //context.closePath();          //empty circle
//    context.fillStyle = "blue";
//    context.fill();                 //filled green circle
//});


//var Rotate = function ()    
//{
//    //clear last rectangle
//    context.fillStyle = "white";
//    context.fillRect(x, y, width, height);

//    x += 0;                     // dist from left
//    y += 0;                     // dist from top
//    angle += 60
//    var cx = x + 0.5 * width;   // x of shape center
//    var cy = y + 0.5 * height;  // y of shape center

//    context.save();              //copy pictures and other objects in place!!!
//    context.translate(cx, cy);              //translate CANVAS to center of shape
//    //context.fillStyle = "green";
//    //context.fillRect(x, y, width, height);              //translate to center of shape
//    context.rotate((Math.PI / 180) * angle);
//    context.fillStyle = "red";
//    context.fillRect(x, y, width, height);  //rotate 25 degrees.
//    context.translate(-cx, -cy);              //translate CANVAS back to top left
//    context.fillStyle = "blue";
//    context.fillRect(x, y, width, height);         //translate center back to 0,0
//    context.restore()              //paste pictures and other objects in place!!!

//context.fillStyle = "blue";
//context.fillRect(x, y, width, height);
//}
//setInterval(Rotate, 1000 / FPS);


////     draw a Circular gradient
//// Create gradient
////var grdC = context.createRadialGradient(2, 2, 2, 50, 50, 50);
//var grdC = context.createRadialGradient(x + 75, y + 50, 2, x + 150, y + 100, 100);
//grdC.addColorStop(0, "white");
//grdC.addColorStop(1, "blue");

//// Fill with gradient      clearRect
//context.fillStyle = grdC;
//context.fillRect(x, y, 150, 100);

//x += 1
//y += 1
//angle += 0.01

//context.save();

//context.translate(-x / 2, -y / 2);
//context.rotate(angle);
//context.translate(x / 2, y / 2);

//context.fillStyle = "black";
//context.fillRect(0, 0, x, y);

//context.restore();


//var x = 100;
//var y = 100;
//var width = 100;
//var height = 150
//var cx = x + 0.5 * width;   // x of shape center
//var cy = y + 0.5 * height;  // y of shape center

//context.fillStyle = "red";
//context.fillRect(x, y, width, height);  //draw normal shape

//context.translate(cx, cy);              //translate to center of shape
//context.fillStyle = "black";
//context.fillRect(x, y, width, height);
//context.rotate((Math.PI / 180) * 25);  //rotate 25 degrees.
//context.translate(-cx, -cy);            //translate center back to 0,0

//context.fillStyle = "blue";
//context.fillRect(x, y, width, height);

//context.translate(cx, cy);              //translate to center of shape
//context.fillStyle = "yellow";
//context.fillRect(x, y, width, height);
//context.rotate((Math.PI / 180) * 25);  //rotate 25 degrees.
//context.translate(-cx, -cy);            //translate center back to 0,0

//context.fillStyle = "pink";
//context.fillRect(x, y, width, height);

//context.translate(cx, cy);              //translate to center of shape
//context.fillStyle = "grey";
//context.fillRect(x, y, width, height);
//context.rotate((Math.PI / 180) * 25);  //rotate 25 degrees.
//context.translate(-cx, -cy);            //translate center back to 0,0

//context.fillStyle = "brown";
//context.fillRect(x, y, width, height);
